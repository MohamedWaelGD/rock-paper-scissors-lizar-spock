import { Component, computed, effect, inject, output, signal } from '@angular/core';
import { PlayerSelectionComponent } from '../../../../shared/components/player-selection/player-selection.component';
import { GameService } from '../../../../core/services/game/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameStates } from '../../../../core/enums/game-state.enum';

export enum MatchResult {
  playerWin = 'win',
  draw = 'draw',
  playerLose = 'lose',
}

@Component({
  selector: 'app-game-play',
  standalone: true,
  imports: [PlayerSelectionComponent],
  templateUrl: './game-play.component.html',
  styleUrl: './game-play.component.scss',
})
export class GamePlayComponent {
  private _gameService = inject(GameService);

  protected playerSelection = toSignal(
    this._gameService.player.playerSelected$
  );
  protected aiSelection = toSignal(this._gameService.ai.playerSelected$);

  protected gameState = toSignal(this._gameService.gameState$);
  protected matchResult = toSignal(this._gameService.gameResult$);
  protected showMatchResult = signal(false);
  protected matchResultState = computed(() => {
    if (this.gameState() == GameStates.endGameState) {
      if (this.matchResult() == 0) return MatchResult.draw;
      else if (this.matchResult() == 1) return MatchResult.playerWin;
      else return MatchResult.playerLose;
    }

    return null;
  });
  protected matchResults = MatchResult;
  
  public palyAgain = output();

  constructor() {
    effect(() => {
      if (this.gameState() == GameStates.endGameState) {
        this.showMatchResult.set(true);
      }
    }, {
      'allowSignalWrites': true
    });
  }
}
