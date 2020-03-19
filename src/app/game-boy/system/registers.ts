export class Registers {
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  F: number;
  H: number;
  L: number;
  SP: number;
  PC: number;

  public set AF(n: number) {
    this.A = (n & 0xFF00) >> 8;
    this.F = n & 0x00F0;
  }

  public get AF() {
    return (this.A << 8) | this.F;
  }

  public set BC(n: number) {
    this.B = (n & 0xFF00) >> 8;
    this.C = n & 0x00FF;
  }

  public get BC() {
    return (this.B << 8) | this.C;
  }

  public set DE(n: number) {
    this.D = (n & 0xFF00) >> 8;
    this.E = n & 0x00FF;
  }

  public get DE() {
    return (this.D << 8) | this.E;
  }

  public set HL(n: number) {
    this.H = (n & 0xFF00) >> 8;
    this.L = n & 0x00FF;
  }

  public get HL() {
    return (this.H << 8) | this.L;
  }
}
