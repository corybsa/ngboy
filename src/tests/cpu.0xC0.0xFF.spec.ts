import { inject, TestBed } from '@angular/core/testing';
import { CPU } from '../app/system/cpu';
import { Memory } from '../app/system/memory';

function createRom(data) {
  const rom = [];

  for(let i = 0; i < data.length; i++) {
    rom[0x100 + i] = data[i];
  }

  return rom;
}

describe('Test', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CPU,
        Memory
      ]
    });
  });

  describe('0xC0 - 0xFF', () => {
    describe('0xC0 - 0xCF', () => {
      describe('0xC0: ret nz', () => {
        it('should not return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xC0; // ret nz
          memory.loadROM(rom);

          // condition for return is false
          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1235);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xC0; // ret nz
          memory.loadROM(rom);

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(44);
        }));

        it('should return and load $1337 into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x103] = 0x01; // ld bc, $1337
          rom[0x104] = 0x37;
          rom[0x105] = 0x13;
          rom[0x1234] = 0xC0; // ret nz
          memory.loadROM(rom);

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.BC).toBe(0x1337);
          expect((<any>cpu).cycles).toBe(56);
        }));
      });

      describe('0xC1: pop bc', () => {
        it('should load $BEEF into BC, push it onto the stack, load $1337 into BC and then pop $BEEF off the stack and into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $BEEF
            0xEF,
            0xBE,
            0xC5, // push bc
            0x01, // ld bc, $1337
            0x37,
            0x13,
            0xC1 // pop bc
          ]));

          cpu.tick();
          cpu.tick();
          expect((<any>cpu).registers.SP).toBe(0xFFFC);

          cpu.tick();
          expect((<any>cpu).registers.BC).toBe(0x1337);

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x108);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.BC).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(52);
        }));
      });

      describe('0xC2: jp nz, xx', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC2, // jp nz, $1234
            0x34,
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should not jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC2, // jp nz, $1234
            0x34,
            0x12
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xC3: jp xx', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC3, // jp $1234
            0x34,
            0x12
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xC4: call nz, xx', () => {
        it('should call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC4, // call nz, $1234
            0x34,
            0x12
          ]));

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x03);
          expect((<any>cpu).cycles).toBe(24);
        }));

        it('should not call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC4, // call nz, $1234
            0x34,
            0x12
          ]));

          // condition for return is false
          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xC5: push bc', () => {
        it('should load $BEEF into BC and push it onto the stack', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $BEEF
            0xEF,
            0xBE,
            0xC5 // push bc
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0xBE);
          expect(memory.getByteAt(0xFFFC)).toBe(0xEF);
          expect((<any>cpu).registers.BC).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xC6: add a, x', () => {
        it('should add $50 to A and store the value in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, 0x3A
            0x3A,
            0xC6, // add a, $C6
            0xC6
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xC7: rst 00', () => {
        it('should call $00', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xC7 // rst $00
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x00);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xC8: ret z', () => {
        it('should not return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xC8; // ret z
          memory.loadROM(rom);

          // condition for return is false
          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1235);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xC8; // ret z
          memory.loadROM(rom);

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(44);
        }));

        it('should return and load $1337 into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x103] = 0x01; // ld bc, $1337
          rom[0x104] = 0x37;
          rom[0x105] = 0x13;
          rom[0x1234] = 0xC8; // ret z
          memory.loadROM(rom);

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.BC).toBe(0x1337);
          expect((<any>cpu).cycles).toBe(56);
        }));
      });

      describe('0xC9: ret', () => {
        it('should return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xC9; // ret
          memory.loadROM(rom);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(40);
        }));
      });

      describe('0xCA: jp z, xx', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCA, // jp z, $1234
            0x34,
            0x12
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should not jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCA, // jp z, $1234
            0x34,
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xCC: call z, xx', () => {
        it('should call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCC, // call z, $1234
            0x34,
            0x12
          ]));

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x03);
          expect((<any>cpu).cycles).toBe(24);
        }));

        it('should not call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCC, // call z, $1234
            0x34,
            0x12
          ]));

          // condition for return is false
          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xCD: call xx', () => {
        it('should call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCD, // call $1234
            0x34,
            0x12
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x03);
          expect((<any>cpu).cycles).toBe(24);
        }));
      });

      describe('0xCE: adc a, x', () => {
        it('should perform adc with ', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0xCE, // adc a, $1E
            0x1E
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCF: rst 08', () => {
        it('should call $08', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xCF // rst $08
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x08);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xD0 - 0xDF', () => {
      describe('0xD0: ret nc', () => {
        it('should not return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xD0; // ret nc
          memory.loadROM(rom);

          // condition for return is false
          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1235);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xD0; // ret nc
          memory.loadROM(rom);

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(44);
        }));

        it('should return and load $1337 into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x103] = 0x01; // ld bc, $1337
          rom[0x104] = 0x37;
          rom[0x105] = 0x13;
          rom[0x1234] = 0xD0; // ret nc
          memory.loadROM(rom);

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.BC).toBe(0x1337);
          expect((<any>cpu).cycles).toBe(56);
        }));
      });

      describe('0xD1: pop de', () => {
        it('should load $BEEF into DE, push it onto the stack, load $1337 into DE and then pop $BEEF off the stack and into DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $BEEF
            0xEF,
            0xBE,
            0xD5, // push de
            0x11, // ld de, $1337
            0x37,
            0x13,
            0xD1 // pop de
          ]));

          cpu.tick();
          cpu.tick();
          expect((<any>cpu).registers.SP).toBe(0xFFFC);

          cpu.tick();
          expect((<any>cpu).registers.DE).toBe(0x1337);

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x108);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.DE).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(52);
        }));
      });

      describe('0xD2: jp nc, xx', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD2, // jp nz, $1234
            0x34,
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should not jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD2, // jp nz, $1234
            0x34,
            0x12
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xD3: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD3 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0xD4: call nc, xx', () => {
        it('should call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD4, // call nc, $1234
            0x34,
            0x12
          ]));

          // condition for return is true
          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x03);
          expect((<any>cpu).cycles).toBe(24);
        }));

        it('should not call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD4, // call nc, $1234
            0x34,
            0x12
          ]));

          // condition for return is false
          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xD5: push de', () => {
        it('should load $BEEF into DE and push it onto the stack', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $BEEF
            0xEF,
            0xBE,
            0xD5 // push de
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0xBE);
          expect(memory.getByteAt(0xFFFC)).toBe(0xEF);
          expect((<any>cpu).registers.DE).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xD6: sub x', () => {
        it('should subtract $3E from $3E and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0xD6, // sub $3E
            0x3E
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should subtract $0F from $3E and set the SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0xD6, // sub $0F
            0x0F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should subtract $40 from $3E and set the SUB and CARRY flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0xD6, // sub $40
            0x40
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xD7: rst 10', () => {
        it('should call $10', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xD7 // rst $10
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x10);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xD8: ret c', () => {
        it('should not return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xD8; // ret c
          memory.loadROM(rom);

          // condition for return is false
          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1235);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should return', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x1234] = 0xD8; // ret c
          memory.loadROM(rom);

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(44);
        }));

        it('should return and load $1337 into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xCD; // call $1234
          rom[0x101] = 0x34;
          rom[0x102] = 0x12;
          rom[0x103] = 0x01; // ld bc, $1337
          rom[0x104] = 0x37;
          rom[0x105] = 0x13;
          rom[0x1234] = 0xD8; // ret c
          memory.loadROM(rom);

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.BC).toBe(0x1337);
          expect((<any>cpu).cycles).toBe(56);
        }));
      });

      describe('0xD9: reti', () => {
        it('should return and enable the IME', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          const rom = [];
          rom[0x100] = 0xF3; // di
          rom[0x101] = 0xCD; // call $1234
          rom[0x102] = 0x34;
          rom[0x103] = 0x12;
          rom[0x1234] = 0xD9; // reti
          memory.loadROM(rom);

          cpu.tick();
          expect((<any>cpu).ime).toBe(false);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).ime).toBe(true);
          expect((<any>cpu).cycles).toBe(44);
        }));
      });

      describe('0xDA: jp c, xx', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xDA, // jp c, $1234
            0x34,
            0x12
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should not jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xDA, // jp c, $1234
            0x34,
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xDB: xxxxx', () => {
      });

      describe('0xDC: call c, xx', () => {
        it('should call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xDC, // call c, $1234
            0x34,
            0x12
          ]));

          // condition for return is true
          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x03);
          expect((<any>cpu).cycles).toBe(24);
        }));

        it('should not call $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xDC, // call c, $1234
            0x34,
            0x12
          ]));

          // condition for return is false
          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xDD: xxxxx', () => {
      });

      describe('0xDE: xxxxx', () => {
      });

      describe('0xDF: rst 18', () => {
        it('should call $18', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xDF // rst $18
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x18);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xE0 - 0xEF', () => {
      describe('0xE0: xxxxx', () => {
      });

      describe('0xE1: pop hl', () => {
        it('should load $BEEF into HL, push it onto the stack, load $1337 into HL and then pop $BEEF off the stack and into HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $BEEF
            0xEF,
            0xBE,
            0xE5, // push hl
            0x21, // ld hl, $1337
            0x37,
            0x13,
            0xE1 // pop hl
          ]));

          cpu.tick();
          cpu.tick();
          expect((<any>cpu).registers.SP).toBe(0xFFFC);

          cpu.tick();
          expect((<any>cpu).registers.HL).toBe(0x1337);

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x108);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.HL).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(52);
        }));
      });

      describe('0xE2: xxxxx', () => {
      });

      describe('0xE3: xxxxx', () => {
      });

      describe('0xE4: xxxxx', () => {
      });

      describe('0xE5: push hl', () => {
        it('should load $BEEF into HL and push it onto the stack', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $BEEF
            0xEF,
            0xBE,
            0xE5 // push hl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0xBE);
          expect(memory.getByteAt(0xFFFC)).toBe(0xEF);
          expect((<any>cpu).registers.HL).toBe(0xBEEF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xE6: xxxxx', () => {
      });

      describe('0xE7: rst 20', () => {
        it('should call $20', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xE7 // rst $20
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x20);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xE8: xxxxx', () => {
      });

      describe('0xE9: jp hl', () => {
        it('should jump to $1234', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $1234
            0x34,
            0x12,
            0xE9 // jp hl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x1234);
          expect((<any>cpu).registers.HL).toBe(0x1234);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xEA: xxxxx', () => {
      });

      describe('0xEB: xxxxx', () => {
      });

      describe('0xEC: xxxxx', () => {
      });

      describe('0xED: xxxxx', () => {
      });

      describe('0xEE: xxxxx', () => {
      });

      describe('0xEF: rst 28', () => {
        it('should call $28', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xEF // rst $28
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x28);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xF0 - 0xFF', () => {
      describe('0xF0: xxxxx', () => {
      });

      describe('0xF1: pop af', () => {
        it('should load $69 into A, push AF onto the stack, load $42 into A and then pop $69B0 off the stack and into AF', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $69
            0x69,
            0xF5, // push af
            0x3E, // ld a, $42
            0x42,
            0xF1 // pop af
          ]));

          cpu.tick();
          cpu.tick();
          expect((<any>cpu).registers.SP).toBe(0xFFFC);

          cpu.tick();
          expect((<any>cpu).registers.AF).toBe(0x42B0);

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xFFFE);
          expect((<any>cpu).registers.AF).toBe(0x69B0);
          expect((<any>cpu).cycles).toBe(44);
        }));
      });

      describe('0xF2: xxxxx', () => {
      });

      describe('0xF3: di', () => {
        it('should disable the IME', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xF3 // di
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).ime).toBe(false);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0xF4: xxxxx', () => {
      });

      describe('0xF5: push af', () => {
        it('should load $69 into A and push AF onto the stack', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $69
            0x69,
            0xF5 // push af
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x69);
          expect(memory.getByteAt(0xFFFC)).toBe(0xB0);
          expect((<any>cpu).registers.AF).toBe(0x69B0);
          expect((<any>cpu).cycles).toBe(24);
        }));
      });

      describe('0xF6: xxxxx', () => {
      });

      describe('0xF7: rst 30', () => {
        it('should call $30', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xF7 // rst $30
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x30);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xF8: xxxxx', () => {
      });

      describe('0xF9: xxxxx', () => {
      });

      describe('0xFA: xxxxx', () => {
      });

      describe('0xFB: ei', () => {
        it('should enable the IME on the cycle after ei executes', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xF3, // di
            0x00, // nop
            0xFB, // ei
            0x00 // nop
          ]));

          cpu.tick();
          expect((<any>cpu).ime).toBe(false);

          cpu.tick();
          cpu.tick();
          expect((<any>cpu).ime).toBe(false);

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).ime).toBe(true);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xFC: xxxxx', () => {
      });

      describe('0xFD: xxxxx', () => {
      });

      describe('0xFE: xxxxx', () => {
      });

      describe('0xFF: rst 38', () => {
        it('should call $38', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xFF // rst $38
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x38);
          expect((<any>cpu).registers.SP).toBe(0xFFFC);
          expect(memory.getByteAt(0xFFFD)).toBe(0x01);
          expect(memory.getByteAt(0xFFFC)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });
  });
});
