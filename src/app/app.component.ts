import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GameBoy } from './system/game-boy';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'NgBoy';

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
    });
  }

  addWatch(value: string) {
    this.gameBoy.addMemoryWatch(value);
    this.addWatchInput.nativeElement.value = '';
  }
}
