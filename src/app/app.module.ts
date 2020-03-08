import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule, MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import {CPU} from './system/cpu';
import {Memory} from './system/memory';
import {GameBoy} from './system/game-boy';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatSlideToggleModule
  ],
  providers: [
    CPU,
    Memory,
    GameBoy
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
