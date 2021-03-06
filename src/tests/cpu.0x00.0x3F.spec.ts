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

  describe('0x00 - 0x3F', () => {
    describe('0x00 - 0x0F', () => {
      describe('0x00: nop', () => {
        it('should do nothing', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x00 // nop
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x01: ld bc, xx', () => {
        it('should load $C0DE into BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $C0DE
            0xDE,
            0xC0
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.BC).toBe(0xC0DE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x02: ld (bc), a', () => {
        it('should load contents of A into memory pointed to by BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $69
            0x69,
            0x01, // ld bc, $C000
            0x00,
            0xC0,
            0x02 // ld (bc) a
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x69);
          expect((<any>cpu).registers.BC).toBe(0xC000);
          expect(memory.getByteAt(0xC000)).toBe(0x69);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x03: inc bc', () => {
        it('should increment BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $0001
            0x01,
            0x00,
            0x03 // inc bc
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.BC).toBe(0x0002);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x04: inc b', () => {
        it('should increment B and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0x04 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment B and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $0F
            0x0F,
            0x04 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment B and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0x04 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x05: dec b', () => {
        it('should decrement B and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement B and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $01
            0x01,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement B and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $10
            0x10,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement B and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.B).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x06: ld b, x', () => {
        it('should load $F3 into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.B).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x07: rlca', () => {
        it('should rotate A left with a carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ls a, $85
            0x85,
            0x07 // rlca
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x0B);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x08: ld (xx), sp', () => {
        it('should load the value of SP into the location in memory pointed to by xx', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, $C0DE
            0xDE,
            0xC0,
            0x08, // ld ($C000), sp
            0x00,
            0xC0
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.SP).toBe(0xC0DE);
          expect(memory.getByteAt(0xC000)).toBe((<any>cpu).registers.SP);
          expect((<any>cpu).cycles).toBe(32);
        }));
      });

      describe('0x09: add hl bc', () => {
        it('should add BC and HL to store the result in HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $0605
            0x05,
            0x06,
            0x21, // ld hl, $8A23
            0x23,
            0x8A,
            0x09 // add hl, bc
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.BC).toBe(0x0605);
          expect((<any>cpu).registers.HL).toBe(0x9028);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should add BC to HL and store the result in HL, set CARRY', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, 0xFFFF
            0xFF,
            0xFF,
            0x21, // ld hl, 0x0001
            0x01,
            0x00,
            0x09 // add hl, bc
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.HL).toBe(0x0000);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(32);
        }));
      });

      describe('0x0A: ld a, (bc)', () => {
        it('should load the value in memory pointed to by BC into A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $C000
            0x00,
            0xC0,
            0x0A // ld a, (bc)
          ]));

          memory.setByteAt(0xC000, 0x12);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.BC).toBe(0xC000);
          expect((<any>cpu).registers.A).toBe(0x12);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x0B: dec bc', () => {
        it('should decrement BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x01, // ld bc, $C000
            0x00,
            0xC0,
            0x0B // dec bc
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.BC).toBe(0xBFFF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x0C: inc c', () => {
        it('should increment C and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0x0C // inc c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment C and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $0F
            0x0F,
            0x0C // inc c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment C and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0x0C // inc c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x0D: dec c', () => {
        it('should decrement C and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement C and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $01
            0x01,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement C and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $10
            0x10,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement C and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.C).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x0E: ld c, x', () => {
        it('should load $F3 into C', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.C).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x0F: rrca', () => {
        it('should rotate A right with a carry and set the CARRY flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ls a, $3B
            0x3B,
            0x0F // rrca
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x9D);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should rotate A right with a carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ls a, $3B
            0xAA,
            0x0F // rrca
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x55);
          expect((<any>cpu).registers.F).toBe(0x00);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x10 - 0x1F', () => {
      describe('0x10: stop', () => {
        it('should stop the CPU', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x10, // stop
            0x00
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x11: ld de, xx', () => {
        it('should load $C0DE into DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $C0DE
            0xDE,
            0xC0
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.DE).toBe(0xC0DE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x12: ld (de), a', () => {
        it('should load the value of A into memory address pointed to by DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $69
            0x69,
            0x11, // ld de, $C000
            0x00,
            0xC0,
            0x12 // ld (de), a
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x69);
          expect((<any>cpu).registers.DE).toBe(0xC000);
          expect(memory.getByteAt(0xC000)).toBe(0x69);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x13: inc de', () => {
        it('should increment DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $0001
            0x01,
            0x00,
            0x13 // inc de
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.DE).toBe(0x0002);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x14: inc d', () => {
        it('should increment D and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0x14 // inc d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment D and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $0F
            0x0F,
            0x14 // inc d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment D and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0x14 // inc d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x15: dec d', () => {
        it('should decrement D and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0x15 // dec d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement D and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $01
            0x01,
            0x15 // dec d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement D and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $10
            0x10,
            0x15 // dec d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement D and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0x15 // dec d
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.D).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x16: ld d, x', () => {
        it('should load $F3 into D', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.D).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x17: rla', () => {
        it('should perform rla', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $95
            0x95,
            0x17 // rla
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x2B);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x18: jr x', () => {
        it('should perform a relative jump forwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x18, // jr $05
            0x05
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform a relative jump backwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x18, // jr $FA; $FA is negative 5 in decimal
            0xFA
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x19: add hl de', () => {
        it('should add DE to HL and store the result in HL, set HALF, reset CARRY', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, 0x0605
            0x05,
            0x06,
            0x21, // ld hl, 0x8A23
            0x23,
            0x8A,
            0x19 // add hl, de
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.HL).toBe(0x9028);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should add DE to HL and store the result in HL, set CARRY', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, 0xFFFF
            0xFF,
            0xFF,
            0x21, // ld hl, 0x0001
            0x01,
            0x00,
            0x19 // add hl, de
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.HL).toBe(0x0000);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(32);
        }));
      });

      describe('0x1A: ld a, (de)', () => {
        it('should load the value in memory pointed to by DE into A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $C000
            0x00,
            0xC0,
            0x1A // ld a, (bc)
          ]));

          memory.setByteAt(0xC000, 0x12);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.DE).toBe(0xC000);
          expect((<any>cpu).registers.A).toBe(0x12);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x1B: dec de', () => {
        it('should decrement DE', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x11, // ld de, $C000
            0x00,
            0xC0,
            0x1B // dec de
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.DE).toBe(0xBFFF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x1C: inc e', () => {
        it('should increment E and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0x1C // inc e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment E and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $0F
            0x0F,
            0x1C // inc e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment E and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0x1C // inc e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x1D: dec e', () => {
        it('should decrement E and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $FF
            0xFF,
            0x1D // dec e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement E and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $01
            0x01,
            0x1D // dec e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement E and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $10
            0x10,
            0x1D // dec e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement E and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, $00
            0x00,
            0x1D // dec e
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.E).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x1E: ld e, x', () => {
        it('should load $F3 into E', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x1E, // ld e, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.E).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x1F: rra', () => {
        it('should perform rra', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, 0x81
            0x81,
            0x1F // rra
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x40);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform rra', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, 0x81
            0x81,
            0x1F // rra
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0xC0);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x20 - 0x2F', () => {
      describe('0x20: jr nz x', () => {
        it('should perform a relative jump forwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x20, // jr nz $05
            0x05
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform a relative jump backwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x20, // jr nz $FA; $FA is negative 5 in decimal
            0xFA
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should not perform a relative jump', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x20, // jr nz $05
            0x05
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x21: ld hl, xx', () => {
        it('should load $C0DE into HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C0DE
            0xDE,
            0xC0
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.HL).toBe(0xC0DE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x22: ld (hl+), a', () => {
        it('should load the value of A into memory address pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $69
            0x69,
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x22 // ld (hl), a
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x69);
          expect((<any>cpu).registers.HL).toBe(0xC001);
          expect(memory.getByteAt(0xC000)).toBe(0x69);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x23: inc hl', () => {
        it('should increment HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $0001
            0x01,
            0x00,
            0x23 // inc hl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0x0002);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x24: inc h', () => {
        it('should increment H and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0x24 // inc h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment H and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $0F
            0x0F,
            0x24 // inc h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment H and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0x24 // inc h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x25: dec h', () => {
        it('should decrement H and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $FF
            0xFF,
            0x25 // dec h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement H and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $01
            0x01,
            0x25 // dec h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement H and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $10
            0x10,
            0x25 // dec h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement H and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, $00
            0x00,
            0x25 // dec h
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.H).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x26: ld h, x', () => {
        it('should load $F3 into H', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x26, // ld h, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.H).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x27: daa', () => {
        it('should deform DAA operation', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, 0x45
            0x45,
            0xC6, // add a, 0x38
            0x38,
            0x27 // daa
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.A).toBe(0x83);
          expect((<any>cpu).cycles).toBe(20);
        }));

        it('should deform DAA operation', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $45
            0x45,
            0x06, // ld b, $38
            0x38,
            0x90, // sub b
            0x27 // daa
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          cpu.tick();
          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x07);
          expect((<any>cpu).cycles).toBe(24);
        }));
      });

      describe('0x28: jr z x', () => {
        it('should perform a relative jump forwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x28, // jr z $05
            0x05
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform a relative jump backwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x28, // jr z $FA; $FA is negative 5 in decimal
            0xFA
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should not perform a relative jump', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x28, // jr z $05
            0x05
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x29: add hl, hl', () => {
        it('should add HL with itself and store the result in HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $8A23
            0x23,
            0x8A,
            0x29 // add hl, hl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0x1446);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x2A: ld a, (hl+)', () => {
        it('should load the value in memory pointed to by HL into A and then increment HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000;
            0x00,
            0xC0,
            0x2A // ld a, (hl+)
          ]));

          memory.setByteAt(0xC000, 0x56);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0xC001);
          expect((<any>cpu).registers.A).toBe(0x56);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x2B: dec hl', () => {
        it('should decrement HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $2000
            0x00,
            0x20,
            0x2B // dec hl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0x1FFF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x2C: inc l', () => {
        it('should increment L and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0x2C // inc l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment L and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $0F
            0x0F,
            0x2C // inc l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment L and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0x2C // inc l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x2D: dec l', () => {
        it('should decrement L and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $FF
            0xFF,
            0x2D // dec l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement L and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $01
            0x01,
            0x2D // dec l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement L and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $10
            0x10,
            0x2D // dec l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement L and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, $00
            0x00,
            0x2D // dec l
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.L).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x2E: ld l, x', () => {
        it('should load $F3 into L', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x2E, // ld l, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.L).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x2F: cpl', () => {
        /*rom[0x100] = 0x3E; // ld a,0x35
        rom[0x101] = 0x35;
        rom[0x102] = 0x2F; // cpl

        memory.loadROM(rom);

        cpu.tick();
        cpu.tick();
        assertEquals(0xCA, cpu.getA(), "The A register should equal 0xCA.");
        assertEquals(CPU.FLAG_SUB | CPU.FLAG_HALF, cpu.getF(), "The SUB and HALF_CARRY flags should be set.");
        assertEquals(0x103, cpu.getPC(), "The PC should equal 0x103.");*/
        it('should compliment A and store the result in A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $35
            0x35,
            0x2F // cpl
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0xCA);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });
    });

    describe('0x30 - 0x3F', () => {
      describe('0x30: jr nc x', () => {
        it('should perform a relative jump forwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x30, // jr nc $05
            0x05
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform a relative jump backwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x30, // jr nc $FA; $FA is negative 5 in decimal
            0xFA
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should not perform a relative jump', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x30, // jr nc $05
            0x05
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x31: ld sp, xx', () => {
        it('should load $C0DE into SP', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, $C0DE
            0xDE,
            0xC0
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.SP).toBe(0xC0DE);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x32: ld (hl-), a', () => {
        it('should load the value of A into the memory address pointed to by HL and then decrement HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $50
            0x50,
            0x21, // ld hl, $C001
            0x01,
            0xC0,
            0x32 // ld (hl-), a
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).registers.A).toBe(0x50);
          expect(memory.getByteAt(0xC001)).toBe(0x50);
          expect((<any>cpu).registers.HL).toBe(0xC000);
          expect((<any>cpu).cycles).toBe(28);
        }));
      });

      describe('0x33: inc sp', () => {
        it('should increment SP', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, $0001
            0x01,
            0x00,
            0x33 // inc sp
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0x0002);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x34: inc (hl)', () => {
        it('should increment the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x34 // inc (hl)
          ]));

          memory.setByteAt(0xC000, 0x00);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0xC000);
          expect(memory.getByteAt(0xC000)).toBe(0x01);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x35: dec (hl)', () => {
        it('should decrement the value in memory pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x35 // dec (hl)
          ]));

          memory.setByteAt(0xC000, 0x01);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0xC000);
          expect(memory.getByteAt(0xC000)).toBe(0x00);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x36: ld (hl), x', () => {
        it('should load $50 into the memory address pointed to by HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x36, // ld (hl), $50
            0x50
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x105);
          expect((<any>cpu).registers.HL).toBe(0xC000);
          expect(memory.getByteAt(0xC000)).toBe(0x50);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x37: scf', () => {
        it('should set the CARRY flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x37 // scf
          ]));

          cpu.resetFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });

      describe('0x38: jr c x', () => {
        it('should perform a relative jump forwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x38, // jr c $05
            0x05
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x106);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should perform a relative jump backwards', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x38, // jr c $FA; $FA is negative 5 in decimal
            0xFA
          ]));

          cpu.setFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0xFB);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should not perform a relative jump', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x38, // jr c $05
            0x05
          ]));

          cpu.resetFlags(CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x39: add hl, sp', () => {
        it('should add SP to HL and store the result in HL, set HALF, reset CARRY', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, 0x0605
            0x05,
            0x06,
            0x21, // ld hl, 0x8A23
            0x23,
            0x8A,
            0x39 // add hl, sp
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.HL).toBe(0x9028);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(32);
        }));

        it('should add SP to HL and store the result in HL, set CARRY', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, 0xFFFF
            0xFF,
            0xFF,
            0x21, // ld hl, 0x0001
            0x01,
            0x00,
            0x39 // add hl, sp
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x107);
          expect((<any>cpu).registers.HL).toBe(0x0000);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(32);
        }));
      });

      describe('0x3A: ld a, (hl-)', () => {
        it('should load the value in memory pointed to by HL into A and then decrement HL', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x21, // ld hl, $C000
            0x00,
            0xC0,
            0x3A // ld a, (hl-)
          ]));

          memory.setByteAt(0xC000, 0x3C);
          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.HL).toBe(0xBFFF);
          expect((<any>cpu).registers.A).toBe(0x3C);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x3B: dec sp', () => {
        it('should decrement SP', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x31, // ld sp, $2000
            0x00,
            0x20,
            0x3B // dec sp
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x104);
          expect((<any>cpu).registers.SP).toBe(0x1FFF);
          expect((<any>cpu).cycles).toBe(20);
        }));
      });

      describe('0x3C: inc a', () => {
        it('should increment A and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x3C // inc a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment A and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $0F
            0x0F,
            0x3C // inc a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should increment A and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x3C // inc a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x3D: dec a', () => {
        it('should decrement A and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $FF
            0xFF,
            0x3D // dec a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement A and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $01
            0x01,
            0x3D // dec a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement A and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $10
            0x10,
            0x3D // dec a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));

        it('should decrement A and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $00
            0x00,
            0x3D // dec a
          ]));

          cpu.tick();
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x103);
          expect((<any>cpu).registers.A).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect((<any>cpu).cycles).toBe(12);
        }));
      });

      describe('0x3E: ld a, x', () => {
        it('should load $F3 into A', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, x
            0xF3
          ]));

          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x102);
          expect((<any>cpu).registers.A).toBe(0xF3);
          expect((<any>cpu).cycles).toBe(8);
        }));
      });

      describe('0x3F: ccf', () => {
        it('should clear the CARRY flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3F // ccf
          ]));

          cpu.setFlags(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          cpu.tick();

          expect((<any>cpu).registers.PC).toBe(0x101);
          expect((<any>cpu).registers.F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.HALF);
          expect((<any>cpu).cycles).toBe(4);
        }));
      });
    });
  });
});
