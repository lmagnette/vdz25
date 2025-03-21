import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSheepDialogComponent } from './add-sheep-dialog.component';

describe('AddSheepDialogComponent', () => {
  let component: AddSheepDialogComponent;
  let fixture: ComponentFixture<AddSheepDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddSheepDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSheepDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
