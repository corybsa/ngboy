import { Debugger } from '../util/debugger';
import { MemoryInfo } from '../models/memory-info.model';

export class Memory extends Debugger<MemoryInfo> {
  private cartridge: DataView = new DataView(new ArrayBuffer(0x800000));
  private vram: DataView = new DataView(new ArrayBuffer(0x2000));
  private sram: DataView = new DataView(new ArrayBuffer(0x8000));
  private wram: DataView = new DataView(new ArrayBuffer(0x2000));
  private eram: DataView = new DataView(new ArrayBuffer(0x1E00));
  private oam: DataView = new DataView(new ArrayBuffer(0xA0));
  private fea0_feff: DataView = new DataView(new ArrayBuffer(0x60));
  private io: DataView = new DataView(new ArrayBuffer(0x80));
  private hram: DataView = new DataView(new ArrayBuffer(0x7F));
  private ie: DataView = new DataView(new ArrayBuffer(1));

  private currentRomBank = 1;
  private currentRamBank = 0;

  constructor() {
    super();
  }

  public loadROM(rom: DataView) {
    this.cartridge = rom;
    // this.romBankType = this.getRomBankType(this.cartridge.getUint8(0x147));
  }

  public getByteAt(address: number): number {
    let addr;

    if(address <= 0x3FFF) {
      return this.cartridge.getUint8(address);
    } else if(address <= 0x7FFF) {
      addr = (address - 0x4000) + (this.currentRomBank * 0x4000);
      return this.cartridge.getUint8(addr);
    } else if(address <= 0x9FFF) {
      addr = (0x1FFF - (0x9FFF - address)) & 0xFFFF;
      return this.vram.getUint8(addr);
    } else if(address <= 0xBFFF) {
      addr = (0x1FFF - (0xBFFF - address)) & 0xFFFF;
      addr += (this.currentRamBank * 0x2000);
      return this.sram.getUint8(addr);
    } else if(address <= 0xDFFF) {
      addr = (0x1FFF - (0xDFFF - address)) & 0xFFFF;
      return this.wram.getUint8(addr);
    } else if(address <= 0xFDFF) {
      addr = (0x1DFF - (0xFDFF - address)) & 0xFFFF;
      return this.eram.getUint8(addr);
    } else if(address <= 0xFE9F) {
      addr = (0x9F - (0xFE9F - address)) & 0xFFFF;
      return this.oam.getUint8(addr);
    } else if(address <= 0xFEFF) {
      // Reading from this area on DMG always returns 0.
      return 0x00;

      /*addr = (0x5F - (0xFEFF - address)) & 0xFFFF;
      return this.fea0_feff.getUint8(addr);*/
    } else if(address <= 0xFF7F) {
      addr = (0x4B - (0xFF4B - address)) & 0xFFFF;

      /*if(address == IORegisters.LCD_STATUS) {
        int lcdc = this.getByteAt(IORegisters.LCDC);

        // When LCD is off bits 0 through 2 return 0
        if((lcdc & 0x80) != 0x80) {
          return (0x80 | this.io.getUint8(addr)) & 0xF8;
        } else {
          return (0x80 | this.io.getUint8(addr));
        }
      }

      // the upper 2 bits of the P1 always return 1
      if(address == IORegisters.JOYPAD) {
        return (0xC0 | this.io.getUint8(addr));
      }

      // bits 1 through 6 of SIO return 1
      if(address == IORegisters.SERIAL_TRANSFER_CONTROL) {
        return (0x7E | this.io.getUint8(addr));
      }

      // the upper 5 bits of TAC always return 1
      if(address == IORegisters.TAC) {
        return (0xF8 | this.io.getUint8(addr));
      }

      // the upper 3 bits of IF always return 1
      if(address == IORegisters.INTERRUPT_FLAGS) {
        return (0xE0 | this.io.getUint8(addr));
      }

      // the 7th bit of nr10 always returns 1
      if(address == IORegisters.SOUND1_SWEEP) {
        return (0x80 | this.io.getUint8(addr));
      }

      // bits 0 though 6 of nr30 always return 1
      if(address == IORegisters.SOUND3_ENABLE) {
        return (0x7F | this.io.getUint8(addr));
      }

      // bits 0 through 4 and bit 7 of nr32 always return 1
      if(address == IORegisters.SOUND3_OUTPUT_LEVEL) {
        return (0x9F | this.io.getUint8(addr));
      }

      // bits 6 and 7 of nr41 always return 1
      if(address == IORegisters.SOUND4_LENGTH) {
        return (0xC0 | this.io.getUint8(addr));
      }

      // bits 0 through 5 of nr44 always return 1
      if(address == IORegisters.SOUND4_INITIAL) {
        return (0x3F | this.io.getUint8(addr));
      }

      // bits 4 through 6 of nr52 always return 1
      if(address == IORegisters.SOUND_ENABLE) {
        return (0x70 | this.io.getUint8(addr));
      }*/

      return this.io.getUint8(addr);
    } else if(address <= 0xFFFE) {
      addr = (0x7E - (0xFFFE - address)) & 0xFFFF;
      return this.hram.getUint8(addr);
    } else {
      return this.ie.getUint8(0);
    }
  }

