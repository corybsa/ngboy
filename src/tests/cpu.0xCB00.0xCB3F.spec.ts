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

      describe('0xCB18: xxxxx', () => {
      });

      describe('0xCB19: xxxxx', () => {
      });

      describe('0xCB1A: xxxxx', () => {
      });

      describe('0xCB1B: xxxxx', () => {
      });

      describe('0xCB1C: xxxxx', () => {
      });

      describe('0xCB1D: xxxxx', () => {
      });

      describe('0xCB1E: xxxxx', () => {
      });

      describe('0xCB1F: xxxxx', () => {
      });
    });

    describe('0xCB20 - 0xCB2F', () => {
      describe('0xCB20: xxxxx', () => {
      });

      describe('0xCB21: xxxxx', () => {
      });

      describe('0xCB22: xxxxx', () => {
      });

      describe('0xCB23: xxxxx', () => {
      });

      describe('0xCB24: xxxxx', () => {
      });

      describe('0xCB25: xxxxx', () => {
      });

      describe('0xCB26: xxxxx', () => {
      });

      describe('0xCB27: xxxxx', () => {
      });

      describe('0xCB28: xxxxx', () => {
      });

      describe('0xCB29: xxxxx', () => {
      });

      describe('0xCB2A: xxxxx', () => {
      });

      describe('0xCB2B: xxxxx', () => {
      });

      describe('0xCB2C: xxxxx', () => {
      });

      describe('0xCB2D: xxxxx', () => {
      });

      describe('0xCB2E: xxxxx', () => {
      });

      describe('0xCB2F: xxxxx', () => {
      });
    });

    describe('0xCB30 - 0xCB3F', () => {
      describe('0xCB30: xxxxx', () => {
      });

      describe('0xCB31: xxxxx', () => {
      });

      describe('0xCB32: xxxxx', () => {
      });

      describe('0xCB33: xxxxx', () => {
      });

      describe('0xCB34: xxxxx', () => {
      });

      describe('0xCB35: xxxxx', () => {
      });

      describe('0xCB36: xxxxx', () => {
      });

      describe('0xCB37: xxxxx', () => {
      });

      describe('0xCB38: xxxxx', () => {
      });

      describe('0xCB39: xxxxx', () => {
      });

      describe('0xCB3A: xxxxx', () => {
      });

      describe('0xCB3B: xxxxx', () => {
      });

      describe('0xCB3C: xxxxx', () => {
      });

      describe('0xCB3D: xxxxx', () => {
      });

      describe('0xCB3E: xxxxx', () => {
      });

      describe('0xCB3F: xxxxx', () => {
      });
    });
  });
});
