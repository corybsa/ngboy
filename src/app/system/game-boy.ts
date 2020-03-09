import { CPU } from './cpu';
import { Memory } from './memory';
import { Subscription } from 'rxjs';
import { CpuInfo } from '../models/cpu-info.model';
import { MemoryInfo } from '../models/memory-info.model';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class GameBoy {
  private subscriptions: Subscription[] = [];

  private cpuInfo: CpuInfo;
  private memoryInfo: MemoryInfo;

  public debuggerEnabled = true;

  constructor(private cpu: CPU, private memory: Memory) {
    const cpuObserver = this.cpu.subscribe();
    const memObserver = this.memory.subscribe();

    this.subscriptions.push(
      cpuObserver.subscribe(res => this.cpuInfo = res),
      memObserver.subscribe(res => this.memoryInfo = res)
    );
  }

  public insertCartridge(rom: number[]) {
    this.memory.loadROM(rom);
    this.cpu.reset();
  }

  public powerOff() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  public tick() {
    this.cpu.tick();
  }

  public toggleDebugger() {
    this.debuggerEnabled = !this.debuggerEnabled;
  }

  public getCpuInfo(): CpuInfo {
    return this.cpuInfo;
  }

  public getMemoryInfo(): MemoryInfo {
    return this.memoryInfo;
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
