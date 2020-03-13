import { inject, TestBed } from '@angular/core/testing';
import { CPU } from '../app/system/cpu';
import { Memory } from '../app/system/memory';

const mem = new Memory();

function createRom(data) {
  const rom = [];

  for(let i = 0; i < data.length; i++) {
    rom[0x100 + i] = data[i];
  }

  return rom;
}

describe('CPU Op Codes 0x80 - 0xBF', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CPU,
        { provide: Memory, useValue: mem }
      ]
    });
  });

  describe('0x80 - 0xBF', () => {
    describe('0x80 - 0x8F', () => {
      describe('0x80: add a, b', () => {
        it('should add B to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x06, // ld b, 0xC6
            0xC6,
            0x80 // add a, b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x81: add a, c', () => {
        it('should add C to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x0E, // ld c, 0xC6
            0xC6,
            0x81 // add a, c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x82: add a, d', () => {
        it('should add D to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x16, // ld d, 0xC6
            0xC6,
            0x82 // add a, d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x83: add a, e', () => {
        it('should add E to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x1E, // ld e, 0xC6
            0xC6,
            0x83 // add a, e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x84: add a, h', () => {
        it('should add H to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x26, // ld h, 0xC6
            0xC6,
            0x84 // add a, h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x85: add a, l', () => {
        it('should add L to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x2E, // ld l, 0xC6
            0xC6,
            0x85 // add a, l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x86: add a, (hl)', () => {
        it('should add the value in memory pointed to by HL to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3A
            0x3A,
            0x21, // ld hl, 0xC000
            0x00,
            0xC0,
            0x86 // add a, (hl)
          ]));

          memory.setByteAt(0xC000, 0xC6);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x87: add a, a', () => {
        it('should add A to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $80
            0x80,
            0x87 // add a, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x88: adc a, b', () => {
        it('should add B (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x06, // ld b, 0x1E
            0x1E,
            0x88 // adc a, b
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x89: adc a, c', () => {
        it('should add C (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x0E, // ld c, 0x1E
            0x1E,
            0x89 // adc a, c
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x8A: adc a, d', () => {
        it('should add D (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x16, // ld d, 0x1E
            0x1E,
            0x8A // adc a, d
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x8B: adc a, e', () => {
        it('should add E (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x1E, // ld e, 0x1E
            0x1E,
            0x8B // adc a, e
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x8C: adc a, h', () => {
        it('should add H (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x26, // ld h, 0x1E
            0x1E,
            0x8C // adc a, h
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x8D: adc a, l', () => {
        it('should add L (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x2E, // ld l, 0x1E
            0x1E,
            0x8D // adc a, l
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x8E: adc a, (hl)', () => {
        it('should add the value in memory pointed to by HL (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $E1
            0xE1,
            0x21, // ld hl, 0xC000
            0x00,
            0xC0,
            0x8E // adc a, (hl)
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          memory.setByteAt(0xC000, 0x1E);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x8F: adc a, a', () => {
        it('should add A (and carry) to A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $80
            0x80,
            0x8F // adc a, a
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x01);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x90 - 0x9F', () => {
      describe('0x90: sub b', () => {
        it('should subtract B from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x06, // ld b, $3E
            0x3E,
            0x90 // sub b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract B from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x06, // ld b, $0F
            0x0F,
            0x90 // sub b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract B from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x06, // ld b, $40
            0x40,
            0x90 // sub b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x91: sub c', () => {
        it('should subtract C from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x0E, // ld c, $3E
            0x3E,
            0x91 // sub c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract C from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x0E, // ld c, $0F
            0x0F,
            0x91 // sub c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract C from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x0E, // ld c, $40
            0x40,
            0x91 // sub c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x92: sub d', () => {
        it('should subtract D from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x16, // ld d, $3E
            0x3E,
            0x92 // sub d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract D from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x16, // ld d, $0F
            0x0F,
            0x92 // sub d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract D from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x16, // ld d, $40
            0x40,
            0x92 // sub d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x93: sub e', () => {
        it('should subtract E from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x1E, // ld e, $3E
            0x3E,
            0x93 // sub e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract E from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x1E, // ld e, $0F
            0x0F,
            0x93 // sub e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract E from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x1E, // ld e, $40
            0x40,
            0x93 // sub e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x94: sub h', () => {
        it('should subtract H from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x26, // ld h, $3E
            0x3E,
            0x94 // sub h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract H from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x26, // ld h, $0F
            0x0F,
            0x94 // sub h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract H from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x26, // ld h, $40
            0x40,
            0x94 // sub h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x95: sub l', () => {
        it('should subtract L from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x2E, // ld l, $3E
            0x3E,
            0x95 // sub l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract L from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x2E, // ld l, $0F
            0x0F,
            0x95 // sub l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract L from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x2E, // ld l, $40
            0x40,
            0x95 // sub l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x96: sub (hl)', () => {
        it('should subtract the value in memory pointed to by HL from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x96 // sub (hl)
          ]));

          memory.setByteAt(0xC000, 0x3E);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should subtract the value in memory pointed to by HL from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x96 // sub (hl)
          ]));

          memory.setByteAt(0xC000, 0x0F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x2F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should subtract the value in memory pointed to by HL from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x96 // sub (hl)
          ]));

          memory.setByteAt(0xC000, 0x40);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x97: sub a', () => {
        it('should subtract A from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3E
            0x3E,
            0x97 // sub (hl)
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x98: sbc a, b', () => {
        it('should subtract B (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x06, // ld b, $2A
            0x2A,
            0x98 // sbc a, b
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract B (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x06, // ld b, $3A
            0x3A,
            0x98 // sbc a, b
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract B (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x06, // ld b, $4F
            0x4F,
            0x98 // sbc a, b
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x99: sbc a, c', () => {
        it('should subtract C (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x0E, // ld c, $2A
            0x2A,
            0x99 // sbc a, c
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract C (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x0E, // ld c, $3A
            0x3A,
            0x99 // sbc a, c
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract C (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x0E, // ld c, $4F
            0x4F,
            0x99 // sbc a, c
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x9A: sbc a, d', () => {
        it('should subtract D (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x16, // ld d, $2A
            0x2A,
            0x9A // sbc a, d
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract D (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x16, // ld d, $3A
            0x3A,
            0x9A // sbc a, d
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract D (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x16, // ld d, $4F
            0x4F,
            0x9A // sbc a, d
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x9B: sbc a, e', () => {
        it('should subtract E (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x1E, // ld e, $2A
            0x2A,
            0x9B // sbc a, e
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract E (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x1E, // ld e, $3A
            0x3A,
            0x9B // sbc a, e
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract E (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x1E, // ld e, $4F
            0x4F,
            0x9B // sbc a, e
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x9C: sbc h', () => {
        it('should subtract H (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x26, // ld h, $2A
            0x2A,
            0x9C // sbc a, h
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract H (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x26, // ld h, $3A
            0x3A,
            0x9C // sbc a, h
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract H (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x26, // ld h, $4F
            0x4F,
            0x9C // sbc a, h
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x9D: sbc l', () => {
        it('should subtract L (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x2E, // ld l, $2A
            0x2A,
            0x9D // sbc a, l
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract L (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x2E, // ld l, $3A
            0x3A,
            0x9D // sbc a, l
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should subtract L (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x2E, // ld l, $4F
            0x4F,
            0x9D // sbc a, l
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x9E: sbc (hl)', () => {
        it('should subtract the value in memory pointed to by HL (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x9E // sbc a, (hl)
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          memory.setByteAt(0xC000, 0x2A);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should subtract the value in memory pointed to by HL (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x9E // sbc a, (hl)
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          memory.setByteAt(0xC000, 0x3A);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should subtract the value in memory pointed to by HL (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x9E // sbc a, (hl)
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          memory.setByteAt(0xC000, 0x4F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0xEB);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x9F: sbc a', () => {
        it('should subtract L (and carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x9F // sbc a, a
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0xFF);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should subtract L (and no carry) from A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3B
            0x3B,
            0x9F // sbc a, a
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0xA0 - 0xAF', () => {
      describe('0xA0: and b', () => {
        it('should bitwise and A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x06, // ld b, $3F
            0x3F,
            0xA0 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x06, // ld b, $00
            0x00,
            0xA0 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA1: and c', () => {
        it('should bitwise and A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x0E, // ld c, $3F
            0x3F,
            0xA1 // and c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x0E, // ld c, $00
            0x00,
            0xA1 // and c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA2: and d', () => {
        it('should bitwise and A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x16, // ld d, $3F
            0x3F,
            0xA2 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x16, // ld d, $00
            0x00,
            0xA2 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA3: and e', () => {
        it('should bitwise and A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x1E, // ld e, $3F
            0x3F,
            0xA3 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x1E, // ld e, $00
            0x00,
            0xA3 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA4: and h', () => {
        it('should bitwise and A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x26, // ld h, $3F
            0x3F,
            0xA4 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x26, // ld h, $00
            0x00,
            0xA4 // and b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA5: and l', () => {
        it('should bitwise and A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x2E, // ld l, $3F
            0x3F,
            0xA5 // and l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise and A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x2E, // ld l, $00
            0x00,
            0xA5 // and l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA6: and (hl)', () => {
        it('should bitwise and A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xA6 // and (hl)
          ]));

          memory.setByteAt(0xC000, 0x3F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x1A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should bitwise and A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xA6 // and (hl)
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xA7: and a', () => {
        it('should bitwise and A and A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0xA7 // and a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x5A);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should bitwise and A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xA7 // and a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xA8: xor b', () => {
        it('should bitwise xor A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x06, // ld b, $FF
            0xFF,
            0xA8 // xor b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x06, // ld b, $0F
            0x0F,
            0xA8 // xor b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xA9: xor c', () => {
        it('should bitwise xor A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x0E, // ld c, $FF
            0xFF,
            0xA9 // xor b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x0E, // ld c, $0F
            0x0F,
            0xA9 // xor b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xAA: xor d', () => {
        it('should bitwise xor A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x16, // ld d, $FF
            0xFF,
            0xAA // xor d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x16, // ld d, $0F
            0x0F,
            0xAA // xor d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xAB: xor e', () => {
        it('should bitwise xor A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x1E, // ld e, $FF
            0xFF,
            0xAB // xor e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x1E, // ld e, $0F
            0x0F,
            0xAB // xor e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xAC: xor h', () => {
        it('should bitwise xor A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x26, // ld h, $FF
            0xFF,
            0xAC // xor h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x26, // ld h, $0F
            0x0F,
            0xAC // xor h
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xAD: xor l', () => {
        it('should bitwise xor A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x2E, // ld l, $FF
            0xFF,
            0xAD // xor l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x2E, // ld l, $0F
            0x0F,
            0xAD // xor l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xAE: xor (hl)', () => {
        it('should bitwise xor A the value in memory pointed to by HL and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xAE // xor (hl)
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should bitwise xor A the value in memory pointed to by HL and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xAE // xor l
          ]));

          memory.setByteAt(0xC000, 0x0F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0xF0);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xAF: xor a', () => {
        it('should bitwise xor A and A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xAF // xor a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0xB0 - 0xBF', () => {
      describe('0xB0: or b', () => {
        it('should bitwise or A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x06, // ld b, $00
            0x00,
            0xB0 // or b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and B and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x06, // ld b, $0F
            0x0F,
            0xB0 // or b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB1: or c', () => {
        it('should bitwise or A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x0E, // ld c, $00
            0x00,
            0xB1 // or c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and C and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x0E, // ld c, $0F
            0x0F,
            0xB1 // or c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB2: or d', () => {
        it('should bitwise or A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x16, // ld d, $00
            0x00,
            0xB2 // or d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and D and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x16, // ld d, $0F
            0x0F,
            0xB2 // or d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB3: oe e', () => {
        it('should bitwise or A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x1E, // ld e, $00
            0x00,
            0xB3 // or e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and E and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x1E, // ld e, $0F
            0x0F,
            0xB3 // or e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB4: or h', () => {
        it('should bitwise or A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x26, // ld h, $00
            0x00,
            0xB4 // or e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and H and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x26, // ld h, $0F
            0x0F,
            0xB4 // or e
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB5: or l', () => {
        it('should bitwise or A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x2E, // ld l, $00
            0x00,
            0xB5 // or l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should bitwise xor A and L and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x2E, // ld l, $0F
            0x0F,
            0xB5 // or l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB6: or (hl)', () => {
        it('should bitwise or A and the value in memory pointed to by HL and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xB6 // or (hl)
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should bitwise xor A and the value in memory pointed to by HL and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xB6 // or (hl)
          ]));

          memory.setByteAt(0xC000, 0x0F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x5F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xB7: or a', () => {
        it('should bitwise or A and A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $5A
            0x5A,
            0xB7 // or a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x5A);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0xB8: cp b', () => {
        it('should compare A and B and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x06, // ld b, $2F
            0x2F,
            0xB8 // cp b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and B and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x06, // ld b, $3C
            0x3C,
            0xB8 // cp b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and B and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x06, // ld b, $40
            0x40,
            0xB8 // cp b
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xB9: cp c', () => {
        it('should compare A and C and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x0E, // ld c, $2F
            0x2F,
            0xB9 // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and C and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x0E, // ld c, $3C
            0x3C,
            0xB9 // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and C and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x0E, // ld c, $40
            0x40,
            0xB9 // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xBA: cp d', () => {
        it('should compare A and D and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x16, // ld d, $2F
            0x2F,
            0xBA // cp d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and D and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x16, // ld d, $3C
            0x3C,
            0xBA // cp d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and D and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x16, // ld d, $40
            0x40,
            0xBA // cp d
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xBB: cp e', () => {
        it('should compare A and E and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x1E, // ld e, $2F
            0x2F,
            0xBB // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and E and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x1E, // ld e, $3C
            0x3C,
            0xBB // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and E and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x1E, // ld e, $40
            0x40,
            0xBB // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xBC: cp h', () => {
        it('should compare A and H and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x26, // ld h, $2F
            0x2F,
            0xBC // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and H and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x26, // ld h, $3C
            0x3C,
            0xBC // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and H and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x26, // ld h, $40
            0x40,
            0xBC // cp c
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xBD: cp l', () => {
        it('should compare A and L and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x2E, // ld l, $2F
            0x2F,
            0xBD // cp l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and L and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x2E, // ld l, $3C
            0x3C,
            0xBD // cp l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should compare A and L and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x2E, // ld l, $40
            0x40,
            0xBD // cp l
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0xBE: cp (hl)', () => {
        it('should compare A and the value in memory pointed to by HL and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xBE // cp (hl)
          ]));

          memory.setByteAt(0xC000, 0x2F);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should compare A and the value in memory pointed to by HL and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xBE // cp (hl)
          ]));

          memory.setByteAt(0xC000, 0x3C);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should compare A and the value in memory pointed to by HL and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xBE // cp (hl)
          ]));

          memory.setByteAt(0xC000, 0x40);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xBF: cp a', () => {
        it('should compare A and A and set flags if the bits match', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $3C
            0x3C,
            0xBF // cp a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });
  });
});
