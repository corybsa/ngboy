import { Debugger } from '../util/debugger';
import { CpuInfo } from '../models/cpu-info.model';

export class CPU extends Debugger<CpuInfo> {
  // The frequency of the clock in MHz.
  public static FREQUENCY = 4194304;

  public static FLAGS = {
    ZERO: 0x80,
    SUB: 0x40,
    HALF: 0x20,
    CARRY: 0x10
  };

  private registers = {
    AF: 0x01B0,
    BC: 0x0013,
    DE: 0x00D8,
    HL: 0x014D,
    SP: 0xFFFE,
    PC: 0x100
  };

  constructor() {
    super();

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

  public tick(): void {
    this.incB();

    this.emit({
      registers: this.registers
    });
  }

  public incB(): void {
    this.registers.BC = (this.increment(this.registers.BC >> 8) << 8) & 0xFFFF;
  }
}
