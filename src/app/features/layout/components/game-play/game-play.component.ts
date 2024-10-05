import { Component, computed, effect, inject, OnInit, output, signal } from '@angular/core';
import { PlayerSelectionComponent } from '../../../../shared/components/player-selection/player-selection.component';
import { GameService } from '../../../../core/services/game/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameStates } from '../../../../core/enums/game-state.enum';
import { MatchResult } from '../../../../core/enums/match-result.enum';
import gsap from 'gsap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-play',
  standalone: true,
  imports: [PlayerSelectionComponent, CommonModule],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent implements OnInit {
  private _gameService = inject(GameService);

  protected playerSelection = toSignal(
    this._gameService.player.playerSelected$
  );
  protected aiSelection = toSignal(this._gameService.ai.playerSelected$);

  protected gameState = toSignal(this._gameService.gameState$);
  protected matchResult = toSignal(this._gameService.lastGameResult$);
  protected showMatchResult = signal(false);
  protected matchResultState = computed(() => {
    if (this.gameState() == GameStates.endGameState) {
      return this._gameService.matchResult;
    }

    return null;
  });
  protected matchResults = MatchResult;
  
  public palyAgain = output();

  constructor() {
    effect(() => {
      if (this.gameState() == GameStates.endGameState) {
        this.showMatchResult.set(true);
        const scorePc = document.querySelector('#score-pc');
        const scoreMobile = document.querySelector('#score-mobile');
        gsap.fromTo(scorePc, {
          width: 0,
          opacity: 0
        }, {
          width: 'auto',
          opacity: 1,
          duration: 1,
        });
        gsap.fromTo(scoreMobile, {
          opacity: 0
        }, {
          opacity: 1,
          duration: 1,
        });
      }
    }, {
      'allowSignalWrites': true
    });
  }

  ngOnInit(): void {
    this.animate();
  }

  animate() {
    const youPicked = document.querySelector(`#you-picked`);
    const player = document.querySelector(`#player`);
    const housePicked = document.querySelector(`#house-picked`);
    const ai = document.querySelector(`#ai`);

    const tlPlayer = gsap.timeline();
    tlPlayer.from(youPicked, {
      opacity: 0,
      x: -50,
      duration: 0.5
    })
    tlPlayer.from(player, {
      opacity: 0,
      x: -50,
      duration: 0.5
    })

    const tlAi = gsap.timeline();
    tlAi.from(housePicked, {
      opacity: 0,
      x: 50,
      duration: 0.5
    })
    tlAi.from(ai, {
      opacity: 0,
      x: 50,
      duration: 0.5
    })
  }
}