  setByteAt(address: number, value: number) {
    let addr;

    // TODO: restrict access to VRAM and OAM when necessary

    if(address <= 0x7FFF) {
      // this.switchBank(address, value);
    } else if(address <= 0x9FFF) {
      addr = (0x1FFF - (0x9FFF - address)) & 0xFFFF;
      this.vram.setUint8(addr, value);
    } else if(address <= 0xBFFF) {
      addr = (0x1FFF - (0xBFFF - address)) & 0xFFFF;

      /*if(this.isRamEnabled) {
        addr = (addr - 0x1FFF) + (this.currentRamBank * 0x2000);
      }*/

      this.sram.setUint8(addr, value);
    } else if(address <= 0xDFFF) {
      addr = (0x1FFF - (0xDFFF - address)) & 0xFFFF;
      this.wram.setUint8(addr, value);

      // Writes to this area are copied to eram
      if(addr < 0x1E00) {
        this.eram.setUint8(addr, value);
      }
    } else if(address <= 0xFDFF) {
      addr = (0x1DFF - (0xFDFF - address)) & 0xFFFF;

      // Writes to this area are redirected to 0xC000 through 0xDDFF (wram)
      this.eram.setUint8(addr, value);
      this.wram.setUint8(addr, value);
    } else if(address <= 0xFE9F) {
      addr = (0x9F - (0xFE9F - address)) & 0xFFFF;
      this.oam.setUint8(addr, value);
    } else if(address <= 0xFEFF) {
      // writes are ignored on the GameBoy.
      /*addr = (0x5F - (0xFEFF - address)) & 0xFFFF;
      this.fea0_feff.setUint8(addr, value);*/
    } else if(address <= 0xFF7F) {
      addr = (0x4B - (0xFF4B - address)) & 0xFFFF;
      this.io.setUint8(addr, value);

      /*if(address == IORegisters.DIVIDER) {
        int targetBit = this.getTimerSystemBit();

        // TIMA can be increased if the system counter has reached half the clocks it needs to increase
        if(((Timers.systemCounter & targetBit) == targetBit)) {
          this.incrementTima();
        }

        Timers.systemCounter = 0;
        this.iosetUint8(addr, 0);
        return;
      }

      if(address == IORegisters.TIMA) {
        if(Timers.state == Timers.TimerState.OVERFLOW) {
          // If a value is written to TIMA during the overflow period, the new value will override the TMA load.
          Timers.isTimaChanged = true;
          Timers.timaGlitch = true;
        } else if(Timers.state == Timers.TimerState.LOADING_TMA) {
          // If a value is written to TIMA during the period when TMA is being loaded, the write will be ignored.
          Timers.isTimaChanged = true;
        }

        this.io.setUint8addr, value;
      }

      if(address == IORegisters.TAC) {
        int tac  = this.getByteAt(IORegisters.TAC);
        int oldEnable = (tac & 0x04);
        int newEnable = (value & 0x04);
        int targetBit = this.getTimerSystemBit();

        // When disabling the timer, if the system counter has reached half the clocks it
        // needs to increase, TIMA will increase
        if((oldEnable == 0x04) && (newEnable == 0) && ((Timers.systemCounter & targetBit) == targetBit)) {
          this.incrementTima();
        }

        int oldValue = (tac & 0x03);
        int newValue = (value & 0x03);

        // When changing TAC value, if the old selected bit was 0, the new one is 1 and the
        // new enable bit is 1, TIMA will increase
        if((oldValue == 0) && (newValue == 1) && (newEnable == 0x04)) {
          this.incrementTima();
        }
      }

      if(address == IORegisters.INTERRUPT_FLAGS) {
        // If TIMA has a pending overflow, the written value will overwrite the automatic flag set to 1.
        // If a 0 is written during this time, the interrupt won't happen.
        if(Timers.state == Timers.TimerState.OVERFLOW) {
          Timers.isFlagsChanged = true;
        } else if(Timers.state == Timers.TimerState.LOADING_TMA) {
          Timers.isFlagsChanged = true;
          Timers.flagValue = (value & Interrupts.TIMER) >> 2;
        }

        this.io.setUint8(addr, 0xE0 | value);
      } else {
        this.io.setUint8(addr, value);
      }*/

      // TODO: (in bgb) something weird is happening when a value is written to IORegisters.LCDC.
      // TODO: need to checkout IORegisters.LCD_STATUS as well.

      /*if(address == IORegisters.LCDC_Y_COORDINATE || address == IORegisters.LY_COMPARE) {
        this.compareLY();
      }*/
    } else if(address <= 0xFFFE) {
      addr = (0x7E - (0xFFFE - address)) & 0xFFFF;
      this.hram.setUint8(addr, value);
    } else {
      this.ie.setUint8(0, value);
    }

    this.emit({
      cartridge: this.cartridge,
      vram: this.vram,
      sram: this.sram,
      wram: this.wram,
      eram: this.eram,
      oam: this.oam,
      fea0_feff: this.fea0_feff,
      io: this.io,
      hram: this.hram,
      ie: this.ie
    });
  }
}
