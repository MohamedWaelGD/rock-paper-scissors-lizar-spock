import { Component, computed, inject } from '@angular/core';
import { GameService } from '../../../core/services/game/game.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameModes } from '../../../core/enums/game-modes.enum';

@Component({
  selector: 'app-game-mode-switcher',
  standalone: true,
  imports: [],
  templateUrl: './game-mode-switcher.component.html',
  styleUrl: './game-mode-switcher.component.scss',
})
export class GameModeSwitcherComponent {
  private _gameService = inject(GameService);

  protected gameMode = toSignal(this._gameService.gameModes$);
  protected btnMessage = computed(() => {
    if (this.gameMode() == GameModes['3-based']) return '3 Based Mode';

    return '5 Based Mode';
  });

  toggleGameMode() {
    this._gameService.toggleGameMode();
  }
}
