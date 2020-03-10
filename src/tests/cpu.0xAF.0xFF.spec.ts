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

  describe('0xAF - 0xFF', () => {
    describe('0xC0 - 0xCF', () => {
      describe('0xC0: xxxxx', () => {
      });
      describe('0xC1: xxxxx', () => {
      });
      describe('0xC2: xxxxx', () => {
      });
      describe('0xC3: xxxxx', () => {
      });
      describe('0xC4: xxxxx', () => {
      });
      describe('0xC5: xxxxx', () => {
      });
      describe('0xC6: xxxxx', () => {
      });
      describe('0xC7: xxxxx', () => {
      });
      describe('0xC8: xxxxx', () => {
      });
      describe('0xC9: xxxxx', () => {
      });
      describe('0xCA: xxxxx', () => {
      });
      describe('0xCB: xxxxx', () => {
      });
      describe('0xCC: xxxxx', () => {
      });
      describe('0xCD: xxxxx', () => {
      });
      describe('0xCE: xxxxx', () => {
      });
      describe('0xCF: xxxxx', () => {
      });
    });

    describe('0xD0 - 0xDF', () => {
      describe('0xD0: xxxxx', () => {
      });
      describe('0xD1: xxxxx', () => {
      });
      describe('0xD2: xxxxx', () => {
      });
      describe('0xD3: xxxxx', () => {
      });
      describe('0xD4: xxxxx', () => {
      });
      describe('0xD5: xxxxx', () => {
      });
      describe('0xD6: xxxxx', () => {
      });
      describe('0xD7: xxxxx', () => {
      });
      describe('0xD8: xxxxx', () => {
      });
      describe('0xD9: xxxxx', () => {
      });
      describe('0xDA: xxxxx', () => {
      });
      describe('0xDB: xxxxx', () => {
      });
      describe('0xDC: xxxxx', () => {
      });
      describe('0xDD: xxxxx', () => {
      });
      describe('0xDE: xxxxx', () => {
      });
      describe('0xDF: xxxxx', () => {
      });
    });

    describe('0xE0 - 0xEF', () => {
      describe('0xE0: xxxxx', () => {
      });
      describe('0xE1: xxxxx', () => {
      });
      describe('0xE2: xxxxx', () => {
      });
      describe('0xE3: xxxxx', () => {
      });
      describe('0xE4: xxxxx', () => {
      });
      describe('0xE5: xxxxx', () => {
      });
      describe('0xE6: xxxxx', () => {
      });
      describe('0xE7: xxxxx', () => {
      });
      describe('0xE8: xxxxx', () => {
      });
      describe('0xE9: xxxxx', () => {
      });
      describe('0xEA: xxxxx', () => {
      });
      describe('0xEB: xxxxx', () => {
      });
      describe('0xEC: xxxxx', () => {
      });
      describe('0xED: xxxxx', () => {
      });
      describe('0xEE: xxxxx', () => {
      });
      describe('0xEF: xxxxx', () => {
      });
    });

    describe('0xF0 - 0xFF', () => {
      describe('0xF0: xxxxx', () => {
      });
      describe('0xF1: xxxxx', () => {
      });
      describe('0xF2: xxxxx', () => {
      });
      describe('0xF3: xxxxx', () => {
      });
      describe('0xF4: xxxxx', () => {
      });
      describe('0xF5: xxxxx', () => {
      });
      describe('0xF6: xxxxx', () => {
      });
      describe('0xF7: xxxxx', () => {
      });
      describe('0xF8: xxxxx', () => {
      });
      describe('0xF9: xxxxx', () => {
      });
      describe('0xFA: xxxxx', () => {
      });
      describe('0xFB: xxxxx', () => {
      });
      describe('0xFC: xxxxx', () => {
      });
      describe('0xFD: xxxxx', () => {
      });
      describe('0xFE: xxxxx', () => {
      });
      describe('0xFF: xxxxx', () => {
      });
    });
  });
});
