import {Component, effect, inject, input, model} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {Sheep} from '../../models/sheep';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sheep-card',
  imports: [
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardImage,
    MatCardTitle,
    MatIcon,
  ],
  template: `
    <mat-card class="sheep-card">
      <mat-card-title><h2>{{ sheep().name }}</h2></mat-card-title>
      <img mat-card-image [src]="sheep().imageUrl" alt="{{ sheep().name }}">
      <mat-card-content>
        <p>{{ sheep().description }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="accent" (click)="likeSheep()">
          <mat-icon>
            favorite
          </mat-icon>
          LIKE ({{ likes() }})
        </button>
        <div>
          <mat-icon class="icon">
            @switch (sheep().category) {

              @case ('military') {
                military_tech
              }
              @case ( 'science') {
                science
              }
              @case ('movie') {
                movie
              }
              @default {
                not_listed_location
              }
            }
          </mat-icon>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './sheep-card.component.scss'
})
export class SheepCardComponent {
  sheep = input.required<Sheep>();

  likes = model.required<number>();
  snack = inject(MatSnackBar);


  constructor() {
    effect(() => {

    });
  }

  likeSheep() {
    this.likes.update(v => v+1);
  }
}
