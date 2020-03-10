import { inject, TestBed } from '@angular/core/testing';
import { CPU } from './cpu';
import { Memory } from './memory';

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

  describe('0x00 - nop', () => {
    it('should increment PC by 1', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
      memory.loadROM(createRom([
        0x00 // nop
      ]));

      cpu.tick();

      expect(cpu.getRegisters().PC).toBe(0x101);
      expect(cpu.getCycles()).toBe(4);
    }));
  });

  describe('0x01 - ld bc, xx', () => {
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

  describe('0x02 - ld (bc), a', () => {
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

  describe('0x03 - inc bc', () => {
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

  describe('0x04 - inc b', () => {
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

  describe('0x05 - dec b', () => {
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

  describe('0x06 - ld b, x', () => {
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

  describe('0x07 - rlca', () => {
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

  describe('0x08 - ld (xx) sp', () => {
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

  describe('0x09 - add hl bc', () => {
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
});
