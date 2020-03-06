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
  file: any = null;

  cpuInfo: CpuInfo;
  memoryInfo: MemoryInfo;

  constructor() {
    this.memory = new Memory();
    this.cpu = new CPU(this.memory);

    const cpuObserver = this.cpu.subscribe();
    const memObserver = this.memory.subscribe();

    cpuObserver.subscribe(res => this.cpuInfo = res);
    memObserver.subscribe(res => this.memoryInfo = res);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  handleFileInput($event) {
    this.file = $event.target.files.item(0);

    this.file.arrayBuffer().then(data => {
      const rom = new DataView(data);
      this.memory.loadROM(rom);
    });
  }
}
