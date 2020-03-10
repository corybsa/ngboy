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

  describe('0xCBAF - 0xCBFF', () => {
    describe('0xCBC0 - 0xCBCF', () => {
      describe('0xCBC0: xxxxx', () => {
      });
      describe('0xCBC1: xxxxx', () => {
      });
      describe('0xCBC2: xxxxx', () => {
      });
      describe('0xCBC3: xxxxx', () => {
      });
      describe('0xCBC4: xxxxx', () => {
      });
      describe('0xCBC5: xxxxx', () => {
      });
      describe('0xCBC6: xxxxx', () => {
      });
      describe('0xCBC7: xxxxx', () => {
      });
      describe('0xCBC8: xxxxx', () => {
      });
      describe('0xCBC9: xxxxx', () => {
      });
      describe('0xCBCA: xxxxx', () => {
      });
      describe('0xCBCB: xxxxx', () => {
      });
      describe('0xCBCC: xxxxx', () => {
      });
      describe('0xCBCD: xxxxx', () => {
      });
      describe('0xCBCE: xxxxx', () => {
      });
      describe('0xCBCF: xxxxx', () => {
      });
    });

    describe('0xCBD0 - 0xCBDF', () => {
      describe('0xCBD0: xxxxx', () => {
      });
      describe('0xCBD1: xxxxx', () => {
      });
      describe('0xCBD2: xxxxx', () => {
      });
      describe('0xCBD3: xxxxx', () => {
      });
      describe('0xCBD4: xxxxx', () => {
      });
      describe('0xCBD5: xxxxx', () => {
      });
      describe('0xCBD6: xxxxx', () => {
      });
      describe('0xCBD7: xxxxx', () => {
      });
      describe('0xCBD8: xxxxx', () => {
      });
      describe('0xCBD9: xxxxx', () => {
      });
      describe('0xCBDA: xxxxx', () => {
      });
      describe('0xCBDB: xxxxx', () => {
      });
      describe('0xCBDC: xxxxx', () => {
      });
      describe('0xCBDD: xxxxx', () => {
      });
      describe('0xCBDE: xxxxx', () => {
      });
      describe('0xCBDF: xxxxx', () => {
      });
    });

    describe('0xCBE0 - 0xCBEF', () => {
      describe('0xCBE0: xxxxx', () => {
      });
      describe('0xCBE1: xxxxx', () => {
      });
      describe('0xCBE2: xxxxx', () => {
      });
      describe('0xCBE3: xxxxx', () => {
      });
      describe('0xCBE4: xxxxx', () => {
      });
      describe('0xCBE5: xxxxx', () => {
      });
      describe('0xCBE6: xxxxx', () => {
      });
      describe('0xCBE7: xxxxx', () => {
      });
      describe('0xCBE8: xxxxx', () => {
      });
      describe('0xCBE9: xxxxx', () => {
      });
      describe('0xCBEA: xxxxx', () => {
      });
      describe('0xCBEB: xxxxx', () => {
      });
      describe('0xCBEC: xxxxx', () => {
      });
      describe('0xCBED: xxxxx', () => {
      });
      describe('0xCBEE: xxxxx', () => {
      });
      describe('0xCBEF: xxxxx', () => {
      });
    });

    describe('0xCBF0 - 0xCBFF', () => {
      describe('0xCBF0: xxxxx', () => {
      });
      describe('0xCBF1: xxxxx', () => {
      });
      describe('0xCBF2: xxxxx', () => {
      });
      describe('0xCBF3: xxxxx', () => {
      });
      describe('0xCBF4: xxxxx', () => {
      });
      describe('0xCBF5: xxxxx', () => {
      });
      describe('0xCBF6: xxxxx', () => {
      });
      describe('0xCBF7: xxxxx', () => {
      });
      describe('0xCBF8: xxxxx', () => {
      });
      describe('0xCBF9: xxxxx', () => {
      });
      describe('0xCBFA: xxxxx', () => {
      });
      describe('0xCBFB: xxxxx', () => {
      });
      describe('0xCBFC: xxxxx', () => {
      });
      describe('0xCBFD: xxxxx', () => {
      });
      describe('0xCBFE: xxxxx', () => {
      });
      describe('0xCBFF: xxxxx', () => {
      });
    });
  });
});
