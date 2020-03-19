import { NgModule } from '@angular/core';
import { GameBoyComponent } from './game-boy.component';
import {
  MatButtonModule,
  MatCardModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule,
  MatTableModule
} from '@angular/material';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatIconModule,
    MatSlideToggleModule,
    CommonModule
  ],
  declarations: [
    GameBoyComponent
  ],
  exports: [
    GameBoyComponent
  ]
})
export class GameBoyModule {

}
