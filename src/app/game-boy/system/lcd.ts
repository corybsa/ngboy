import { Injectable } from '@angular/core';
import { Debugger } from '../util/debugger';
import { LcdInfo } from '../models/lcd-info.model';
import { Memory } from './memory';
import { IORegisters } from '../util/io-registers';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LCD extends Debugger<LcdInfo> {
  public static readonly FREQUENCY = 59.7;
  public static readonly HEIGHT = 144;
  public static readonly WIDTH = 160;
  public static readonly SCALE = 1;
  public static readonly BG_HEIGHT = 256;
  public static readonly BG_WIDTH = 256;

  public static readonly VBlankArea = {
    START: 144,
    END: 153
  };

  public static readonly PixelColor = {
    WHITE: 0,
    LIGHT_GRAY: 1,
    DARK_GRAY: 2,
    BLACK: 3
  };

  public tileObserver = new BehaviorSubject<number[]>(null);

  private tiles = new Array(LCD.HEIGHT * LCD.WIDTH * 4 * LCD.SCALE);

  constructor(
    private memory: Memory
  ) {
    super();

    this.emit();
  }

  public emit() {
    super.emit({
      height: LCD.HEIGHT * LCD.SCALE,
      width: LCD.WIDTH * LCD.SCALE
    });
  }

  public render(backgroundMap: number[][][]) {
    const lcdc = this.memory.getByteAt(IORegisters.LCDC);

    // LCD is disabled, skip render
    if((lcdc >> 7) === 0) {
      return;
    }

    const isBgEnabled = (lcdc & 0x01) === 0x01;
    const isSpritesEnabled = ((lcdc >> 1) & 0x01) === 0x01;

    if(isBgEnabled) {
      this.renderViewport(backgroundMap);
    }

    if(isSpritesEnabled) {
      this.renderSprites(lcdc);
    }

    this.emit();
  }

  private renderViewport(backgroundMap: number[][][]) {
    const scrollX = this.memory.getByteAt(IORegisters.SCROLL_X);
    const scrollY = this.memory.getByteAt(IORegisters.SCROLL_Y);
    let index;

    for(let row = 0; row < LCD.HEIGHT; row++) {
      let y = row + scrollY;

      if(y >= LCD.BG_HEIGHT) {
        y -= LCD.BG_HEIGHT;
      }

      for(let col = 0; col < LCD.WIDTH; col++) {
        let x = col + scrollX;

        if(x >= LCD.BG_WIDTH) {
          x -= LCD.BG_WIDTH;
        }

        const color = backgroundMap[y][x][Math.floor(x % 8)];
        const pixels = this.getColor(color);

        index = ((row * LCD.WIDTH) + col) * 4;

        this.tiles[index] = pixels[0];
        this.tiles[index + 1] = pixels[1];
        this.tiles[index + 2] = pixels[2];
        this.tiles[index + 3] = pixels[3];
      }
    }

    this.tileObserver.next(this.tiles);
  }

  private renderSprites(lcdc: number) {

  }

  private getColor(color: number): number[] {
    const palette = this.memory.getByteAt(IORegisters.BG_PALETTE_DATA);
    let red = 0xFF;
    let green = 0xFF;
    let blue = 0xFF;
    let high = 0;
    let low = 0;

    switch(color) {
      case LCD.PixelColor.WHITE:
        high = 1;
        low = 0;
        break;
      case LCD.PixelColor.LIGHT_GRAY:
        high = 3;
        low = 2;
        break;
      case LCD.PixelColor.DARK_GRAY:
        high = 5;
        low = 4;
        break;
      case LCD.PixelColor.BLACK:
        high = 7;
        low = 6;
        break;
    }

    const paletteColor = ((palette & (0x01 << high)) >> low) | ((palette & (0x01 << low)) >> low);

    switch(paletteColor) {
      case LCD.PixelColor.WHITE:
        red = this.signByte(0x9B);
        green = this.signByte(0xBC);
        blue = this.signByte(0x0F);
        break;
      case LCD.PixelColor.LIGHT_GRAY:
        red = this.signByte(0x8B);
        green = this.signByte(0xAC);
        blue = this.signByte(0x0F);
        break;
      case LCD.PixelColor.DARK_GRAY:
        red = this.signByte(0x30);
        green = this.signByte(0x62);
        blue = this.signByte(0x30);
        break;
      case LCD.PixelColor.BLACK:
        red = this.signByte(0x0F);
        green = this.signByte(0x38);
        blue = this.signByte(0x0F);
        break;
    }

    return [blue, green, red, 0xFF];
  }

  private signByte(n: number): number {
    if(n <= 127) {
      return n;
    } else {
      return (256 - n) * -1;
    }
  }
}
