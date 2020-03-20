import { CPU } from './cpu';
import { Memory } from './memory';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CpuInfo } from '../models/cpu-info.model';
import { MemoryInfo } from '../models/memory-info.model';
import { Injectable } from '@angular/core';
import { GPU } from './gpu';
import { GpuInfo } from '../models/gpu-info.model';
import { LCD } from './lcd';
import { LcdInfo } from '../models/lcd-info.model';

@Injectable({
  providedIn: 'root'
})
export class GameBoy {
  private subscriptions: Subscription[] = [];

  private cpuInfo: CpuInfo;
  private memoryInfo: MemoryInfo;
  private gpuInfo: GpuInfo;
  private lcdInfo: LcdInfo;
  private canvas: HTMLCanvasElement;

  public debuggerEnabled = false;
  public drawObserver = new BehaviorSubject(null);

  constructor(
    private cpu: CPU,
    private memory: Memory,
    private gpu: GPU,
    private lcd: LCD
  ) {
    const cpuObserver = this.cpu.subscribe();
    const memObserver = this.memory.subscribe();
    const gpuObserver = this.gpu.subscribe();
    const lcdObserver = this.lcd.subscribe();

    this.subscriptions.push(
      this.memory.vramObserver.subscribe(res => {
        if(res) {
          this.gpu.updateTiles(res);
        }
      }),
      this.lcd.tileObserver.subscribe(res => this.draw(res)),
      cpuObserver.subscribe(res => this.cpuInfo = res),
      memObserver.subscribe(res => this.memoryInfo = res),
      gpuObserver.subscribe(res => this.gpuInfo = res),
      lcdObserver.subscribe(res => this.lcdInfo = res)
    );
  }

  public insertCartridge(rom: number[]) {
    this.memory.loadROM(rom);
    this.cpu.reset();
    this.gpu.reset();
  }

  public powerOff() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public tick() {
    let cycles = 0;
    const frameClock = cycles + 70224;

    do {
      cycles = this.cpu.tick();
      this.gpu.tick(cycles);
    } while(cycles < frameClock);

    /*cycles = this.cpu.tick();
    this.gpu.tick(cycles);*/
  }

  public run() {
    window.setInterval(() => {
      this.tick();
    }, 1);
  }

  public setCanvas(canvas: any) {
    this.canvas = canvas.nativeElement;
  }

  public draw(tiles: number[]) {
    if(!this.canvas) {
      return;
    }

    const canvas = this.canvas.getContext('2d');
    let screen;

    if(!canvas) {
      throw new Error('Canvas context could not be created.');
    } else {
      const height = LCD.HEIGHT * LCD.SCALE;
      const width = LCD.WIDTH * LCD.SCALE;
      if(canvas.createImageData) {
        screen = canvas.createImageData(width, height);
      } else if(canvas.getImageData) {
        screen = canvas.getImageData(0, 0, width, height);
      } else {
        screen = {
          width: width,
          height: height,
          data: new Array(width * height * 4)
        };
      }

      const length = screen.data.length;

      for(let i = 0; i < length; i++) {
        screen.data[i] = tiles[i];
      }

      canvas.putImageData(screen, 0, 0);
    }
  }

  public toggleDebugger() {
    this.debuggerEnabled = !this.debuggerEnabled;
    this.cpu.setDebuggerEnabled(this.debuggerEnabled);
    this.memory.setDebuggerEnabled(this.debuggerEnabled);
  }

  public getCpuInfo(): CpuInfo {
    return this.cpuInfo;
  }

  public getMemoryInfo(): MemoryInfo {
    return this.memoryInfo;
  }

  public getGpuInfo(): GpuInfo {
    return this.gpuInfo;
  }

  public getLcdInfo(): LcdInfo {
    return this.lcdInfo;
  }

  public getMemoryWatch() {
    const objs = [];

    for(const item of this.memoryInfo.watch) {
      objs.push({
        address: `0x${item.toString(16).toUpperCase().padStart(4, '0')}`,
        value: `0x${this.memory.getByteAt(item).toString(16).toUpperCase().padStart(2, '0')}`,
        action: 'close'
      });
    }

    return objs;
  }

  public addMemoryWatch(input: string) {
    const addresses = input.replace(/ /g, '').split(',');

    addresses.forEach(item => {
      this.memory.addWatch(parseInt(item, 16));
    });
  }

  public removeMemoryWatch(input: string) {
    const address = parseInt(input, 16);
    this.memory.removeWatch(address);
  }
}
