import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SheepsComponent } from './sheeps.component';

describe('SheepsComponent', () => {
  let component: SheepsComponent;
  let fixture: ComponentFixture<SheepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SheepsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SheepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
