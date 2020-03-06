import { CPU } from './cpu';

export class Instruction {
  size: number;
  cycles: number;
  name: string;
  execOp: Function;

  constructor(size: number, cycles: number, name: string, execOp: Function) {
    this.size = size;
    this.cycles = cycles;
    this.name = name;
    this.execOp = execOp;
  }

  exec(op1?: number, op2?: number) {
    this.execOp();
  }
}

export class Instructions {
  [key: number]: Instruction;

  constructor() {

  }
}
