import { Component, OnDestroy } from '@angular/core';
import { CPU } from './system/cpu';
import { Subscription } from 'rxjs';
import { CpuInfo } from './models/cpu-info.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  title = 'NgBoy';
  cpu: CPU;

  cpuInfo: CpuInfo;

  constructor() {
    this.cpu = new CPU();
    const o = this.cpu.subscribe();
    o.subscribe(res => this.cpuInfo = res);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
