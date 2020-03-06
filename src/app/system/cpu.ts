import { Debugger } from '../util/debugger';
import { CpuInfo } from '../models/cpu-info.model';
import { Registers } from './registers';
import { Memory } from './memory';
// import { Instruction, Instructions } from './instructions';

export class CPU extends Debugger<CpuInfo> {
  // The frequency of the clock in MHz.
  public static FREQUENCY = 4194304;

  public static FLAGS = {
    ZERO: 0x80,
    SUB: 0x40,
    HALF: 0x20,
    CARRY: 0x10
  };

  private registers = new Registers();
  // private readonly instructions: Instructions;

  private memory: Memory;

  constructor(memory: Memory) {
    super();

    this.memory = memory;

    this.registers.AF = 0x01B0;
    this.registers.BC = 0x0013;
    this.registers.DE = 0x00D8;
    this.registers.HL = 0x014D;
    this.registers.SP = 0xFFFE;
    this.registers.PC = 0x0100;

    this.emit({
      registers: this.registers
    });
  }

  /**
   * Sets flags in the F register. If multiple flags should be set, then they should be bitwise or'd together.
   * Example: if Z and H should be set, then they should be passed in to this method like this: Z | H
   * @param flags The flags to check.
   */
  private setFlags(flags: number): void {
    this.registers.AF = this.registers.AF | flags;
  }

  /**
   * Resets flags in the F register. If multiple flags should be reset, then they should be bitwise or'd together.
   * Example: if Z and H should be reset, then they should be passed in to this method like this: Z | H
   * @param flags The flags to check.
   */
  private resetFlags(flags: number): void {
    this.registers.AF = this.registers.AF & ~flags;
  }

