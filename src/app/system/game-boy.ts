import {CPU} from './cpu';
import {Memory} from './memory';
import {Subscription} from 'rxjs';
import {CpuInfo} from '../models/cpu-info.model';
import {MemoryInfo} from '../models/memory-info.model';
import {Inject, Injectable} from '@angular/core';

@Injectable()
export class GameBoy {
  private subscriptions: Subscription[] = [];

  private cpuInfo: CpuInfo;
  private memoryInfo: MemoryInfo;

  constructor(@Inject(CPU) private cpu: CPU, @Inject(Memory) private memory: Memory) {
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

  public getCpuInfo(): CpuInfo {
    return this.cpuInfo;
  }

  public getMemoryInfo(): MemoryInfo {
    return this.memoryInfo;
  }
}
