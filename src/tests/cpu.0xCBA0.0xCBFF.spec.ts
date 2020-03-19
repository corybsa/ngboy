import { inject, TestBed } from '@angular/core/testing';
import { CPU } from '../app/game-boy/system/cpu';
import { Memory } from '../app/game-boy/system/memory';

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

  describe('0xCBAF - 0xCBFF', () => {
    describe('0xCBC0 - 0xCBCF', () => {
      describe('0xCBC0: set 0, b', () => {
        it('should set bit 0 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 0, b
            0xC0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC1: set 0, c', () => {
        it('should set bit 0 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 0, c
            0xC1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC2: set 0, d', () => {
        it('should set bit 0 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 0, d
            0xC2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC3: set 0, e', () => {
        it('should set bit 0 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 0, e
            0xC3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC4: set 0, h', () => {
        it('should set bit 0 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 0, h
            0xC4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC5: set 0, l', () => {
        it('should set bit 0 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 0, l
            0xC5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC6: set 0, (hl)', () => {
        it('should set bit 0 to 1 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 0, (hl)
            0xC6
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBC7: set 0, a', () => {
        it('should set bit 0 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 0, a
            0xC7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x01);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC8: set 1, b', () => {
        it('should set bit 1 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 1, b
            0xC8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBC9: set 1, c', () => {
        it('should set bit 1 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 1, c
            0xC9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBCA: set 1, d', () => {
        it('should set bit 1 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 1, d
            0xCA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBCB: set 1, e', () => {
        it('should set bit 1 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 1, e
            0xCB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBCC: set 1, h', () => {
        it('should set bit 1 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 1, h
            0xCC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBCD: set 1, l', () => {
        it('should set bit 1 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 1, l
            0xCD
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBCE: set 1, (hl)', () => {
        it('should set bit 1 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 1, (hl)
            0xCE
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x02);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBCF: set 1, a', () => {
        it('should set bit 1 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 1, a
            0xCF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x02);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCBD0 - 0xCBDF', () => {
      describe('0xCBD0: set 2, b', () => {
        it('should set bit 2 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 2, b
            0xD0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD1: set 2, c', () => {
        it('should set bit 2 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 2, c
            0xD1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD2: set 2, d', () => {
        it('should set bit 2 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 2, d
            0xD2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD3: set 2, e', () => {
        it('should set bit 2 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 2, e
            0xD3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD4: set 2, h', () => {
        it('should set bit 2 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 2, h
            0xD4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD5: set 2, l', () => {
        it('should set bit 2 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 2, l
            0xD5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD6: set 2, (hl)', () => {
        it('should set bit 2 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 2, (hl)
            0xD6
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x04);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBD7: set 2, a', () => {
        it('should set bit 2 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 2, a
            0xD7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x04);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD8: set 3, b', () => {
        it('should set bit 3 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 3, b
            0xD8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBD9: set 3, c', () => {
        it('should set bit 3 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 3, c
            0xD9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBDA: set 3, d', () => {
        it('should set bit 3 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 3, d
            0xDA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBDB: set 3, e', () => {
        it('should set bit 3 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 3, e
            0xDB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBDC: set 3, h', () => {
        it('should set bit 3 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 3, h
            0xDC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBDD: set 3, l', () => {
        it('should set bit 3 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 3, l
            0xDD
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBDE: set 3, (hl)', () => {
        it('should set bit 3 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 3, (hl)
            0xDE
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x08);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBDF: set 3, a', () => {
        it('should set bit 3 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 3, a
            0xDF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x08);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCBE0 - 0xCBEF', () => {
      describe('0xCBE0: set 4, b', () => {
        it('should set bit 4 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 4, b
            0xE0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE1: set 4, c', () => {
        it('should set bit 4 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 4, c
            0xE1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE2: set 4, d', () => {
        it('should set bit 4 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 4, d
            0xE2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE3: set 4, e', () => {
        it('should set bit 4 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 4, e
            0xE3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE4: set 4, h', () => {
        it('should set bit 4 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 4, h
            0xE4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE5: set 4, l', () => {
        it('should set bit 4 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 4, l
            0xE5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE6: set 4, (hl)', () => {
        it('should set bit 4 to 1 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 4, (hl)
            0xE6
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x10);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBE7: set 4, a', () => {
        it('should set bit 4 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 4, a
            0xE7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x10);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE8: set 5, b', () => {
        it('should set bit 5 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 5, b
            0xE8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBE9: set 5, c', () => {
        it('should set bit 5 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 5, c
            0xE9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBEA: set 5, d', () => {
        it('should set bit 5 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 5, d
            0xEA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBEB: set 5, e', () => {
        it('should set bit 5 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 5, e
            0xEB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBEC: set 5, h', () => {
        it('should set bit 5 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 5, h
            0xEC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBED: set 5, l', () => {
        it('should set bit 5 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 5, l
            0xED
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBEE: set 5, (hl)', () => {
        it('should set bit 5 to 1 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 5, (hl)
            0xEE
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x20);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBEF: set 5, a', () => {
        it('should set bit 5 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 5, a
            0xEF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x20);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCBF0 - 0xCBFF', () => {
      describe('0xCBF0: set 6, b', () => {
        it('should set bit 6 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 6, b
            0xF0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF1: set 6, c', () => {
        it('should set bit 6 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 6, c
            0xF1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF2: set 6, d', () => {
        it('should set bit 6 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 6, d
            0xF2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF3: set 6, e', () => {
        it('should set bit 6 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 6, e
            0xF3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF4: set 6, h', () => {
        it('should set bit 6 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 6, h
            0xF4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF5: set 6, l', () => {
        it('should set bit 6 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 6, l
            0xF5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF6: set 6, (hl)', () => {
        it('should set bit 6 to 1 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 6, (hl)
            0xF6
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x40);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBF7: set 6, a', () => {
        it('should set bit 6 to 1 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 6, a
            0xF7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x40);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF8: set 7, b', () => {
        it('should set bit 7 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // set 7, b
            0xF8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBF9: set 7, c', () => {
        it('should set bit 7 to 1 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // set 7, c
            0xF9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBFA: set 7, d', () => {
        it('should set bit 7 to 1 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // set 7, d
            0xFA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBFB: set 7, e', () => {
        it('should set bit 7 to 1 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // set 7, e
            0xFB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBFC: set 7, h', () => {
        it('should set bit 7 to 1 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // set 7, h
            0xFC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBFD: set 7, l', () => {
        it('should set bit 7 to 1 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // set 7, l
            0xFD
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBFE: set 7, (hl)', () => {
        it('should set bit 7 to 1 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // set 7, (hl)
            0xFE
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x80);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBFF: set 7, a', () => {
        it('should set bit 7 to 1 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // set 7, a
            0xFF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x80);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });
  });
});