  /**
   * Increments a {@code value} by 1 and sets the necessary flags.
   * @param value The value to increment.
   * @return The incremented value.
   */
  private increment(value: number): number {
    // FLAG_HALF - set if there was a carry from the 3rd bit to the 4th bit, otherwise reset.
    if((value & 0x0F) === 0x0F) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    // increment value by 1 and get the first 8 bits
    value = (value + 1) & 0xFF;

    // FLAG_SUB - reset
    this.resetFlags(CPU.FLAGS.SUB);

    // FLAG_ZERO - set if result is 0, otherwise reset
    if(value === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    return value;
  }

  /**
   * Decrements a {@code value} by 1 and sets the necessary flags.
   * @param value The value to decrement.
   * @return The decremented value.
   */
  private decrement(value: number): number {
    // decrement value by 1 and get the first 8 bits
    const result = (value - 1) & 0xFF;

    // FLAG_HALF - set if there was a carry (borrow) from the 4th bit to the 3rd bit, otherwise reset.
    // invert value's bits, xor with (value - 1) then find out what the 4th bit is with (& 0x10).
    // If it equals zero, then there was a carry.
    if((((~value) ^ (result)) & 0x10) === 0) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    value = result;

    // FLAG_SUB - set
    this.setFlags(CPU.FLAGS.SUB);

    // FLAG_ZERO - set if result is 0, otherwise reset
    if(value === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    return value;
  }

  /**
   * Combines two bytes. Example, 0xC0 + 0xDE = 0xC0DE
   * @param highByte The value that the upper byte should equal.
   * @param lowByte The value that the lower byte should equal.
   * @return The sum of the bytes.
   */
  private combineBytes(highByte: number, lowByte: number): number {
    return (highByte << 8) + lowByte;
  }

  /**
   * Convert y parameter from decoded instruction to a register
   * @param index
   */
  private getRegisterName(index: number): string {
    switch(index) {
      case 0b000:
        return 'B';
      case 0b001:
        return 'C';
      case 0b010:
        return 'D';
      case 0b011:
        return 'E';
      case 0b100:
        return 'H';
      case 0b101:
        return 'L';
      case 0b111:
        return 'A';
    }
  }

  /**
   * Decode op code to find out which instruction to execute.
   * @param opCode
   */
  private decode(opCode: number) {
    if(opCode !== 0xCB) {
      const x = opCode >> 6;
      const y = (opCode & 0b00111000) >> 3;
      const z = opCode & 0b00000111;
      const p = y >> 1;
      const q = y % 2;

      console.log(opCode.toString(2).padStart(8, '0'), x, y, z);

      if(x === 0x00) {
        switch(z) {
          case 0b000: // Relative jumps and assorted ops
            break;
          case 0b001: // 16-bit load immediate/add
            break;
          case 0b010: // Indirect loading
            break;
          case 0b011: // 16-bit inc/dec
            if(q === 0) { // increment
              this.registers[this.getRegisterName(z)] = ((this.registers[this.getRegisterName(z)] + 1) & 0xFFFF);
            } else { // decrement
              this.registers[this.getRegisterName(z)] = ((this.registers[this.getRegisterName(z)] - 1) & 0xFFFF);
            }
            break;
          case 0b100: // 8-bit INC
            if(y === 0b110) {
              const value = this.increment(this.memory.getByteAt(this.registers.HL));
              this.memory.setByteAt(this.registers.HL, value);
            } else {
              const r = this.getRegisterName(y);
              this.registers[r] = this.increment(this.registers[r]);
            }
            break;
          case 0b101: // 8-bit DEC
            if(y === 0b110) {
              const value = this.decrement(this.memory.getByteAt(this.registers.HL));
              this.memory.setByteAt(this.registers.HL, value);
            } else {
              const r = this.getRegisterName(y);
              this.registers[r] = this.decrement(this.registers[r]);
            }
            break;
          case 0b110: // ld [b,c,d,e,h,l,a] x
            this.registers[this.getRegisterName(y)] = this.memory.getByteAt(this.registers.PC);
            break;
          case 0b111: // Assorted operations on accumulator/flags
            this.doMath(y);
            break;
        }
      } else if(x === 0b01) {
        if(y === 0b110 && z === 0b110) {
          // this.halt();
        } else if(y === z) {
          // nop
        } else {
          if(z === 0b110) {
            // ld [b,c,d,e,h,l] (hl)
            this.registers[this.getRegisterName(y)] = this.memory.getByteAt(this.registers.HL);
          } else if(y === 0b110) {
            // ld (hl) [b,c,d,e,h,l]
            this.memory.setByteAt(this.registers.HL, this.registers[this.getRegisterName(z)]);
          } else {
            // ld [b,c,d,e,h,l,a] [b,c,d,e,h,l,a]
            this.registers[this.getRegisterName(y)] = this.registers[this.getRegisterName(z)];
          }
        }
      } else if(x === 0b10) {
        switch(y) {
          case 0b000: // add
            this.registers.A = this.add8Bit(this.registers.A, this.registers[this.getRegisterName(z)]);
            break;
          case 0b001: // adc
            this.registers.A = this.adc(this.registers.A, this.registers[this.getRegisterName(z)]);
            break;
          case 0b010: // sub
            this.registers.A = this.sub(this.registers[this.getRegisterName(z)]);
            break;
          case 0b011: // sbc
            this.registers.A = this.sbc(this.registers[this.getRegisterName(z)]);
            break;
          case 0b100: // and
            this.and(this.registers[this.getRegisterName(z)]);
            break;
          case 0b101: // xor
            this.xor(this.registers[this.getRegisterName(z)]);
            break;
          case 0b110: // or
            this.or(this.registers[this.getRegisterName(z)]);
            break;
          case 0b111: // cp
            this.cp(this.registers[this.getRegisterName(z)]);
            break;
        }
      } else if(x === 0b11) {

      }
    }
  }

  private doMath(y: number) {
    switch(y) {
      case 0b000:
        this.rlca();
        break;
      case 0b001:
        this.rrca();
        break;
      case 0b010:
        this.rla();
        break;
      case 0b011:
        this.rra();
        break;
      case 0b100:
        this.daa();
        break;
      case 0b101:
        this.cpl();
        break;
      case 0b110:
        this.scf();
        break;
      case 0b111:
        this.ccf();
        break;
    }
  }

  /**
   * Shifts {@code value} left, sets the carry flag and the 0th bit to the value of the 7th bit. Sets the necessary flags.
   * @param value The value to shift.
   * @return The shifted value.
   */
  private rlc(value: number): number {
    // check the 7th bit of the value.
    if((value & 0x80) === 0x80) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    // subtraction and half carry flags are reset.
    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF);

    // shift A left by 1 bit, change the 0th bit to whatever the carry flag was.
    const result = (((value << 1) & (~0x01)) | ((value & 0x80) >> 7)) & 0xFF;

    if(result === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    return result;
  }

  /**
   * Shift A left by 1 bit. Carry flag is set to the 7th bit of A.
   */
  private rlca() {
    const carry = (this.registers.A & 0x80) >> 7;

    if(carry === 1) {
      this.setFlags(CPU.FLAGS.CARRY);
    }

    // shift bit left by 1 and get the first 8 bits
    this.registers.A = (this.registers.A << 1) & 0xFF;

    // set the 0th bit to whatever was at the 7th bit.
    this.registers.A = this.registers.A | carry;

    this.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * Shifts {@code value} right, sets the carry flag and the 7th bit to the value of the 0th bit. Sets the necessary flags.
   * @param value The value to shift.
   * @return The shifted value.
   */
  private rrc(value: number): number {
    // check the 0th bit of the value.
    if((value & 0x01) === 0x01) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    // subtraction and half carry flags are reset.
    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF);

    // shift A left by 1 bit, change the 0th bit to whatever the carry flag was.
    // (((0x01 >> 1) & (~0x01)) | ((0x01 & 0x01) << 7)) & 0xFF
    const result = (((value >> 1) & (~0x01)) | ((value & 0x01) << 7)) & 0xFF;

    if(result === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    return result;
  }

  /**
   * Shift A right by 1 bit. Carry flag is set to the 0th bit of A.
   */
  private rrca() {
    const carry = this.registers.A & 0x01;

    if(carry === 0x01) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    // set the 7th bit to whatever was at the 0th bit.
    this.registers.A = (((this.registers.A >> 1) & (~0x80)) | (carry << 7)) & 0xFF;

    this.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * Shifts {@code value} left, sets the 0th bit to the value of the carry flag. Sets the necessary flags.
   * @param value The value to shift.
   * @return The shifted value.
   */
  private rl(value: number): number {
    const carry = this.registers.F & CPU.FLAGS.CARRY;

    if((value & 0x80) === 0x80) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    const result = ((value << 1) | carry) & 0xFF;

    if(result === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    return result;
  }

  /**
   * Shift A left by 1. The 0th bit of A is set to the value of the CARRY flag. CARRY flag is set to the 7th bit of A.
   */
  private rla() {
    // get current state of carry flag.
    const carry = (this.registers.F & CPU.FLAGS.CARRY) >> 4;

    // check the 7th bit of A.
    if((this.registers.A & 0x80) === 0x80) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    // shift A left by 1 bit, change the 0th bit to whatever the carry flag was.
    this.registers.A = (((this.registers.A << 1) & (~0x01)) | carry) & 0xFF;

    // all other flags are reset.
    this.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * Shifts {@code value} right, sets the 7th bit to the value of the carry flag. Sets the necessary flags.
   * @param value The value to shift.
   * @return The shifted value.
   */
  private rr(value: number): number {
      const carry = this.registers.F & CPU.FLAGS.CARRY;

      if((value & 0x01) === 0x01) {
        this.setFlags(CPU.FLAGS.CARRY);
      } else {
        this.resetFlags(CPU.FLAGS.CARRY);
      }

      const result = ((value >> 1) | (carry << 7)) & 0xFF;

      if(result === 0) {
        this.setFlags(CPU.FLAGS.ZERO);
      } else {
        this.resetFlags(CPU.FLAGS.ZERO);
      }

      return result;
    }

  /**
   * Shift A right by 1. The 7th bit of A is set to the value of the CARRY flag. CARRY flag is set the 0th bit of A.
   */
  private rra() {
    // get current state of carry flag.
    const carry = (this.registers.F & CPU.FLAGS.CARRY) >> 4;

    // check the 0th bit of A.
    if((this.registers.A & 0x01) === 0x01) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    // shift A right by 1 bit, change the 7th bit to whatever the carry flag was.
    this.registers.A = (((this.registers.A >> 1) & (~0x80)) | (carry << 7)) & 0xFF;

    // all other flags are reset.
    this.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * When performing addition and subtraction, binary coded decimal (BCD) representation is
   * used to set the contents of register A to a BCD number.
   */
  private daa() {
    const sub = (this.registers.F & CPU.FLAGS.SUB) === CPU.FLAGS.SUB;
    const half = (this.registers.F & CPU.FLAGS.HALF) === CPU.FLAGS.HALF;
    const carry = (this.registers.F & CPU.FLAGS.CARRY) === CPU.FLAGS.CARRY;

    // after an addition, adjust A if a HALF_CARRY or CARRY occurred or if the result is out of bounds.
    if(!sub) {
      if(carry || this.registers.A > 0x99) {
        this.registers.A = (this.registers.A + 0x60) & 0xFF;
        this.setFlags(CPU.FLAGS.CARRY);
      }

      if(half || (this.registers.A & 0x0F) > 0x09) {
        this.registers.A = (this.registers.A + 0x06) & 0xFF;
      }
    } else {
      // after a subtraction, only adjust if a HALF_CARRY or CARRY occurred.
      if(carry) {
        this.registers.A = (this.registers.A - 0x60) & 0xFF;
      }

      if(half) {
        this.registers.A = (this.registers.A - 0x06) & 0xFF;
      }
    }

    // set zero flag if A register is zero.
    if(this.registers.A === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    // half carry always reset.
    this.resetFlags(CPU.FLAGS.HALF);
  }

  /**
   * Take the one's compliment of A and store the result in A.
   */
  private cpl() {
    this.registers.A = (~this.registers.A) & 0xFF;
    this.setFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * Sets carry flag, resets half carry and subtraction flags.
   */
  private scf() {
    this.setFlags(CPU.FLAGS.CARRY);
    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
  }

  /**
   * Toggle the carry flag.
   */
  private ccf() {
    const carry = ((~this.registers.F & 0xFF) & CPU.FLAGS.CARRY) >> 4;

    if(carry === 1) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }
  }

  /**
   * Adds two 8-bit numbers together and sets the necessary flags.
   * @param num1 The first number.
   * @param num2 The second number.
   * @return The 8-bit result of the addition.
   */
  private add8Bit(num1: number, num2: number): number {
    const result = num1 + num2;

    if((result & 0xFF00) !== 0) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    if((result & 0xFF) !== 0) {
      this.resetFlags(CPU.FLAGS.ZERO);
    } else {
      this.setFlags(CPU.FLAGS.ZERO);
    }

    if(((num1 & 0x0F) + (num2 & 0x0F)) > 0x0F) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    this.resetFlags(CPU.FLAGS.SUB);
    return result & 0xFF;
  }

  /**
   * Adds two 8-bit numbers with the current value of the carry flag and sets the necessary flags.
   * @param num1 The first number.
   * @param num2 The second number.
   * @return The 8-bit result of the addition.
   */
  private adc(num1: number, num2: number): number {
    const carry = (this.registers.F & CPU.FLAGS.CARRY) >> 4;
    const result = num1 + num2 + carry;

    if((result & 0xFF00) !== 0) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    if((result & 0xFF) !== 0) {
      this.resetFlags(CPU.FLAGS.ZERO);
    } else {
      this.setFlags(CPU.FLAGS.ZERO);
    }

    if(((num1 & 0x0F) + (num2 & 0x0F) + carry) > 0x0F) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    this.resetFlags(CPU.FLAGS.SUB);
    return result & 0xFF;
  }

  /**
   * Subtracts {@code value} from A and sets the necessary flags.
   * @param value The value to subtract from A.
   * @return The 8-bit result of the subtraction.
   */
  private sub(value: number): number {
    if(value > this.registers.A) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    if((value & 0x0F) > (this.registers.A & 0x0F)) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    const result = (this.registers.A - value) & 0xFF;

    if(result === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    this.setFlags(CPU.FLAGS.SUB);

    return result;
  }

  /**
   * Subtracts {@code value} and the current value of the carry flag from A and sets the necessary flags.
   * @param value The value to subtract from A.
   * @return The 8-bit result of the subtraction.
   */
  private sbc(value: number): number {
    let result = this.registers.A - value;
    result = result - ((this.registers.F & CPU.FLAGS.CARRY) >> 4);

    if(result < 0) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    result &= 0xFF;

    if(result === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    if(((result ^ value ^ this.registers.A) & 0x10) === 0x10) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    this.setFlags(CPU.FLAGS.SUB);

    return result;
  }

  /**
   * Performs a bitwise and operation on A and {@code value}.
   * @param value The value to bitwise and with A
   */
  private and(value: number) {
    this.registers.A &= value;

    if(this.registers.A === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
    this.setFlags(CPU.FLAGS.HALF);
  }

  /**
   * Performs a bitwise xor operation on A and {@code value}.
   * @param value The value to bitwise xor with A
   */
  private xor(value: number) {
    this.registers.A ^= value;

    if(this.registers.A === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
  }

  /**
   * Performs a bitwise or operation on A and {@code value}.
   * @param value The value to bitwise or with A
   */
  private or(value: number) {
    this.registers.A |= value;

    if(this.registers.A === 0) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    this.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
  }

  /**
   * Compares the contents of A and {@code value} and sets flags if they are equal.
   * @param value The value to bitwise and with A
   */
  private cp(value: number) {
    if(this.registers.A === value) {
      this.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.resetFlags(CPU.FLAGS.ZERO);
    }

    if((this.registers.A & 0x0F) < (value & 0x0F)) {
      this.setFlags(CPU.FLAGS.HALF);
    } else {
      this.resetFlags(CPU.FLAGS.HALF);
    }

    if(this.registers.A < value) {
      this.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.resetFlags(CPU.FLAGS.CARRY);
    }

    this.setFlags(CPU.FLAGS.SUB);
  }

  /**
   * Tick one clock cycle
   */
  public tick(): void {
    // this.decode(this.memory.getByteAt(this.registers.PC++));
    this.decode(0x1C);

    this.emit({
      registers: this.registers
    });
  }
}
