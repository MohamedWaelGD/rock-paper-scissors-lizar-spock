import { Component, computed, ElementRef, inject, OnInit } from '@angular/core';
import gsap from 'gsap';
import { GameService } from '../../../core/services/game/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameModes } from '../../../core/enums/game-modes.enum';

@Component({
  selector: 'app-rules',
  standalone: true,
  imports: [],
  templateUrl: './rules.component.html',
  styleUrl: './rules.component.scss',
})
export class RulesComponent implements OnInit {
  private _gameService = inject(GameService);

  private _elementRef = inject(ElementRef);

  protected gameMode = toSignal(this._gameService.gameModes$);
  protected rulesImg = computed(() =>
    this.gameMode() == GameModes['5-based']
      ? '/images/image-rules-bonus.svg'
      : '/images/image-rules.svg'
  );

  ngOnInit(): void {
    const rulesBtn = this._elementRef.nativeElement.querySelector('#rules-btn');
    gsap.from(rulesBtn, {
      opacity: 0,
    });
  }

  openRules() {
    const rules = this._elementRef.nativeElement.querySelector('#rules');
    gsap.fromTo(
      rules,
      {
        opacity: 0,
      },
      {
        opacity: 1,
        pointerEvents: 'auto',
        duration: '0.2',
      }
    );
  }

  closeRules() {
    const rules = this._elementRef.nativeElement.querySelector('#rules');
    gsap.to(rules, {
      pointerEvents: 'none',
      opacity: 0,
      duration: '0.2',
    });
  }
}
