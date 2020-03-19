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

  describe('0xCB80 - 0xCBBF', () => {
    describe('0xCB80 - 0xCB8F', () => {
      describe('0xCB80: res 0, b', () => {
        it('should set bit 0 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 0, b
            0x80
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB81: res 0, c', () => {
        it('should set bit 0 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 0, c
            0x81
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB82: res 0, d', () => {
        it('should set bit 0 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 0, d
            0x82
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB83: res 0, e', () => {
        it('should set bit 0 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 0, e
            0x83
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB84: res 0, h', () => {
        it('should set bit 0 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 0, h
            0x84
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB85: res 0, l', () => {
        it('should set bit 0 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 0, l
            0x85
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB86: res 0, (hl)', () => {
        it('should set bit 0 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 0, l
            0x86
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB87: res 0, a', () => {
        it('should set bit 0 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 0, a
            0x87
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB88: res 1, b', () => {
        it('should set bit 1 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 1, b
            0x88
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB89: res 1, c', () => {
        it('should set bit 1 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 1, c
            0x89
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB8A: res 1, d', () => {
        it('should set bit 1 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 1, d
            0x8A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB8B: res 1, e', () => {
        it('should set bit 1 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 1, e
            0x8B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB8C: res 1, h', () => {
        it('should set bit 1 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 1, h
            0x8C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB8D: res 1, l', () => {
        it('should set bit 1 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 1, l
            0x8D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB8E: res 1, (hl)', () => {
        it('should set bit 1 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 1, (hl)
            0x8E
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB8F: res 1, a', () => {
        it('should set bit 1 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 1, a
            0x8F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xFD);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB90 - 0xCB9F', () => {
      describe('0xCB90: res 2, b', () => {
        it('should set bit 2 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 2, b
            0x90
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB91: res 2, c', () => {
        it('should set bit 2 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 2, c
            0x91
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB92: res 2, d', () => {
        it('should set bit 2 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 2, d
            0x92
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB93: res 2, e', () => {
        it('should set bit 2 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 2, e
            0x93
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB94: res 2, h', () => {
        it('should set bit 2 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 2, h
            0x94
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB95: res 2, l', () => {
        it('should set bit 2 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 2, l
            0x95
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB96: res 2, (hl)', () => {
        it('should set bit 2 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 2, (hl)
            0x96
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB97: res 2, a', () => {
        it('should set bit 2 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 2, a
            0x97
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB98: res 3, b', () => {
        it('should set bit 3 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 3, b
            0x98
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB99: res 3, c', () => {
        it('should set bit 3 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 3, c
            0x99
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB9A: res 3, d', () => {
        it('should set bit 3 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 3, d
            0x9A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB9B: res 3, e', () => {
        it('should set bit 3 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 3, e
            0x9B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB9C: res 3, h', () => {
        it('should set bit 3 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 3, h
            0x9C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB9D: res 3, l', () => {
        it('should set bit 3 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 3, l
            0x9D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB9E: res 3, (hl)', () => {
        it('should set bit 3 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 3, (hl)
            0x9E
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB9F: res 3, a', () => {
        it('should set bit 3 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 3, a
            0x9F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xF7);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCBA0 - 0xCBAF', () => {
      describe('0xCBA0: res 4, b', () => {
        it('should set bit 4 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 4, b
            0xA0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA1: res 4, c', () => {
        it('should set bit 4 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 4, c
            0xA1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA2: res 4, d', () => {
        it('should set bit 4 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 4, d
            0xA2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA3: res 4, e', () => {
        it('should set bit 4 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 4, e
            0xA3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA4: res 4, h', () => {
        it('should set bit 4 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 4, h
            0xA4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA5: res 4, l', () => {
        it('should set bit 4 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 4, l
            0xA5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA6: res 5, (hl)', () => {
        it('should set bit 4 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 4, (hl)
            0xA6
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBA7: res 4, a', () => {
        it('should set bit 4 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 4, a
            0xA7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xEF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA8: res 5, b', () => {
        it('should set bit 5 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 5, b
            0xA8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBA9: res 5, c', () => {
        it('should set bit 5 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 5, c
            0xA9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBAA: res 5, d', () => {
        it('should set bit 5 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 5, d
            0xAA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBAB: res 5, e', () => {
        it('should set bit 5 to 0 in e', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 5, e
            0xAB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBAC: res 5, h', () => {
        it('should set bit 5 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 5, h
            0xAC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBAD: res 5, l', () => {
        it('should set bit 5 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 5, l
            0xAD
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBAE: res 5, (hl)', () => {
        it('should set bit 5 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 5, l
            0xAE
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBAF: res 5, a', () => {
        it('should set bit 5 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 5, a
            0xAF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xDF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCBB0 - 0xCBBF', () => {
      describe('0xCBB0: res 6, b', () => {
        it('should set bit 6 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 6, b
            0xB0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB1: res 6, c', () => {
        it('should set bit 6 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 6, c
            0xB1
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB2: res 6, d', () => {
        it('should set bit 6 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // res 6, d
            0xB2
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB3: res 6, e', () => {
        it('should set bit 6 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 6, e
            0xB3
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB4: res 6, h', () => {
        it('should set bit 6 to 0 in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 6, h
            0xB4
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB5: res 6, l', () => {
        it('should set bit 6 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 6, l
            0xB5
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB6: res 6, (hl)', () => {
        it('should set bit 6 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 6, (hl)
            0xB6
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBB7: res 6, a', () => {
        it('should set bit 6 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 6, a
            0xB7
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xBF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB8: res 7, b', () => {
        it('should set bit 7 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // res 7, b
            0xB8
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBB9: res 7, c', () => {
        it('should set bit 7 to 0 in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // res 7, c
            0xB9
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBBA: res 7, d', () => {
        it('should set bit 7 to 0 in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld D, $FF
            0xFF,
            0xCB, // res 7, D
            0xBA
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBBB: res 7, e', () => {
        it('should set bit 7 to 0 in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // res 7, e
            0xBB
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBBC: res 7, h', () => {
        it('should set bit 7 to 0 in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // res 7, h
            0xBC
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBBD: res 7, l', () => {
        it('should set bit 7 to 0 in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // res 7, l
            0xBD
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCBBE: res 7, (hl)', () => {
        it('should set bit 7 to 0 in the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // res 7, (hl)
            0xBE
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCBBF: res 7, a', () => {
        it('should set bit 7 to 0 in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // res 7, a
            0xBF
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x7F);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });
  });
});
