import { inject, TestBed } from '@angular/core/testing';
import { CPU } from '../app/game-boy/system/cpu';
import { Memory } from '../app/game-boy/system/memory';
import { IORegisters } from '../app/game-boy/util/io-registers';

function createRom(data) {
  const rom = [];

  for(let i = 0; i < data.length; i++) {
    rom[0x100 + i] = data[i];
  }

  return rom;
}

describe('CPU', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CPU,
        Memory
      ]
    });
  });

  describe('Registers', () => {
    it('should have the correct default values', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
      expect((<any>cpu).registers.AF).toBe(0x01B0);
      expect((<any>cpu).registers.BC).toBe(0x0013);
      expect((<any>cpu).registers.DE).toBe(0x00D8);
      expect((<any>cpu).registers.HL).toBe(0x014D);
      expect((<any>cpu).registers.SP).toBe(0xFFFE);
      expect((<any>cpu).registers.PC).toBe(0x100);
    }));
  });

  describe('Memory', () => {
    it('should have the correct default values', inject([CPU, Memory], (cpu: CPU, memory: Memory) => {
      expect(memory.getByteAt(IORegisters.TIMER)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.TIMER_MODULO)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.TIMER_CONTROL)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.INTERRUPT_FLAGS)).toBe(0xE0);
      expect(memory.getByteAt(IORegisters.SOUND1_SWEEP)).toBe(0x80);
      expect(memory.getByteAt(IORegisters.SOUND1_LENGTH_WAVE)).toBe(0xBF);
      expect(memory.getByteAt(IORegisters.SOUND1_ENVELOPE)).toBe(0xF3);
      expect(memory.getByteAt(IORegisters.SOUND1_HIGH_FREQUENCY)).toBe(0xBF);
      expect(memory.getByteAt(IORegisters.SOUND2_LENGTH_WAVE)).toBe(0x3F);
      expect(memory.getByteAt(IORegisters.SOUND2_ENVELOPE)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.SOUND2_HIGH_FREQUENCY)).toBe(0xBF);
      expect(memory.getByteAt(IORegisters.SOUND3_ENABLE)).toBe(0x7F);
      expect(memory.getByteAt(IORegisters.SOUND3_LENGTH)).toBe(0xFF);
      expect(memory.getByteAt(IORegisters.SOUND3_OUTPUT_LEVEL)).toBe(0x9F);
      expect(memory.getByteAt(IORegisters.SOUND3_FREQUENCY_HIGH_DATA)).toBe(0xBF);
      expect(memory.getByteAt(IORegisters.SOUND4_LENGTH)).toBe(0xFF);
      expect(memory.getByteAt(IORegisters.SOUND4_ENVELOPE)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.SOUND4_COUNTER)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.SOUND4_INITIAL)).toBe(0xBF);
      expect(memory.getByteAt(IORegisters.SOUND_CHANNEL_CONTROL)).toBe(0x77);
      expect(memory.getByteAt(IORegisters.SOUND_OUTPUT_CONTROL)).toBe(0xF3);
      expect(memory.getByteAt(IORegisters.SOUND_ENABLE)).toBe(0xF1);
      expect(memory.getByteAt(IORegisters.LCDC)).toBe(0x91);
      expect(memory.getByteAt(IORegisters.LCD_STATUS)).toBe(0x80);
      expect(memory.getByteAt(IORegisters.SCROLL_Y)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.SCROLL_X)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.LY_COMPARE)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.BG_PALETTE_DATA)).toBe(0xFC);
      expect(memory.getByteAt(IORegisters.OBJECT_PALETTE0_DATA)).toBe(0xFF);
      expect(memory.getByteAt(IORegisters.OBJECT_PALETTE1_DATA)).toBe(0xFF);
      expect(memory.getByteAt(IORegisters.WINDOW_Y)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.WINDOW_X)).toBe(0x00);
      expect(memory.getByteAt(IORegisters.INTERRUPT_ENABLE)).toBe(0x00);
    }));
  });
});
