import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameModeSwitcherComponent } from './game-mode-switcher.component';

describe('GameModeSwitcherComponent', () => {
  let component: GameModeSwitcherComponent;
  let fixture: ComponentFixture<GameModeSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameModeSwitcherComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameModeSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
