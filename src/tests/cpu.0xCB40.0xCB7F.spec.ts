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

  describe('0xCB40 - 0xCB7F', () => {
    describe('0xCB40 - 0xCB4F', () => {
      describe('0xCB40: xxxxx', () => {
      });
      describe('0xCB41: xxxxx', () => {
      });
      describe('0xCB42: xxxxx', () => {
      });
      describe('0xCB43: xxxxx', () => {
      });
      describe('0xCB44: xxxxx', () => {
      });
      describe('0xCB45: xxxxx', () => {
      });
      describe('0xCB46: xxxxx', () => {
      });
      describe('0xCB47: xxxxx', () => {
      });
      describe('0xCB48: xxxxx', () => {
      });
      describe('0xCB49: xxxxx', () => {
      });
      describe('0xCB4A: xxxxx', () => {
      });
      describe('0xCB4B: xxxxx', () => {
      });
      describe('0xCB4C: xxxxx', () => {
      });
      describe('0xCB4D: xxxxx', () => {
      });
      describe('0xCB4E: xxxxx', () => {
      });
      describe('0xCB4F: xxxxx', () => {
      });
    });

    describe('0xCB50 - 0xCB5F', () => {
      describe('0xCB50: xxxxx', () => {
      });
      describe('0xCB51: xxxxx', () => {
      });
      describe('0xCB52: xxxxx', () => {
      });
      describe('0xCB53: xxxxx', () => {
      });
      describe('0xCB54: xxxxx', () => {
      });
      describe('0xCB55: xxxxx', () => {
      });
      describe('0xCB56: xxxxx', () => {
      });
      describe('0xCB57: xxxxx', () => {
      });
      describe('0xCB58: xxxxx', () => {
      });
      describe('0xCB59: xxxxx', () => {
      });
      describe('0xCB5A: xxxxx', () => {
      });
      describe('0xCB5B: xxxxx', () => {
      });
      describe('0xCB5C: xxxxx', () => {
      });
      describe('0xCB5D: xxxxx', () => {
      });
      describe('0xCB5E: xxxxx', () => {
      });
      describe('0xCB5F: xxxxx', () => {
      });
    });

    describe('0xCB60 - 0xCB6F', () => {
      describe('0xCB60: xxxxx', () => {
      });
      describe('0xCB61: xxxxx', () => {
      });
      describe('0xCB62: xxxxx', () => {
      });
      describe('0xCB63: xxxxx', () => {
      });
      describe('0xCB64: xxxxx', () => {
      });
      describe('0xCB65: xxxxx', () => {
      });
      describe('0xCB66: xxxxx', () => {
      });
      describe('0xCB67: xxxxx', () => {
      });
      describe('0xCB68: xxxxx', () => {
      });
      describe('0xCB69: xxxxx', () => {
      });
      describe('0xCB6A: xxxxx', () => {
      });
      describe('0xCB6B: xxxxx', () => {
      });
      describe('0xCB6C: xxxxx', () => {
      });
      describe('0xCB6D: xxxxx', () => {
      });
      describe('0xCB6E: xxxxx', () => {
      });
      describe('0xCB6F: xxxxx', () => {
      });
    });

    describe('0xCB70 - 0xCB7F', () => {
      describe('0xCB70: xxxxx', () => {
      });
      describe('0xCB71: xxxxx', () => {
      });
      describe('0xCB72: xxxxx', () => {
      });
      describe('0xCB73: xxxxx', () => {
      });
      describe('0xCB74: xxxxx', () => {
      });
      describe('0xCB75: xxxxx', () => {
      });
      describe('0xCB76: xxxxx', () => {
      });
      describe('0xCB77: xxxxx', () => {
      });
      describe('0xCB78: xxxxx', () => {
      });
      describe('0xCB79: xxxxx', () => {
      });
      describe('0xCB7A: xxxxx', () => {
      });
      describe('0xCB7B: xxxxx', () => {
      });
      describe('0xCB7C: xxxxx', () => {
      });
      describe('0xCB7D: xxxxx', () => {
      });
      describe('0xCB7E: xxxxx', () => {
      });
      describe('0xCB7F: xxxxx', () => {
      });
    });
  });
});
