import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderScoreComponent } from './header-score.component';

describe('HeaderScoreComponent', () => {
  let component: HeaderScoreComponent;
  let fixture: ComponentFixture<HeaderScoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderScoreComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
