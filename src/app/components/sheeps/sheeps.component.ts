import {Component, inject, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Observable} from 'rxjs';
import {Sheep} from '../../models/sheep';
import {SheepService} from '../../services/sheep.service';
import {AddSheepDialogComponent} from '../add-sheep-dialog/add-sheep-dialog.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatInput} from '@angular/material/input';
import {SheepCardComponent} from '../sheep-card/sheep-card.component';

@Component({
  selector: 'app-sheep',
  template:`
    <div class="space-background">
      <mat-toolbar color="primary" class="app-toolbar">
        <span>{{ title }}</span>
        <span class="toolbar-spacer"></span>
        <button mat-icon-button (click)="refreshSheep()" matTooltip="Reload sheep">
          <mat-icon>refresh</mat-icon>
        </button>
      </mat-toolbar>

      <div class="content">
        <div class="search-container">
          <mat-form-field appearance="outline" class="search-field">
            <mat-label>Search sheep by name</mat-label>
            <input matInput [(ngModel)]="searchText">
            <button *ngIf="searchText" matSuffix mat-icon-button aria-label="Clear" (click)="searchText=''">
              <mat-icon>close</mat-icon>
            </button>
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>

          <button mat-raised-button color="accent" (click)="openAddSheepDialog()" class="add-button">
            <mat-icon>add</mat-icon> Add New Sheep
          </button>
        </div>

        <div *ngIf="isLoading" class="loading-container">
          <mat-spinner></mat-spinner>
          <p>Loading cosmic sheep...</p>
        </div>

        <div *ngIf="!isLoading" class="sheep-grid">
          @for(sheep of sheep$ |async; track sheep.id){
            <app-sheep-card [sheep]="sheep"/>
          }
        </div>

        <div *ngIf="!isLoading && (sheep$ | async)?.length === 0" class="no-results">
          <mat-icon class="no-results-icon">sentiment_dissatisfied</mat-icon>
          <p>No space sheep found. Try a different search or add a new one!</p>
        </div>
      </div>
    </div>
  `,
  imports: [
    MatButton,
    MatIcon,
    MatProgressSpinner,
    MatFormField,
    FormsModule,
    NgIf,
    MatIconButton,
    MatToolbar,
    MatTooltip,
    MatInput,
    NgForOf,
    MatLabel,
    SheepCardComponent,
    AsyncPipe,
  ],
  styleUrls: ['./sheeps.component.scss']
})
export class SheepsComponent implements OnInit {

  sheepService = inject(SheepService);
  dialog = inject(MatDialog);

  title = 'Sheep in Space';
  sheep$: Observable<Sheep[]>;
  searchText = '';
  isLoading = false;

  constructor() {
    this.sheep$ = this.sheepService.getSheep();
  }

  ngOnInit() {
    this.loadSheep();
  }

  loadSheep() {
    this.isLoading = true;
    this.sheep$.subscribe(sheep => {
      this.isLoading = false;
    });
  }

  openAddSheepDialog() {
    const dialogRef = this.dialog.open(AddSheepDialogComponent, {
      width: '400px',
      panelClass: 'space-theme-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //TODO add sheep
      }
    });
  }

  refreshSheep() {
    this.loadSheep();
  }
}
