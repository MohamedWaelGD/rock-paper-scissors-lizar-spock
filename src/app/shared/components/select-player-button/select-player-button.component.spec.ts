import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPlayerButtonComponent } from './select-game-button.component';

describe('SelectGameButtonComponent', () => {
  let component: SelectPlayerButtonComponent;
  let fixture: ComponentFixture<SelectPlayerButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectPlayerButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectPlayerButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
