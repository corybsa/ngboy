import { Injectable } from '@angular/core';
import { Debugger } from '../util/debugger';
import { LcdInfo } from '../models/lcd-info.model';

@Injectable({
  providedIn: 'root'
})
export class LCD extends Debugger<LcdInfo> {
  public static readonly FREQUENCY = 59.7;
  public static readonly HEIGHT = 144;
  public static readonly WIDTH = 160;
  public static readonly SCALE = 1;

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

  constructor() {
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
    // console.log(backgroundMap);
  }
}
