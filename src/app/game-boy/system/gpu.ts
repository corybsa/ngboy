import { Debugger } from '../util/debugger';
import { GpuInfo } from '../models/gpu-info.model';
import { Injectable } from '@angular/core';
import { Memory } from './memory';
import { LCD } from './lcd';
import { IORegisters } from '../util/io-registers';
import { Interrupts } from '../util/interrupts';

@Injectable({
  providedIn: 'root'
})
export class GPU extends Debugger<GpuInfo> {
  public static readonly Mode = {
    HBLANK: 0,
    VBLANK: 1,
    OAM: 2,
    VRAM: 3
  };

  private static readonly Timings = {
    HBLANK: 204,
    VBLANK: 456,
    OAM: 80,
    VRAM: 172
  };

  private mode: number;
  private scanline = 0;
  private ticks = 0;
  private previousCycles = 0;
  private tiles = [[[]]];
  private lastFrame = Date.now();
  private framerate = 0;

  private backgroundMap = [[[]]];

  constructor(
    private memory: Memory,
    private lcd: LCD
  ) {
    super();

    this.mode = GPU.Mode.HBLANK;

    this.emit();
  }

  emit() {
    super.emit({
      framerate: this.framerate,
      mode: this.mode,
      backgroundMap: this.backgroundMap,
      scanline: this.scanline
    });
  }

  public tick(cycles: number) {
    this.ticks += cycles - this.previousCycles;

    // When cycles is set to 0 in the cpu, ticks becomes negative. This corrects that and sets ticks to the
    // proper value.
    if(this.ticks < 0) {
      this.ticks += this.previousCycles;
    }

    this.previousCycles = cycles;

    switch(this.mode) {
      case GPU.Mode.HBLANK:
        if(this.ticks >= GPU.Timings.HBLANK) {
          this.lcd.render(this.backgroundMap);
          this.scanline++;

          if(this.scanline === LCD.VBlankArea.START) {
            this.changeMode(GPU.Mode.VBLANK);
          } else {
            this.changeMode(GPU.Mode.OAM);
          }

          this.ticks -= GPU.Timings.HBLANK;
          this.setLY(this.scanline);
        }

        break;
      case GPU.Mode.VBLANK:
        if(this.ticks >= GPU.Timings.VBLANK) {
          this.scanline++;

          if(this.scanline > LCD.VBlankArea.END) {
            const now = Date.now();
            const delta = now - this.lastFrame;

            if(delta > 0) {
              this.framerate = (1 / delta) * 60;
            }

            this.lastFrame = now;

            this.scanline = 0;
            this.changeMode(GPU.Mode.OAM);
          }
        }

        break;
      case GPU.Mode.OAM:
        if(this.ticks >= GPU.Timings.OAM) {
          this.changeMode(GPU.Mode.VRAM);
          this.ticks -= GPU.Timings.OAM;
        }

        break;
      case GPU.Mode.VRAM:
        if(this.ticks >= GPU.Timings.VRAM) {
          this.changeMode(GPU.Mode.HBLANK);
          this.ticks -= GPU.Timings.VRAM;
        }

        break;
    }

    this.emit();
  }

  public reset() {
    this.mode = GPU.Mode.HBLANK;
    this.scanline = 0;
    this.ticks = 0;
    this.previousCycles = 0;
    this.tiles = [[[]]];
    this.backgroundMap = [[[]]];
    this.setLY(this.scanline);
  }

  /**
   * Change mode and request appropriate interrupt.
   * @param mode The mode to change to
   */
  private changeMode(mode: number) {
    if(mode !== this.mode) {
      let statusFlag = this.memory.getByteAt(IORegisters.LCD_STATUS);

      switch(mode) {
        case GPU.Mode.HBLANK:
          // set the mode interrupt bit 3 to 1 (bits 3 through 5)
          statusFlag |= (1 << 3);

          // set the mode bit to 0 (bits 0 and 1)
          statusFlag = ((statusFlag >> 2) << 2);

          this.memory.setByteAt(IORegisters.LCD_STATUS, statusFlag);
          this.requestInterrupt(Interrupts.LCD_STAT);
          break;
        case GPU.Mode.VBLANK:
          // set the mode interrupt bit 4 to 1 (bits 3 through 5)
          statusFlag |= (1 << 4);

          // set the mode bit to 1 (bits 0 and 1)
          statusFlag = ((statusFlag >> 2) << 2) | 1;

          this.memory.setByteAt(IORegisters.LCD_STATUS, statusFlag);
          this.requestInterrupt(Interrupts.VBLANK);
          break;
        case GPU.Mode.OAM:
          // set the mode interrupt bit 5 to 1 (bits 3 through 5)
          statusFlag |= (1 << 5);

          // set the mode bit to 2 (bits 0 and 1)
          statusFlag = ((statusFlag >> 2) << 2) | 2;

          this.memory.setByteAt(IORegisters.LCD_STATUS, statusFlag);
          this.requestInterrupt(Interrupts.LCD_STAT);
          break;
        case GPU.Mode.VRAM:
          // set the mode bit to 2 (bits 0 and 1)
          statusFlag = ((statusFlag >> 2) << 2) | 3;

          this.memory.setByteAt(IORegisters.LCD_STATUS, statusFlag);
          this.requestInterrupt(Interrupts.LCD_STAT);
          break;
      }

      this.mode = mode;
    }
  }

  /**
   * Requests an interrupt.
   * @param interrupt The interrupt to request.
   */
  private requestInterrupt(interrupt: number) {
    let flag = this.memory.getByteAt(IORegisters.INTERRUPT_FLAGS);
    flag |= interrupt;
    this.memory.setByteAt(IORegisters.INTERRUPT_FLAGS, flag);
  }

  /**
   * LCD Controller Y-Coordinate (LY) - Sets the value of LY.
   * The LY indicates the vertical line to which the present data is transferred to the LCD Driver.
   * @param value The value to set the LY register to.
   */
  private setLY(value: number) {
    this.memory.setByteAt(IORegisters.LCDC_Y_COORDINATE, value);
  }
}
