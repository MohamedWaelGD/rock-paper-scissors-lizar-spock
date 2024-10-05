import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawCycleLinesComponent } from './draw-cycle-lines.component';

describe('DrawCycleLinesComponent', () => {
  let component: DrawCycleLinesComponent;
  let fixture: ComponentFixture<DrawCycleLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawCycleLinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawCycleLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
