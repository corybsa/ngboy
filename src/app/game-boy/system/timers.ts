/**
 * Class for timer information
 *
 * For the TAC (Timer Control - 0xFF07) register, bit 2 determines if it is active or not and
 * bits 0 and 1 combine to determine the frequency:
 * 00:   4096 Hz
 * 01: 262144 Hz
 * 10:  65536 Hz
 * 11:  16384 Hz
 *
 * The value in clock cycles:
 * 00:  4194304/4096 = 1024 machine cycles
 * 01:  4194304/262144 = 16 machine cycles
 * 10:  4194304/65536 =  64 machine cycles
 * 11:  4194304/16384 = 256 machine cycles
 */
export class Timers {
  static divCounter = 0;
  static timaCounter = 0;

  public static TAC = {
    CLOCK1: 1024,
    CLOCK2: 16,
    CLOCK3: 64,
    CLOCK4: 256
  };

  public static getFrequency(frequency: number): number {
    switch(frequency) {
      case 0b00:
        return Timers.TAC.CLOCK1;
      case 0b01:
        return Timers.TAC.CLOCK2;
      case 0b10:
        return Timers.TAC.CLOCK3;
      case 0b11:
        return Timers.TAC.CLOCK4;
    }
  }
}
