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

  describe('0xCB00 - 0xCB3F', () => {
    describe('0xCB00 - 0xCB0F', () => {
      describe('0xCB00: xxxxx', () => {
      });
      describe('0xCB01: xxxxx', () => {
      });
      describe('0xCB02: xxxxx', () => {
      });
      describe('0xCB03: xxxxx', () => {
      });
      describe('0xCB04: xxxxx', () => {
      });
      describe('0xCB05: xxxxx', () => {
      });
      describe('0xCB06: xxxxx', () => {
      });
      describe('0xCB07: xxxxx', () => {
      });
      describe('0xCB08: xxxxx', () => {
      });
      describe('0xCB09: xxxxx', () => {
      });
      describe('0xCB0A: xxxxx', () => {
      });
      describe('0xCB0B: xxxxx', () => {
      });
      describe('0xCB0C: xxxxx', () => {
      });
      describe('0xCB0D: xxxxx', () => {
      });
      describe('0xCB0E: xxxxx', () => {
      });
      describe('0xCB0F: xxxxx', () => {
      });
    });

    describe('0xCB10 - 0xCB1F', () => {
      describe('0xCB10: xxxxx', () => {
      });
      describe('0xCB11: xxxxx', () => {
      });
      describe('0xCB12: xxxxx', () => {
      });
      describe('0xCB13: xxxxx', () => {
      });
      describe('0xCB14: xxxxx', () => {
      });
      describe('0xCB15: xxxxx', () => {
      });
      describe('0xCB16: xxxxx', () => {
      });
      describe('0xCB17: xxxxx', () => {
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
