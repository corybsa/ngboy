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

  describe('0xCB40 - 0xCB7F', () => {
    describe('0xCB40 - 0xCB4F', () => {
      describe('0xCB40: bit 0, b', () => {
        it('should copy the compliment of bit 0 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // bit 0, b
            0x40
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $04
            0x04,
            0xCB, // bit 0, b
            0x40
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB41: bit 0, c', () => {
        it('should copy the compliment of bit 0 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // bit 0, c
            0x41
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $04
            0x04,
            0xCB, // bit 0, c
            0x41
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB42: bit 0, d', () => {
        it('should copy the compliment of bit 0 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // bit 0, d
            0x42
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $04
            0x04,
            0xCB, // bit 0, d
            0x42
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB43: bit 0, e', () => {
        it('should copy the compliment of bit 0 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // bit 0, e
            0x43
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $04
            0x04,
            0xCB, // bit 0, e
            0x43
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB44: bit 0, h', () => {
        it('should copy the compliment of bit 0 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // bit 0, h
            0x44
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $04
            0x04,
            0xCB, // bit 0, h
            0x44
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB45: bit 0, l', () => {
        it('should copy the compliment of bit 0 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // bit 0, l
            0x45
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $04
            0x04,
            0xCB, // bit 0, l
            0x45
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB46: bit 0, (hl)', () => {
        it('should copy the compliment of bit 0 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 0, (hl)
            0x46
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 0 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 0, (hl)
            0x46
          ]));

          memory.setByteAt(0xC000, 0x04);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB47: bit 0, a', () => {
        it('should copy the compliment of bit 0 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // bit 0, a
            0x47
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 0 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $04
            0x04,
            0xCB, // bit 0, a
            0x47
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB48: bit 1, b', () => {
        it('should copy the compliment of bit 1 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $02
            0x02,
            0xCB, // bit 1, b
            0x48
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 1, b
            0x48
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB49: bit 1, c', () => {
        it('should copy the compliment of bit 1 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $02
            0x02,
            0xCB, // bit 1, c
            0x49
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 1, c
            0x49
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB4A: bit 1, d', () => {
        it('should copy the compliment of bit 1 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $02
            0x02,
            0xCB, // bit 1, d
            0x4A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 1, d
            0x4A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB4B: bit 1, e', () => {
        it('should copy the compliment of bit 1 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $02
            0x02,
            0xCB, // bit 1, e
            0x4B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 1, e
            0x4B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB4C: bit 1, h', () => {
        it('should copy the compliment of bit 1 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $02
            0x02,
            0xCB, // bit 1, h
            0x4C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 1, h
            0x4C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB4D: bit 1, h', () => {
        it('should copy the compliment of bit 1 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $02
            0x02,
            0xCB, // bit 1, l
            0x4D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 1, l
            0x4D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB4E: bit 1, (hl)', () => {
        it('should copy the compliment of bit 1 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $02
            0x00,
            0xC0,
            0xCB, // bit 1, (hl)
            0x4E
          ]));

          memory.setByteAt(0xC000, 0x02);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 1 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $00
            0x00,
            0xC0,
            0xCB, // bit 1, (hl)
            0x4E
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB4F: bit 1, a', () => {
        it('should copy the compliment of bit 1 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $02
            0x02,
            0xCB, // bit 1, a
            0x4F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 1 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 1, a
            0x4F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB50 - 0xCB5F', () => {
      describe('0xCB50: bit 2, b', () => {
        it('should copy the compliment of bit 2 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $04
            0x04,
            0xCB, // bit 2, b
            0x50
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 2, b
            0x50
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB51: bit 2, c', () => {
        it('should copy the compliment of bit 2 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $04
            0x04,
            0xCB, // bit 2, c
            0x51
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 2, c
            0x51
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB52: bit 2, d', () => {
        it('should copy the compliment of bit 2 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $04
            0x04,
            0xCB, // bit 2, d
            0x52
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 2, d
            0x52
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB53: bit 2, e', () => {
        it('should copy the compliment of bit 2 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $04
            0x04,
            0xCB, // bit 2, e
            0x53
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 2, e
            0x53
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB54: bit 2, h', () => {
        it('should copy the compliment of bit 2 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $04
            0x04,
            0xCB, // bit 2, h
            0x54
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 2, h
            0x54
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB55: bit 2, l', () => {
        it('should copy the compliment of bit 2 of l to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $04
            0x04,
            0xCB, // bit 2, l
            0x55
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of l to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 2, l
            0x55
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB56: bit 2, (hl)', () => {
        it('should copy the compliment of bit 2 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 2, l
            0x56
          ]));

          memory.setByteAt(0xC000, 0x04);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 2 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 2, l
            0x56
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB57: bit 2, a', () => {
        it('should copy the compliment of bit 2 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $04
            0x04,
            0xCB, // bit 2, a
            0x57
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 2 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 2, a
            0x57
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB58: bit 3, b', () => {
        it('should copy the compliment of bit 3 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $08
            0x08,
            0xCB, // bit 3, b
            0x58
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 3, b
            0x58
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB59: bit 3, c', () => {
        it('should copy the compliment of bit 3 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $08
            0x08,
            0xCB, // bit 3, c
            0x59
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 3, c
            0x59
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB5A: bit 3, d', () => {
        it('should copy the compliment of bit 3 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $08
            0x08,
            0xCB, // bit 3, d
            0x5A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 3, d
            0x5A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB5B: bit 3, e', () => {
        it('should copy the compliment of bit 3 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $08
            0x08,
            0xCB, // bit 3, e
            0x5B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 3, e
            0x5B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB5C: bit 3, h', () => {
        it('should copy the compliment of bit 3 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $08
            0x08,
            0xCB, // bit 3, h
            0x5C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 3, h
            0x5C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB5D: bit 3, l', () => {
        it('should copy the compliment of bit 3 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $08
            0x08,
            0xCB, // bit 3, l
            0x5D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 3, l
            0x5D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB5E: bit 3, (hl)', () => {
        it('should copy the compliment of bit 3 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 3, l
            0x5E
          ]));

          memory.setByteAt(0xC000, 0x08);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 3 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 3, l
            0x5E
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB5F: bit 3, a', () => {
        it('should copy the compliment of bit 3 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $08
            0x08,
            0xCB, // bit 3, a
            0x5F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 3 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 3, a
            0x5F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB60 - 0xCB6F', () => {
      describe('0xCB60: bit 4, b', () => {
        it('should copy the compliment of bit 4 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $10
            0x10,
            0xCB, // bit 4, b
            0x60
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 4, b
            0x60
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB61: bit 4, c', () => {
        it('should copy the compliment of bit 4 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $10
            0x10,
            0xCB, // bit 4, c
            0x61
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 4, c
            0x61
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB62: bit 4, d', () => {
        it('should copy the compliment of bit 4 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $10
            0x10,
            0xCB, // bit 4, d
            0x62
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 4, d
            0x62
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB63: bit 4, e', () => {
        it('should copy the compliment of bit 4 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $10
            0x10,
            0xCB, // bit 4, e
            0x63
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 4, e
            0x63
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB64: bit 4, h', () => {
        it('should copy the compliment of bit 4 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $10
            0x10,
            0xCB, // bit 4, h
            0x64
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 4, h
            0x64
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB65: bit 4, l', () => {
        it('should copy the compliment of bit 4 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $10
            0x10,
            0xCB, // bit 4, l
            0x65
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 4, l
            0x65
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB66: bit 4, (hl)', () => {
        it('should copy the compliment of bit 4 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 4, l
            0x66
          ]));

          memory.setByteAt(0xC000, 0x10);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 4 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 4, l
            0x66
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB67: bit 4, a', () => {
        it('should copy the compliment of bit 4 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $10
            0x10,
            0xCB, // bit 4, l
            0x67
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 4 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 4, l
            0x67
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB68: bit 5, b', () => {
        it('should copy the compliment of bit 5 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $20
            0x20,
            0xCB, // bit 5, b
            0x68
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 5, b
            0x68
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB69: bit 5, c', () => {
        it('should copy the compliment of bit 5 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $20
            0x20,
            0xCB, // bit 5, c
            0x69
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 5, c
            0x69
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB6A: bit 5, d', () => {
        it('should copy the compliment of bit 5 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $20
            0x20,
            0xCB, // bit 5, d
            0x6A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 5, d
            0x6A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB6B: bit 5, e', () => {
        it('should copy the compliment of bit 5 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $20
            0x20,
            0xCB, // bit 5, e
            0x6B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 5, e
            0x6B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB6C: bit 5, h', () => {
        it('should copy the compliment of bit 5 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $20
            0x20,
            0xCB, // bit 5, h
            0x6C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 5, h
            0x6C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB6D: bit 5, l', () => {
        it('should copy the compliment of bit 5 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $20
            0x20,
            0xCB, // bit 5, l
            0x6D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 5, l
            0x6D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB6E: bit 5, (hl)', () => {
        it('should copy the compliment of bit 5 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 5, (hl)
            0x6E
          ]));

          memory.setByteAt(0xC000, 0x20);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 5 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 5, (hl)
            0x6E
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB6F: bit 5, a', () => {
        it('should copy the compliment of bit 5 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $20
            0x20,
            0xCB, // bit 5, a
            0x6F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 5 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 5, a
            0x6F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB70 - 0xCB7F', () => {
      describe('0xCB70: bit 6, b', () => {
        it('should copy the compliment of bit 6 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $40
            0x40,
            0xCB, // bit 6, b
            0x70
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 6, b
            0x70
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB71: bit 6, c', () => {
        it('should copy the compliment of bit 6 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $40
            0x40,
            0xCB, // bit 6, c
            0x71
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 6, c
            0x71
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB72: bit 6, d', () => {
        it('should copy the compliment of bit 6 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $40
            0x40,
            0xCB, // bit 6, d
            0x72
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 6, d
            0x72
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB73: bit 6, e', () => {
        it('should copy the compliment of bit 6 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $40
            0x40,
            0xCB, // bit 6, e
            0x73
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 6, e
            0x73
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB74: bit 6, h', () => {
        it('should copy the compliment of bit 6 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $40
            0x40,
            0xCB, // bit 6, h
            0x74
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 6, h
            0x74
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB75: bit 6, l', () => {
        it('should copy the compliment of bit 6 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $40
            0x40,
            0xCB, // bit 6, l
            0x75
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 6, l
            0x75
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB76: bit 6, (hl)', () => {
        it('should copy the compliment of bit 6 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 6, l
            0x76
          ]));

          memory.setByteAt(0xC000, 0x40);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 6 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 6, l
            0x76
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB77: bit 6, a', () => {
        it('should copy the compliment of bit 6 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $40
            0x40,
            0xCB, // bit 6, a
            0x77
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 6 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 6, a
            0x77
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB78: bit 7, b', () => {
        it('should copy the compliment of bit 7 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $80
            0x80,
            0xCB, // bit 7, b
            0x78
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of B to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // bit 7, b
            0x78
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB79: bit 7, c', () => {
        it('should copy the compliment of bit 7 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $80
            0x80,
            0xCB, // bit 7, c
            0x79
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of C to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // bit 7, c
            0x79
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB7A: bit 7, d', () => {
        it('should copy the compliment of bit 7 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $80
            0x80,
            0xCB, // bit 7, d
            0x7A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of D to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // bit 7, d
            0x7A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB7B: bit 7, e', () => {
        it('should copy the compliment of bit 7 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $80
            0x80,
            0xCB, // bit 7, e
            0x7B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of E to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // bit 7, e
            0x7B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB7C: bit 7, h', () => {
        it('should copy the compliment of bit 7 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $80
            0x80,
            0xCB, // bit 7, h
            0x7C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of H to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // bit 7, h
            0x7C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB7D: bit 7, l', () => {
        it('should copy the compliment of bit 7 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $80
            0x80,
            0xCB, // bit 7, l
            0x7D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of L to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // bit 7, l
            0x7D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB7E: bit 7, (hl)', () => {
        it('should copy the compliment of bit 7 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 7, (hl)
            0x7E
          ]));

          memory.setByteAt(0xC000, 0x80);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should copy the compliment of bit 7 of the value in memory pointed to by HL to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // bit 7, (hl)
            0x7E
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB7F: bit 7, a', () => {
        it('should copy the compliment of bit 7 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $80
            0x80,
            0xCB, // bit 7, a
            0x7F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should copy the compliment of bit 7 of A to the ZERO flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // bit 7, a
            0x7F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });
  });
});
