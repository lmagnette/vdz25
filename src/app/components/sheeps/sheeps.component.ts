import {Component, computed, effect, inject, linkedSignal, OnInit, signal, viewChildren} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {SheepService} from '../../services/sheep.service';
import {AddSheepDialogComponent} from '../add-sheep-dialog/add-sheep-dialog.component';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {MatToolbar} from '@angular/material/toolbar';
import {MatTooltip} from '@angular/material/tooltip';
import {MatInput} from '@angular/material/input';
import {SheepCardComponent} from '../sheep-card/sheep-card.component';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-sheep',
  template: `
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
            <button *ngIf="searchText" matSuffix mat-icon-button aria-label="Clear" (click)="searchText.set('')">
              <mat-icon>close</mat-icon>
            </button>
            <mat-icon matPrefix>search</mat-icon>
          </mat-form-field>

          <button mat-raised-button color="accent" (click)="openAddSheepDialog()" class="add-button">
            <mat-icon>add</mat-icon>
            Add New Sheep
          </button>
        </div>

        @if (sheeps.isLoading()) {
          <div class="loading-container">
            <mat-spinner></mat-spinner>
            <p>Loading cosmic sheep...</p>
          </div>
        } @else {
          <div class="sheep-grid">
            @for (sheep of filteredSheeps(); track sheep.id) {
              <app-sheep-card [sheep]="sheep" [(likes)]="likes"/>
            } @empty {
              <div class="no-results">
                <mat-icon class="no-results-icon">sentiment_dissatisfied</mat-icon>
                <p>No space sheep found. Try a different search or add a new one!</p>
              </div>
            }
          </div>
        }
        @if(sheeps.error()) {
          <div class="no-results">
            <mat-icon class="no-results-icon">sentiment_dissatisfied</mat-icon>
            <p>Something went wrong</p>
          </div>
        }
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
    MatLabel,
    SheepCardComponent,

  ],
  styleUrls: ['./sheeps.component.scss']
})
export class SheepsComponent implements OnInit {

  sheepService = inject(SheepService);
  dialog = inject(MatDialog);

  title = 'Sheep in Space';
  sheeps = this.sheepService.getSheep();
  filteredSheeps = linkedSignal(() =>
    this.sheeps.value()?.filter(sheep => sheep.name.toUpperCase().includes(this.searchText().toUpperCase()))
  );
  searchText = signal<string>('');
  isLoading = false;
  snack = inject(MatSnackBar);
  likes = signal<number>(0);

  cards = viewChildren<SheepCardComponent>(SheepCardComponent);

  constructor() {
    effect(() => {
      this.onLikesChanged(this.likes());
    });
  }

  ngOnInit() {

  }


  openAddSheepDialog() {
    const dialogRef = this.dialog.open(AddSheepDialogComponent, {
      width: '400px',
      panelClass: 'space-theme-dialog'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.filteredSheeps.update(v => [...v || [], result]);
      }
    });
  }

  onLikesChanged(likes: number) {
    if (likes > 0) {
      this.snack.open(`An awesome sheep has been liked ${likes} times with ${this.cards().length}`, '', {duration: 2000});
    }
  }

  refreshSheep() {
    this.sheeps.reload();
  }
}
