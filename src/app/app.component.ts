import { Component, OnDestroy } from '@angular/core';
import { CPU } from './system/cpu';
import { Subscription } from 'rxjs';
import { CpuInfo } from './models/cpu-info.model';
import { Memory } from './system/memory';
import { MemoryInfo } from './models/memory-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  title = 'NgBoy';
  cpu: CPU;
  memory: Memory;

  cpuInfo: CpuInfo;
  memoryInfo: MemoryInfo;

  constructor() {
    this.memory = new Memory();
    this.cpu = new CPU(this.memory);

    const cpuObserver = this.cpu.subscribe();
    cpuObserver.subscribe(res => this.cpuInfo = res);

    const memObserver = this.memory.subscribe();
    memObserver.subscribe(res => {
      this.memoryInfo = res;
      console.log(res);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
