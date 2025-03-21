import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepCardComponent } from './sheep-card.component';

describe('SheepCardComponent', () => {
  let component: SheepCardComponent;
  let fixture: ComponentFixture<SheepCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheepCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheepCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
