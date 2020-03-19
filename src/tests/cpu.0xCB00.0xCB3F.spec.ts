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

  describe('0xCB00 - 0xCB3F', () => {
    describe('0xCB00 - 0xCB0F', () => {
      describe('0xCB00: rlc b', () => {
        it('should rotate B left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $85
            0x85,
            0xCB, // rlc b
            0x00
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate B left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // rlc b
            0x00
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate B left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // rlc b
            0x00
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB01: rlc c', () => {
        it('should rotate C left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $85
            0x85,
            0xCB, // rlc c
            0x01
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate C left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // rlc c
            0x01
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate C left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // rlc c
            0x01
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB02: rlc d', () => {
        it('should rotate D left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $85
            0x85,
            0xCB, // rlc d
            0x02
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate D left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // rlc d
            0x02
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate D left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // rlc d
            0x02
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB03: rlc e', () => {
        it('should rotate E left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $85
            0x85,
            0xCB, // rlc e
            0x03
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate E left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // rlc e
            0x03
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate E left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // rlc e
            0x03
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB04: rlc h', () => {
        it('should rotate H left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $85
            0x85,
            0xCB, // rlc h
            0x04
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate H left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // rlc h
            0x04
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate H left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // rlc h
            0x04
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB05: rlc l', () => {
        it('should rotate L left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $85
            0x85,
            0xCB, // rlc c
            0x05
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate L left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // rlc c
            0x05
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate L left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // rlc c
            0x05
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB06: rlc (hl)', () => {
        it('should rotate the value in memory pointed to by HL left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rlc (hl)
            0x06
          ]));

          memory.setByteAt(0xC000, 0x85);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should rotate the value in memory pointed to by HL left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rlc (hl)
            0x06
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should rotate the value in memory pointed to by HL left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rlc (hl)
            0x06
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB07: rlc a', () => {
        it('should rotate A left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $85
            0x85,
            0xCB, // rlc a
            0x07
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate A left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // rlc a
            0x07
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate A left with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // rlc a
            0x07
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x02);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB08: rrc b', () => {
        it('should rotate B right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // rrc b
            0x08
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate B right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // rrc b
            0x08
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB09: rrc c', () => {
        it('should rotate C right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // rrc c
            0x09
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate C right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // rrc c
            0x09
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB0A: rrc d', () => {
        it('should rotate D right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // rrc d
            0x0A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate D right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // rrc d
            0x0A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB0B: rrc e', () => {
        it('should rotate E right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // rrc e
            0x0B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate E right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // rrc e
            0x0B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB0C: rrc h', () => {
        it('should rotate H right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // rrc b
            0x0C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate H right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // rrc b
            0x0C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB0D: rrc l', () => {
        it('should rotate L right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // rrc l
            0x0D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate L right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // rrc l
            0x0D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB0E: rrc (hl)', () => {
        it('should rotate the value in memory pointed to by HL right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rrc (hl)
            0x0E
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should rotate the value in memory pointed to by HL right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rrc (hl)
            0x0E
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB0F: rrc a', () => {
        it('should rotate A right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // rrc a
            0x0F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x80);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate A right with carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // rrc a
            0x0F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB10 - 0xCB1F', () => {
      describe('0xCB10: rl b', () => {
        it('should rotate B left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $80
            0x80,
            0xCB, // rl b
            0x10
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate B left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $11
            0x11,
            0xCB, // rl b
            0x10
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB11: rl c', () => {
        it('should rotate C left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $80
            0x80,
            0xCB, // rl c
            0x11
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate C left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $11
            0x11,
            0xCB, // rl c
            0x11
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB12: rl d', () => {
        it('should rotate D left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $80
            0x80,
            0xCB, // rl d
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate D left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $11
            0x11,
            0xCB, // rl d
            0x12
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB13: rl e', () => {
        it('should rotate E left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $80
            0x80,
            0xCB, // rl e
            0x13
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate E left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $11
            0x11,
            0xCB, // rl e
            0x13
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB14: rl h', () => {
        it('should rotate H left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $80
            0x80,
            0xCB, // rl h
            0x14
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate H left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $11
            0x11,
            0xCB, // rl h
            0x14
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB15: rl l', () => {
        it('should rotate L left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $80
            0x80,
            0xCB, // rl l
            0x15
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate L left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $11
            0x11,
            0xCB, // rl l
            0x15
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB16: rl (hl)', () => {
        it('should rotate the value in memory pointed to by HL left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rl (hl)
            0x16
          ]));

          memory.setByteAt(0xC000, 0x80);
          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should rotate the value in memory pointed to by HL left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // rl (hl)
            0x16
          ]));

          memory.setByteAt(0xC000, 0x11);
          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB17: rl a', () => {
        it('should rotate A left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $80
            0x80,
            0xCB, // rl a
            0x17
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate A left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $11
            0x11,
            0xCB, // rl a
            0x17
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x22);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB18: rr b', () => {
        it('should rotate B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // rr b
            0x18
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $8A
            0x8A,
            0xCB, // rr b
            0x18
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB19: rr c', () => {
        it('should rotate C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // rr c
            0x19
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $8A
            0x8A,
            0xCB, // rr c
            0x19
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB1A: rr d', () => {
        it('should rotate D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // rr d
            0x1A
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $8A
            0x8A,
            0xCB, // rr d
            0x1A
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB1B: rr e', () => {
        it('should rotate E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // rr e
            0x1B
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $8A
            0x8A,
            0xCB, // rr e
            0x1B
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB1C: rr h', () => {
        it('should rotate H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // rr h
            0x1C
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $8A
            0x8A,
            0xCB, // rr h
            0x1C
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB1D: rr l', () => {
        it('should rotate L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // rr l
            0x1D
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $8A
            0x8A,
            0xCB, // rr l
            0x1D
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB1E: rr (hl)', () => {
        it('should rotate the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld (hl), $C000
            0x00,
            0xC0,
            0xCB, // rr (hl)
            0x1E
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should rotate the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld (hl), $C000
            0x00,
            0xC0,
            0xCB, // rr (hl)
            0x1E
          ]));

          memory.setByteAt(0xC000, 0x8A);

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB1F: rr a', () => {
        it('should rotate A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // rr a
            0x1F
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should rotate A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $8A
            0x8A,
            0xCB, // rr a
            0x1F
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x45);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB20 - 0xCB2F', () => {
      describe('0xCB20: sla b', () => {
        it('should shift B left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $80
            0x80,
            0xCB, // sla b
            0x20
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift B left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // sla b
            0x20
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB21: sla c', () => {
        it('should shift C left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $80
            0x80,
            0xCB, // sla c
            0x21
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift C left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // sla c
            0x21
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB22: sla d', () => {
        it('should shift D left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $80
            0x80,
            0xCB, // sla d
            0x22
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift D left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // sla d
            0x22
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB23: sla e', () => {
        it('should shift E left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $80
            0x80,
            0xCB, // sla e
            0x23
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift E left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // sla e
            0x23
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB24: sla h', () => {
        it('should shift H left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $80
            0x80,
            0xCB, // sla h
            0x24
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift H left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // sla h
            0x24
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB25: sla l', () => {
        it('should shift L left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $80
            0x80,
            0xCB, // sla l
            0x25
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift L left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // sla l
            0x25
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB26: sla (hl)', () => {
        it('should shift the value in memory pointed to by HL left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // sla l
            0x26
          ]));

          memory.setByteAt(0xC000, 0x80);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should shift the value in memory pointed to by HL left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // sla l
            0x26
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB27: sla a', () => {
        it('should shift A left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $80
            0x80,
            0xCB, // sla a
            0x27
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift A left', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // sla a
            0x27
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xFE);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB28: sra b', () => {
        it('should shift B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $8A
            0x8A,
            0xCB, // sra b
            0x28
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // sra b
            0x28
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB29: sra c', () => {
        it('should shift C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $8A
            0x8A,
            0xCB, // sra c
            0x29
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // sra c
            0x29
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB2A: sra d', () => {
        it('should shift D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $8A
            0x8A,
            0xCB, // sra d
            0x2A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // sra d
            0x2A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB2B: sra e', () => {
        it('should shift E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $8A
            0x8A,
            0xCB, // sra e
            0x2B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // sra e
            0x2B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB2C: sra h', () => {
        it('should shift H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $8A
            0x8A,
            0xCB, // sra h
            0x2C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // sra h
            0x2C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB2D: sra l', () => {
        it('should shift L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $8A
            0x8A,
            0xCB, // sra l
            0x2D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // sra l
            0x2D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB2E: srl (hl)', () => {
        it('should shift the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // sra (hl)
            0x2E
          ]));

          memory.setByteAt(0xC000, 0x8A);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should shift the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // sra (hl)
            0x2E
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB2F: sra a', () => {
        it('should shift A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $8A
            0x8A,
            0xCB, // sra a
            0x2F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0xC5);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // sra a
            0x2F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });

    describe('0xCB30 - 0xCB3F', () => {
      describe('0xCB30: swap b', () => {
        it('should swap high nibble with low nibble in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0xCB, // swap b
            0x30
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $F0
            0xF0,
            0xCB, // swap b
            0x30
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB31: swap c', () => {
        it('should swap high nibble with low nibble in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0xCB, // swap c
            0x31
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $F0
            0xF0,
            0xCB, // swap c
            0x31
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB32: swap d', () => {
        it('should swap high nibble with low nibble in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0xCB, // swap d
            0x32
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $F0
            0xF0,
            0xCB, // swap d
            0x32
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB33: swap e', () => {
        it('should swap high nibble with low nibble in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0xCB, // swap e
            0x33
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $F0
            0xF0,
            0xCB, // swap e
            0x33
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB34: swap h', () => {
        it('should swap high nibble with low nibble in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0xCB, // swap h
            0x34
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $F0
            0xF0,
            0xCB, // swap h
            0x34
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB35: swap l', () => {
        it('should swap high nibble with low nibble in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0xCB, // swap l
            0x35
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $F0
            0xF0,
            0xCB, // swap l
            0x35
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB36: swal (hl)', () => {
        it('should swap high nibble with low nibble at the memory address pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // swap (hl)
            0x36
          ]));

          memory.setByteAt(0xC000, 0x00);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should swap high nibble with low nibble at the memory address pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // swap (hl)
            0x36
          ]));

          memory.setByteAt(0xC000, 0xF0);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB37: swap a', () => {
        it('should swap high nibble with low nibble in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0xCB, // swap a
            0x37
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should swap high nibble with low nibble in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $F0
            0xF0,
            0xCB, // swap a
            0x37
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x0F);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB38: srl b', () => {
        it('should shift B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0xCB, // srl b
            0x38
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift B right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0xCB, // srl b
            0x38
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.B).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB39: srl c', () => {
        it('should shift C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0xCB, // srl c
            0x39
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift C right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0xCB, // srl c
            0x39
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.C).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB3A: srl d', () => {
        it('should shift D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0xCB, // srl d
            0x3A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift D right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0xCB, // srl d
            0x3A
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.D).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB3B: srl e', () => {
        it('should shift E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0xCB, // srl e
            0x3B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift E right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0xCB, // srl e
            0x3B
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.E).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB3C: srl h', () => {
        it('should shift H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0xCB, // srl h
            0x3C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift H right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0xCB, // srl h
            0x3C
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.H).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB3D: srl l', () => {
        it('should shift L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0xCB, // srl l
            0x3D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift L right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0xCB, // srl l
            0x3D
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.L).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });

      describe('0xCB3E: srl (hl)', () => {
        it('should shift the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // srl (hl)
            0x3E
          ]));

          memory.setByteAt(0xC000, 0x01);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));

        it('should shift the value in memory pointed to by HL right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0xCB, // srl (hl)
            0x3E
          ]));

          memory.setByteAt(0xC000, 0xFF);

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect(memory.getByteAt(0xC000)).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0xCB3F: srl a', () => {
        it('should shift A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0xCB, // srl a
            0x3F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x00);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));

        it('should shift A right', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0xCB, // srl a
            0x3F
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.A).toBe(0x7F);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(16);
        }));
      });
    });
  });
});
