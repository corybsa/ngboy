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

describe('CPU Op Codes 0x80 - 0xBF', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CPU,
        Memory
      ]
    });
  });

  describe('0x80 - 0xBF', () => {
    describe('0x80 - 0x8F', () => {
      describe('0x80: xxxxx', () => {
      });
      describe('0x81: xxxxx', () => {
      });
      describe('0x82: xxxxx', () => {
      });
      describe('0x83: xxxxx', () => {
      });
      describe('0x84: xxxxx', () => {
      });
      describe('0x85: xxxxx', () => {
      });
      describe('0x86: xxxxx', () => {
      });
      describe('0x87: xxxxx', () => {
      });
      describe('0x88: xxxxx', () => {
      });
      describe('0x89: xxxxx', () => {
      });
      describe('0x8A: xxxxx', () => {
      });
      describe('0x8B: xxxxx', () => {
      });
      describe('0x8C: xxxxx', () => {
      });
      describe('0x8D: xxxxx', () => {
      });
      describe('0x8E: xxxxx', () => {
      });
      describe('0x8F: xxxxx', () => {
      });
    });

    describe('0x90 - 0x9F', () => {
      describe('0x90: xxxxx', () => {
      });
      describe('0x91: xxxxx', () => {
      });
      describe('0x92: xxxxx', () => {
      });
      describe('0x93: xxxxx', () => {
      });
      describe('0x94: xxxxx', () => {
      });
      describe('0x95: xxxxx', () => {
      });
      describe('0x96: xxxxx', () => {
      });
      describe('0x97: xxxxx', () => {
      });
      describe('0x98: xxxxx', () => {
      });
      describe('0x99: xxxxx', () => {
      });
      describe('0x9A: xxxxx', () => {
      });
      describe('0x9B: xxxxx', () => {
      });
      describe('0x9C: xxxxx', () => {
      });
      describe('0x9D: xxxxx', () => {
      });
      describe('0x9E: xxxxx', () => {
      });
      describe('0x9F: xxxxx', () => {
      });
    });

    describe('0xA0 - 0xAF', () => {
      describe('0xA0: xxxxx', () => {
      });
      describe('0xA1: xxxxx', () => {
      });
      describe('0xA2: xxxxx', () => {
      });
      describe('0xA3: xxxxx', () => {
      });
      describe('0xA4: xxxxx', () => {
      });
      describe('0xA5: xxxxx', () => {
      });
      describe('0xA6: xxxxx', () => {
      });
      describe('0xA7: xxxxx', () => {
      });
      describe('0xA8: xxxxx', () => {
      });
      describe('0xA9: xxxxx', () => {
      });
      describe('0xAA: xxxxx', () => {
      });
      describe('0xAB: xxxxx', () => {
      });
      describe('0xAC: xxxxx', () => {
      });
      describe('0xAD: xxxxx', () => {
      });
      describe('0xAE: xxxxx', () => {
      });
      describe('0xAF: xxxxx', () => {
      });
    });

    describe('0xB0 - 0xBF', () => {
      describe('0xB0: xxxxx', () => {
      });
      describe('0xB1: xxxxx', () => {
      });
      describe('0xB2: xxxxx', () => {
      });
      describe('0xB3: xxxxx', () => {
      });
      describe('0xB4: xxxxx', () => {
      });
      describe('0xB5: xxxxx', () => {
      });
      describe('0xB6: xxxxx', () => {
      });
      describe('0xB7: xxxxx', () => {
      });
      describe('0xB8: xxxxx', () => {
      });
      describe('0xB9: xxxxx', () => {
      });
      describe('0xBA: xxxxx', () => {
      });
      describe('0xBB: xxxxx', () => {
      });
      describe('0xBC: xxxxx', () => {
      });
      describe('0xBD: xxxxx', () => {
      });
      describe('0xBE: xxxxx', () => {
      });
      describe('0xBF: xxxxx', () => {
      });
    });
  });
});
