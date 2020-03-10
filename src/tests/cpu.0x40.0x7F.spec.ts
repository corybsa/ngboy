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

  describe('0x40 - 0x7F', () => {
    describe('0x40 - 0x4F', () => {
      describe('0x40: xxxxx', () => {
      });
      describe('0x41: xxxxx', () => {
      });
      describe('0x42: xxxxx', () => {
      });
      describe('0x43: xxxxx', () => {
      });
      describe('0x44: xxxxx', () => {
      });
      describe('0x45: xxxxx', () => {
      });
      describe('0x46: xxxxx', () => {
      });
      describe('0x47: xxxxx', () => {
      });
      describe('0x48: xxxxx', () => {
      });
      describe('0x49: xxxxx', () => {
      });
      describe('0x4A: xxxxx', () => {
      });
      describe('0x4B: xxxxx', () => {
      });
      describe('0x4C: xxxxx', () => {
      });
      describe('0x4D: xxxxx', () => {
      });
      describe('0x4E: xxxxx', () => {
      });
      describe('0x4F: xxxxx', () => {
      });
    });

    describe('0x50 - 0x5F', () => {
      describe('0x50: xxxxx', () => {
      });
      describe('0x51: xxxxx', () => {
      });
      describe('0x52: xxxxx', () => {
      });
      describe('0x53: xxxxx', () => {
      });
      describe('0x54: xxxxx', () => {
      });
      describe('0x55: xxxxx', () => {
      });
      describe('0x56: xxxxx', () => {
      });
      describe('0x57: xxxxx', () => {
      });
      describe('0x58: xxxxx', () => {
      });
      describe('0x59: xxxxx', () => {
      });
      describe('0x5A: xxxxx', () => {
      });
      describe('0x5B: xxxxx', () => {
      });
      describe('0x5C: xxxxx', () => {
      });
      describe('0x5D: xxxxx', () => {
      });
      describe('0x5E: xxxxx', () => {
      });
      describe('0x5F: xxxxx', () => {
      });
    });

    describe('0x60 - 0x6F', () => {
      describe('0x60: xxxxx', () => {
      });
      describe('0x61: xxxxx', () => {
      });
      describe('0x62: xxxxx', () => {
      });
      describe('0x63: xxxxx', () => {
      });
      describe('0x64: xxxxx', () => {
      });
      describe('0x65: xxxxx', () => {
      });
      describe('0x66: xxxxx', () => {
      });
      describe('0x67: xxxxx', () => {
      });
      describe('0x68: xxxxx', () => {
      });
      describe('0x69: xxxxx', () => {
      });
      describe('0x6A: xxxxx', () => {
      });
      describe('0x6B: xxxxx', () => {
      });
      describe('0x6C: xxxxx', () => {
      });
      describe('0x6D: xxxxx', () => {
      });
      describe('0x6E: xxxxx', () => {
      });
      describe('0x6F: xxxxx', () => {
      });
    });

    describe('0x70 - 0x7F', () => {
      describe('0x70: xxxxx', () => {
      });
      describe('0x71: xxxxx', () => {
      });
      describe('0x72: xxxxx', () => {
      });
      describe('0x73: xxxxx', () => {
      });
      describe('0x74: xxxxx', () => {
      });
      describe('0x75: xxxxx', () => {
      });
      describe('0x76: xxxxx', () => {
      });
      describe('0x77: xxxxx', () => {
      });
      describe('0x78: xxxxx', () => {
      });
      describe('0x79: xxxxx', () => {
      });
      describe('0x7A: xxxxx', () => {
      });
      describe('0x7B: xxxxx', () => {
      });
      describe('0x7C: xxxxx', () => {
      });
      describe('0x7D: xxxxx', () => {
      });
      describe('0x7E: xxxxx', () => {
      });
      describe('0x7F: xxxxx', () => {
      });
    });
  });
});
