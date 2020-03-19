import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GameBoy } from './system/game-boy';

@Component({
  selector: 'game-boy',
  templateUrl: './game-boy.component.html',
  styleUrls: ['./game-boy.component.css']
})
export class GameBoyComponent implements OnDestroy {
  file: any = null;

  @ViewChild('addWatchInput', { static: false }) addWatchInput: ElementRef;

  constructor(
    private gameBoy: GameBoy
  ) {
    this.gameBoy.toggleDebugger();
    console.log(this.gameBoy);
  }

  ngOnDestroy(): void {
    this.gameBoy.powerOff();
  }

  handleFileInput($event) {
    this.file = $event.target.files.item(0);

    this.file.arrayBuffer().then(data => {
      const rom = new DataView(data);
      const parsedRom = [];
      const len = rom.byteLength - 1;

      for(let i = 0; i < len; i++) {
        parsedRom[i] = rom.getUint8(i);
      }

      this.gameBoy.insertCartridge(parsedRom);
      this.gameBoy.run();
    });
  }

  addWatch(value: string) {
    this.gameBoy.addMemoryWatch(value);
    this.addWatchInput.nativeElement.value = '';
  }
}
