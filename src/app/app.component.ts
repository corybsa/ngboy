import {Component, Inject, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {GameBoy} from './system/game-boy';
import {CPU} from './system/cpu';
import {Memory} from './system/memory';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'NgBoy';

  file: any = null;

  constructor(
    private gameBoy: GameBoy
  ) {
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
}
