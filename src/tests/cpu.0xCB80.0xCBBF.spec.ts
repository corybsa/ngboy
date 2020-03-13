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

  describe('0xCB80 - 0xCBBF', () => {
    describe('0xCB80 - 0xCB8F', () => {
      describe('0xCB80: xxxxx', () => {
      });
      describe('0xCB81: xxxxx', () => {
      });
      describe('0xCB82: xxxxx', () => {
      });
      describe('0xCB83: xxxxx', () => {
      });
      describe('0xCB84: xxxxx', () => {
      });
      describe('0xCB85: xxxxx', () => {
      });
      describe('0xCB86: xxxxx', () => {
      });
      describe('0xCB87: xxxxx', () => {
      });
      describe('0xCB88: xxxxx', () => {
      });
      describe('0xCB89: xxxxx', () => {
      });
      describe('0xCB8A: xxxxx', () => {
      });
      describe('0xCB8B: xxxxx', () => {
      });
      describe('0xCB8C: xxxxx', () => {
      });
      describe('0xCB8D: xxxxx', () => {
      });
      describe('0xCB8E: xxxxx', () => {
      });
      describe('0xCB8F: xxxxx', () => {
      });
    });

    describe('0xCB90 - 0xCB9F', () => {
      describe('0xCB90: xxxxx', () => {
      });
      describe('0xCB91: xxxxx', () => {
      });
      describe('0xCB92: xxxxx', () => {
      });
      describe('0xCB93: xxxxx', () => {
      });
      describe('0xCB94: xxxxx', () => {
      });
      describe('0xCB95: xxxxx', () => {
      });
      describe('0xCB96: xxxxx', () => {
      });
      describe('0xCB97: xxxxx', () => {
      });
      describe('0xCB98: xxxxx', () => {
      });
      describe('0xCB99: xxxxx', () => {
      });
      describe('0xCB9A: xxxxx', () => {
      });
      describe('0xCB9B: xxxxx', () => {
      });
      describe('0xCB9C: xxxxx', () => {
      });
      describe('0xCB9D: xxxxx', () => {
      });
      describe('0xCB9E: xxxxx', () => {
      });
      describe('0xCB9F: xxxxx', () => {
      });
    });

    describe('0xCBA0 - 0xCBAF', () => {
      describe('0xCBA0: xxxxx', () => {
      });
      describe('0xCBA1: xxxxx', () => {
      });
      describe('0xCBA2: xxxxx', () => {
      });
      describe('0xCBA3: xxxxx', () => {
      });
      describe('0xCBA4: xxxxx', () => {
      });
      describe('0xCBA5: xxxxx', () => {
      });
      describe('0xCBA6: xxxxx', () => {
      });
      describe('0xCBA7: xxxxx', () => {
      });
      describe('0xCBA8: xxxxx', () => {
      });
      describe('0xCBA9: xxxxx', () => {
      });
      describe('0xCBAA: xxxxx', () => {
      });
      describe('0xCBAB: xxxxx', () => {
      });
      describe('0xCBAC: xxxxx', () => {
      });
      describe('0xCBAD: xxxxx', () => {
      });
      describe('0xCBAE: xxxxx', () => {
      });
      describe('0xCBAF: xxxxx', () => {
      });
    });

    describe('0xCBB0 - 0xCBBF', () => {
      describe('0xCBB0: xxxxx', () => {
      });
      describe('0xCBB1: xxxxx', () => {
      });
      describe('0xCBB2: xxxxx', () => {
      });
      describe('0xCBB3: xxxxx', () => {
      });
      describe('0xCBB4: xxxxx', () => {
      });
      describe('0xCBB5: xxxxx', () => {
      });
      describe('0xCBB6: xxxxx', () => {
      });
      describe('0xCBB7: xxxxx', () => {
      });
      describe('0xCBB8: xxxxx', () => {
      });
      describe('0xCBB9: xxxxx', () => {
      });
      describe('0xCBBA: xxxxx', () => {
      });
      describe('0xCBBB: xxxxx', () => {
      });
      describe('0xCBBC: xxxxx', () => {
      });
      describe('0xCBBD: xxxxx', () => {
      });
      describe('0xCBBE: xxxxx', () => {
      });
      describe('0xCBBF: xxxxx', () => {
      });
    });
  });
});
