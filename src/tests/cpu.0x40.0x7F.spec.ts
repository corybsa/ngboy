import { inject, TestBed } from '@angular/core/testing';
import { CPU } from '../app/system/cpu';
import { Memory } from '../app/system/memory';
import { IORegisters } from '../app/util/io-registers';

function createRom(data) {
  const rom = [];

  for(let i = 0; i < data.length; i++) {
    rom[0x100 + i] = data[i];
  }

  return rom;
}

describe('CPU Op Codes 0x40 - 0x7F', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CPU,
        Memory
      ]
    });
  });

  describe('0x40 - 0x7F', () => {
    describe('0x40 - 0x4F', () => {
      describe('0x40: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x40 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x41: ld b, c', () => {
        it('should load the value of C into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $42
            0x42,
            0x41 // ld b, c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x42: ld b, d', () => {
        it('should load the value of D into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $42
            0x42,
            0x42 // ld b, d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x43: ld b, e', () => {
        it('should load the value of E into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $42
            0x42,
            0x43 // ld b, e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x44: ld b, h', () => {
        it('should load the value of H into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $42
            0x42,
            0x44 // ld b, h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x45: ld b, l', () => {
        it('should load the value of L into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $42
            0x42,
            0x45 // ld b, l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x46: ld b, (hl)', () => {
        it('should load the value at memory address pointed to by HL into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x46 // ld b, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x47: ld b, a', () => {
        it('should load the value of A into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x47 // ld b, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x48: ld c, b', () => {
        it('should load the value of B into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $42
            0x42,
            0x48 // ld c, b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x49: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x49 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x4A: ld c, d', () => {
        it('should load the value of D into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $42
            0x42,
            0x4A // ld c, d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x4B: ld c, e', () => {
        it('should load the value of E into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $42
            0x42,
            0x4B // ld c, e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x4C: ld c, h', () => {
        it('should load the value of H into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $42
            0x42,
            0x4C // ld c, h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x4D: ld c, l', () => {
        it('should load the value of L into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $42
            0x42,
            0x4D // ld c, l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x4E: ld c, (hl)', () => {
        it('should load the value at memory address pointed to by HL into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x4E // ld c, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x4F: ld c, a', () => {
        it('should load the value of A into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x4F // ld c, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x50 - 0x5F', () => {
      describe('0x50: ld d, b', () => {
        it('should load the value of B into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $42
            0x42,
            0x50 // ld d, b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x51: ld d, c', () => {
        it('should load the value of C into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $42
            0x42,
            0x51 // ld d, c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x52: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x52 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x53: ld d, e', () => {
        it('should load the value of E into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $42
            0x42,
            0x53 // ld d, e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x54: ld d, h', () => {
        it('should load the value of H into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $42
            0x42,
            0x54 // ld d, h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x55: ld d, l', () => {
        it('should load the value of L into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $42
            0x42,
            0x55 // ld d, l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x56: ld d, (hl)', () => {
        it('should load the value at memory address pointed to by HL into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x56 // ld d, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x57: ld d, a', () => {
        it('should load the value of A into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x57 // ld d, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x58: ld e, b', () => {
        it('should load the value of B into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $42
            0x42,
            0x58 // ld e, b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x59: ld e, c', () => {
        it('should load the value of C into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $42
            0x42,
            0x59 // ld e, c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x5A: ld e, e', () => {
        it('should load the value of D into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $42
            0x42,
            0x5A // ld e, d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x5B: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x5B // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x5C: ld e, h', () => {
        it('should load the value of H into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $42
            0x42,
            0x5C // ld e, h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x5D: ld e, l', () => {
        it('should load the value of L into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $42
            0x42,
            0x5D // ld e, l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x5E: ld e, (hl)', () => {
        it('should load the value at memory address pointed to by HL into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x5E // ld e, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x5F: ld e, a', () => {
        it('should load the value of A into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x5F // ld e, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x60 - 0x6F', () => {
      describe('0x60: ld h, b', () => {
        it('should load the value of B into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $42
            0x42,
            0x60 // ld h, b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x61: ld h, c', () => {
        it('should load the value of C into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $42
            0x42,
            0x61 // ld h, c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x62: ld h, d', () => {
        it('should load the value of D into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $42
            0x42,
            0x62 // ld h, d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x63: ld h, e', () => {
        it('should load the value of E into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $42
            0x42,
            0x63 // ld h, e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x64: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x64 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x65: ld h, l', () => {
        it('should load the value of L into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $42
            0x42,
            0x65 // ld h, l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x66: ld h, (hl)', () => {
        it('should load the value at memory address pointed to by HL into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x66 // ld h, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x67: ld h, a', () => {
        it('should load the value of A into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x67 // ld h, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x68: ld l, b', () => {
        it('should load the value of B into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $42
            0x42,
            0x68 // ld l, b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x69: ld l, c', () => {
        it('should load the value of C into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $42
            0x42,
            0x69 // ld l, c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x6A: ld l, d', () => {
        it('should load the value of D into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $42
            0x42,
            0x6A // ld l, d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x6B: ld l, e', () => {
        it('should load the value of E into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $42
            0x42,
            0x6B // ld l, e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x6C: ld l, h', () => {
        it('should load the value of H into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $42
            0x42,
            0x6C // ld l, h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x6D: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x6D // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x6E: ld l, (hl)', () => {
        it('should load the value at memory address pointed to by HL into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x6E // ld l, (hl)
          ]));

          memory.setByteAt(0xC000, 0x42);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x6F: ld l, a', () => {
        it('should load the value of A into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $42
            0x42,
            0x6F // ld l, a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x42);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x70 - 0x7F', () => {
      describe('0x70: xxxxx', () => {
      });

      describe('0x71: xxxxx', () => {
      });

      describe('0x72: xxxxx', () => {
      });

      describe('0x73: xxxxx', () => {
      });

      describe('0x74: xxxxx', () => {
      });

      describe('0x75: xxxxx', () => {
      });

      describe('0x76: halt', () => {
        it('should halt the CPU', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xFB, // ei
            0x00, // nop
            0x76 // halt
          ]));

          expect((<any>cpu).ime).toBe(false);
          expect((<any>cpu).isHalted).toBe(false);

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).ime).toBe(true);
          expect((<any>cpu).isHalted).toBe(true);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should activate halt bug and increment A twice', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0xAF, // xor a
            0x76, // halt
            0x3C // inc a
          ]));

          memory.setByteAt(IORegisters.INTERRUPT_ENABLE, 0x1D);
          memory.setByteAt(IORegisters.INTERRUPT_FLAGS, 0xCA);

          expect((<any>cpu).ime).toBe(false);

          cpu.tick(); // xor a
          expect((<any>cpu).registers.PC).toBe(0x101);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).haltBug).toBe(true);

          cpu.tick(); // inc a
          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.A).toBe(0x01);

          cpu.tick(); // inc a

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x02);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should activate halt bug and load an incorrect value into A and the memory address pointed to by DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x76, // halt
            0xFA, // ld a, ($1284)
            0x84,
            0x12
          ]));

          (<any>cpu).registers.DE = 0xC000;
          memory.setByteAt(0x84FA, 0x42);
          memory.setByteAt(IORegisters.INTERRUPT_ENABLE, 0x1D);
          memory.setByteAt(IORegisters.INTERRUPT_FLAGS, 0xCA);

          expect((<any>cpu).ime).toBe(false);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).haltBug).toBe(true);

          cpu.tick(); // ld a, ($84FA) ; this operation is borked by the halt bug
          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x42);

          cpu.tick(); // ld (de), a ; this operation was created due to the halt bug

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect(memory.getByteAt(0xC000)).toBe(0x42);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should activate halt bug and hang the CPU forever', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x76, // halt
            0x76 // halt
          ]));

          memory.setByteAt(IORegisters.INTERRUPT_ENABLE, 0x1D);
          memory.setByteAt(IORegisters.INTERRUPT_FLAGS, 0xCA);

          expect((<any>cpu).ime).toBe(false);

          // no matter how many ticks we do it's always going to be a halt instruction, so let's tick just 5 times
          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).haltBug).toBe(true);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);

          cpu.tick(); // halt
          expect((<any>cpu).registers.PC).toBe(0x101);

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).isHalted).toBe(false);
          expect((<any>cpu).cycles).toBe(20);
        }));

        // TODO: test interrupt calls
      });

      describe('0x77: xxxxx', () => {
      });

      describe('0x78: xxxxx', () => {
      });

      describe('0x79: xxxxx', () => {
      });

      describe('0x7A: xxxxx', () => {
      });

      describe('0x7B: xxxxx', () => {
      });

      describe('0x7C: xxxxx', () => {
      });

      describe('0x7D: xxxxx', () => {
      });

      describe('0x7E: xxxxx', () => {
      });

      describe('0x7F: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x7F // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });
    });
  });
});
