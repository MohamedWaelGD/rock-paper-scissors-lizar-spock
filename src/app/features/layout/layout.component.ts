import { Component, effect, inject, OnInit } from '@angular/core';
import { HeaderScoreComponent } from "./components/header-score/header-score.component";
import { GameSelectionComponent } from "./components/game-selection/game-selection.component";
import { GameService } from '../../core/services/game/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameStates } from '../../core/enums/game-state.enum';
import { GamePlayComponent } from "./components/game-play/game-play.component";
import { RulesComponent } from "../../shared/components/rules/rules.component";
import { GameModeSwitcherComponent } from "../../shared/components/game-mode-switcher/game-mode-switcher.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderScoreComponent, GameSelectionComponent, GamePlayComponent, RulesComponent, GameModeSwitcherComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

  private _gameService = inject(GameService);

  protected playerSelection = toSignal(this._gameService.player.playerSelected$);
  protected aiSelection = toSignal(this._gameService.ai.playerSelected$);
  protected gameState = toSignal(this._gameService.gameState$);

  protected gameStates = GameStates;

  constructor() {
    effect(() => {
      if (this.gameState() == GameStates.aiSelectState) {
        
      } 
    })
  }

  resetGame() {
    this._gameService.resetPlayer();
  }

}
