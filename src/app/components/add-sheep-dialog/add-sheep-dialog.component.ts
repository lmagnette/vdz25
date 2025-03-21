import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {MatError, MatFormField, MatHint, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {Sheep} from '../../models/sheep';

@Component({
  selector: 'app-add-sheep-dialog',
  template:`
    <h2 mat-dialog-title>Add a New Space Sheep</h2>
    <mat-dialog-content>
      <form [formGroup]="sheepForm" class="sheep-form">
        <mat-form-field appearance="outline">
          <mat-label>Sheep Name</mat-label>
          <input matInput formControlName="name" placeholder="Enter sheep name">
          <mat-error *ngIf="sheepForm.get('name')?.invalid">
            Name is required and must be at least 2 characters
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Species</mat-label>
          <input matInput formControlName="species" placeholder="Enter sheep species">
          <mat-error *ngIf="sheepForm.get('species')?.invalid">
            Species is required
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Description</mat-label>
          <textarea matInput formControlName="description" placeholder="Describe this cosmic sheep" rows="4"></textarea>
          <mat-error *ngIf="sheepForm.get('description')?.invalid">
            Description is required and must be at least 10 characters
          </mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline">
          <mat-label>Image URL</mat-label>
          <input matInput formControlName="imageUrl" placeholder="Enter image URL">
          <mat-hint>Leave as default for placeholder image</mat-hint>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancel</button>
      <button mat-raised-button color="accent" [disabled]="sheepForm.invalid" (click)="onSubmit()">Add Sheep</button>
    </mat-dialog-actions>
  `,
  styleUrls: ['./add-sheep-dialog.component.scss'],
  imports: [
    MatFormField,
    MatInput,
    ReactiveFormsModule,
    NgIf,
    MatDialogContent,
    MatDialogTitle,
    MatDialogActions,
    MatButton,
    MatHint,
    MatLabel,
    MatError
  ]
})
export class AddSheepDialogComponent {
  sheepForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddSheepDialogComponent>
  ) {
    this.sheepForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      species: ['', Validators.required],
      description: ['', [Validators.required, Validators.minLength(10)]],
      imageUrl: ['assets/images/unknown.webp']
    });
  }

  onSubmit(): void {
    if (this.sheepForm.valid) {
      const newSheep: Partial<Sheep> = this.sheepForm.value;
      this.dialogRef.close(newSheep);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
