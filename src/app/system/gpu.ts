import { Debugger } from '../util/debugger';
import { GpuInfo } from '../models/gpu-info.model';
import { Injectable } from '@angular/core';
import { Memory } from './memory';

@Injectable()
export class GPU extends Debugger<GpuInfo> {
  constructor(private memory: Memory) {
    super();
  }
}
