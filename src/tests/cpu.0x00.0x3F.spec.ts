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

  describe('0x00 - 0x3F', () => {
    describe('0x00 - 0x0F', () => {
      describe('0x00: nop', () => {
        it('should increment PC by 1', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x00 // nop
          ]));

          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x101);
          expect(cpu.getCycles()).toBe(4);
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

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().BC).toBe(0xC0DE);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x02: ld (bc), a', () => {
        it('should load contents of A into memory pointed to by BC', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ld a, $50
            0x50,
            0x01, // ld bc, $C0DE
            0xDE,
            0xC0,
            0x02 // ld (bc) a
          ]));

          cpu.tick();
          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x106);
          expect(cpu.getRegisters().A).toBe(0x50);
          expect(cpu.getRegisters().BC).toBe(0xC0DE);
          expect(memory.getByteAt(cpu.getRegisters().BC)).toBe(0x50);
          expect(cpu.getCycles()).toBe(28);
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

          expect(cpu.getRegisters().PC).toBe(0x104);
          expect(cpu.getRegisters().BC).toBe(0x0002);
          expect(cpu.getCycles()).toBe(20);
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

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment B and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $0F
            0x0F,
            0x04 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment B and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $FF
            0xFF,
            0x04 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x05: dec b', () => {
        it('should decrement B and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0xFF,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement B and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x01,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement B and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $10
            0x10,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement B and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, $00
            0x00,
            0x05 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().B).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x06: ld b, x', () => {
        it('should load $F3 into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x06, // ld b, x
            0xF3
          ]));

          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x102);
          expect(cpu.getRegisters().B).toBe(0xF3);
          expect(cpu.getCycles()).toBe(8);
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

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().A).toBe(0x0B);
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
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

          expect(cpu.getRegisters().PC).toBe(0x106);
          expect(cpu.getRegisters().SP).toBe(0xC0DE);
          expect(memory.getByteAt(0xC000)).toBe(cpu.getRegisters().SP);
          expect(cpu.getCycles()).toBe(32);
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

          expect(cpu.getRegisters().PC).toBe(0x107);
          expect(cpu.getRegisters().BC).toBe(0x0605);
          expect(cpu.getRegisters().HL).toBe(0x9028);
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF);
          expect(cpu.getCycles()).toBe(32);
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

          expect(cpu.getRegisters().PC).toBe(0x104);
          expect(cpu.getRegisters().BC).toBe(0xC000);
          expect(cpu.getRegisters().A).toBe(0x12);
          expect(cpu.getCycles()).toBe(20);
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

          expect(cpu.getRegisters().PC).toBe(0x104);
          expect(cpu.getRegisters().BC).toBe(0xBFFF);
          expect(cpu.getCycles()).toBe(20);
        }));
      });

      describe('0x0C: inc c', () => {
        it('should increment C and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0x0C // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment C and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $0F
            0x0F,
            0x0C // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment C and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $FF
            0xFF,
            0x0C // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x0D: dec c', () => {
        it('should decrement C and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0xFF,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement C and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x01,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement C and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $10
            0x10,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement C and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, $00
            0x00,
            0x0D // dec c
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().C).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x0E: ld c, x', () => {
        it('should load $F3 into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x0E, // ld c, x
            0xF3
          ]));

          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x102);
          expect(cpu.getRegisters().C).toBe(0xF3);
          expect(cpu.getCycles()).toBe(8);
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

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().A).toBe(0x9D);
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should rotate A right with a carry', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x3E, // ls a, $3B
            0xAA,
            0x0F // rrca
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().A).toBe(0x55);
          expect(cpu.getRegisters().F).toBe(0x00);
          expect(cpu.getCycles()).toBe(12);
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

          expect(cpu.getRegisters().PC).toBe(0x102);
          expect(cpu.getCycles()).toBe(4);
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

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().DE).toBe(0xC0DE);
          expect(cpu.getCycles()).toBe(12);
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

          expect(cpu.getRegisters().PC).toBe(0x106);
          expect(cpu.getRegisters().A).toBe(0x69);
          expect(cpu.getRegisters().DE).toBe(0xC000);
          expect(memory.getByteAt(cpu.getRegisters().DE)).toBe(cpu.getRegisters().A);
          expect(cpu.getCycles()).toBe(28);
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

          expect(cpu.getRegisters().PC).toBe(0x104);
          expect(cpu.getRegisters().DE).toBe(0x0002);
          expect(cpu.getCycles()).toBe(20);
        }));
      });

      describe('0x14: inc d', () => {
        it('should increment D and clear the ZERO, SUB and HALF flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0x14 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0x01);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment D and set the HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $0F
            0x0F,
            0x14 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0x10);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should increment D and set the ZERO and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $FF
            0xFF,
            0x14 // inc b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x15: dec d', () => {
        it('should decrement D and set the SUB flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0xFF,
            0x15 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0xFE);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement D and set the ZERO and SUB flags', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x01,
            0x15 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0x00);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.ZERO | CPU.FLAGS.SUB | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement D and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $10
            0x10,
            0x15 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0x0F);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));

        it('should decrement D and set the SUB and HALF flag', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, $00
            0x00,
            0x15 // dec b
          ]));

          cpu.tick();
          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x103);
          expect(cpu.getRegisters().D).toBe(0xFF);
          // the CARRY flag is set by default and inc doesn't mess with that flag.
          expect(cpu.getRegisters().F).toBe(CPU.FLAGS.SUB | CPU.FLAGS.HALF | CPU.FLAGS.CARRY);
          expect(cpu.getCycles()).toBe(12);
        }));
      });

      describe('0x16: ld d, x', () => {
        it('should load $F3 into B', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
          memory.loadROM(createRom([
            0x16, // ld d, x
            0xF3
          ]));

          cpu.tick();

          expect(cpu.getRegisters().PC).toBe(0x102);
          expect(cpu.getRegisters().D).toBe(0xF3);
          expect(cpu.getCycles()).toBe(8);
        }));
      });

      describe('0x17: xxxxx', () => {
      });

      describe('0x18: xxxxx', () => {
      });

      describe('0x19: xxxxx', () => {
      });

      describe('0x1A: xxxxx', () => {
      });

      describe('0x1B: xxxxx', () => {
      });

      describe('0x1C: xxxxx', () => {
      });

      describe('0x1D: xxxxx', () => {
      });

      describe('0x1E: xxxxx', () => {
      });

      describe('0x1F: xxxxx', () => {
      });
    });

    describe('0x20 - 0x2F', () => {
      describe('0x20: xxxxx', () => {
      });

      describe('0x21: xxxxx', () => {
      });

      describe('0x22: xxxxx', () => {
      });

      describe('0x23: xxxxx', () => {
      });

      describe('0x24: xxxxx', () => {
      });

      describe('0x25: xxxxx', () => {
      });

      describe('0x26: xxxxx', () => {
      });

      describe('0x27: xxxxx', () => {
      });

      describe('0x28: xxxxx', () => {
      });

      describe('0x29: xxxxx', () => {
      });

      describe('0x2A: xxxxx', () => {
      });

      describe('0x2B: xxxxx', () => {
      });

      describe('0x2C: xxxxx', () => {
      });

      describe('0x2D: xxxxx', () => {
      });

      describe('0x2E: xxxxx', () => {
      });

      describe('0x2F: xxxxx', () => {
      });
    });

    describe('0x30 - 0x3F', () => {
      describe('0x30: xxxxx', () => {
      });

      describe('0x31: xxxxx', () => {
      });

      describe('0x32: xxxxx', () => {
      });

      describe('0x33: xxxxx', () => {
      });

      describe('0x34: xxxxx', () => {
      });

      describe('0x35: xxxxx', () => {
      });

      describe('0x36: xxxxx', () => {
      });

      describe('0x37: xxxxx', () => {
      });

      describe('0x38: xxxxx', () => {
      });

      describe('0x39: xxxxx', () => {
      });

      describe('0x3A: xxxxx', () => {
      });

      describe('0x3B: xxxxx', () => {
      });

      describe('0x3C: xxxxx', () => {
      });

      describe('0x3D: xxxxx', () => {
      });

      describe('0x3E: xxxxx', () => {
      });

      describe('0x3F: xxxxx', () => {
      });
    });
  });
});
