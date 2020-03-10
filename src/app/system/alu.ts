import { CPU } from './cpu';

export class ALU {
  constructor(private cpu: CPU) {
  }

  /**
   * Adds two 8-bit numbers together and sets the necessary flags.
   * @param num1 The first number.
   * @param num2 The second number.
   * @return The 8-bit result of the addition.
   */
  public add8Bit(num1: number, num2: number): number {
    const result = num1 + num2;

    if((result & 0xFF00) !== 0) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    if((result & 0xFF) !== 0) {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    }

    if(((num1 & 0x0F) + (num2 & 0x0F)) > 0x0F) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB);
    return result & 0xFF;
  }

  /**
   * Adds two 16-bit numbers together and sets the necessary flags.
   * @param num1 The first number.
   * @param num2 The second number.
   * @return The 16-bit result of the addition.
   */
  public add16Bit(num1: number, num2: number): number {
    const result = num1 + num2;

    if((result & 0xFFFF0000) !== 0) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    if(((num1 & 0x0F00) + (num2 & 0x0F00)) > 0x0F00) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB);
    return result & 0xFFFF;
  }

  /**
   * Adds two 8-bit numbers with the current value of the carry flag and sets the necessary flags.
   * @param num1 The first number.
   * @param num2 The second number.
   * @return The 8-bit result of the addition.
   */
  public adc(num1: number, num2: number): number {
    const carry = (this.cpu.getRegisters().F & CPU.FLAGS.CARRY) >> 4;
    const result = num1 + num2 + carry;

    if((result & 0xFF00) !== 0) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    if((result & 0xFF) !== 0) {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    }

    if(((num1 & 0x0F) + (num2 & 0x0F) + carry) > 0x0F) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB);
    return result & 0xFF;
  }

  /**
   * Subtracts {@code num1} from {@code num2} and sets the necessary flags.
   * @param num1 The lvalue of the subtraction.
   * @param num2 The rvalue of the subtraction.
   * @return The 8-bit result of the subtraction.
   */
  public sub(num1: number, num2: number): number {
    if(num2 > num1) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    if((num2 & 0x0F) > (num1 & 0x0F)) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    const result = (num1 - num2) & 0xFF;

    if(result === 0) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    this.cpu.setFlags(CPU.FLAGS.SUB);

    return result;
  }

  /**
   * Subtracts {@code num2} and the current num2 of the carry flag from A and sets the necessary flags.
   * @param num1 The lvalue of the subtraction.
   * @param num2 The rvalue of the subtraction.
   * @return The 8-bit result of the subtraction.
   */
  public sbc(num1: number, num2: number): number {
    let result = num1 - num2;
    result = result - ((this.cpu.getRegisters().F & CPU.FLAGS.CARRY) >> 4);

    if(result < 0) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    result &= 0xFF;

    if(result === 0) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    if(((result ^ num2 ^ num1) & 0x10) === 0x10) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    this.cpu.setFlags(CPU.FLAGS.SUB);

    return result;
  }

  /**
   * Performs a bitwise and operation on {@code num1} and {@code num2}.
   * @param num1 The first value bitwise and with A
   * @param num2 The second value bitwise and with A
   */
  public and(num1: number, num2: number): number {
    num1 &= num2;

    if(num1 === 0) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
    this.cpu.setFlags(CPU.FLAGS.HALF);

    return num1;
  }

  /**
   * Performs a bitwise xor operation on {@code num1} and {@code num2}.
   * @param num1 The first value to bitwise xor with A
   * @param num2 The second value to bitwise xor with A
   */
  public xor(num1: number, num2: number) {
    num1 ^= num2;

    if(num1 === 0) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);

    return num1;
  }

  /**
   * Performs a bitwise or operation on {@code num1} and {@code num2}.
   * @param num1 The first value to bitwise or with A
   * @param num2 The second value to bitwise or with A
   */
  public or(num1: number, num2: number): number {
    num1 |= num2;

    if(num1 === 0) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    this.cpu.resetFlags(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);

    return num1;
  }

  /**
   * Compares the contents of {@code num1} and {@code num2} and sets flags if they are equal.
   * @param num1 The first value to compare
   * @param num2 The second value to compare
   */
  public cp(num1: number, num2: number): number {
    if(num1 === num2) {
      this.cpu.setFlags(CPU.FLAGS.ZERO);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.ZERO);
    }

    if((num1 & 0x0F) < (num2 & 0x0F)) {
      this.cpu.setFlags(CPU.FLAGS.HALF);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.HALF);
    }

    if(num1 < num2) {
      this.cpu.setFlags(CPU.FLAGS.CARRY);
    } else {
      this.cpu.resetFlags(CPU.FLAGS.CARRY);
    }

    this.cpu.setFlags(CPU.FLAGS.SUB);

    return num1;
  }
}
