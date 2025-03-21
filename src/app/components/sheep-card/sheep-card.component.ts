import {Component, Input} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardImage,
  MatCardTitle
} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {Sheep} from '../../models/sheep';
import {NgIf} from '@angular/common';

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
    NgIf
  ],
  template: `
    <mat-card class="sheep-card">
      <mat-card-title><h2>{{ sheep.name }}</h2></mat-card-title>
      <img mat-card-image [src]="sheep.imageUrl" alt="{{ sheep.name }}">
      <mat-card-content>
        <p>{{ sheep.description }}</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-button color="accent" (click)="likeSheep()">
          <mat-icon>
            favorite
          </mat-icon>
          LIKE ({{ sheep.likes }})
        </button>
        <div>
          <ng-container *ngIf="sheep.category === 'military'; else science">
            <mat-icon class="icon">
              military_tech
            </mat-icon>
          </ng-container>
          <ng-template #science>
            <mat-icon *ngIf="sheep.category === 'science'; else movie" class="icon">
              science
            </mat-icon>
          </ng-template>
          <ng-template #movie>
            <mat-icon *ngIf="sheep.category === 'movie'; else unknown" class="icon">
              movie
            </mat-icon>
          </ng-template>
          <ng-template #unknown>
            <mat-icon class="icon">
              not_listed_location
            </mat-icon>
          </ng-template>
        </div>
      </mat-card-actions>
    </mat-card>
  `,
  styleUrl: './sheep-card.component.scss'
})
export class SheepCardComponent {
  @Input({required:true})
  sheep!: Sheep;


  constructor() {
  }

  likeSheep() {

  }
}
