import { Component, inject } from '@angular/core';
import { SelectPlayerButtonComponent } from '../../../../shared/components/select-player-button/select-player-button.component';
import { PlayerSelections } from '../../../../core/enums/player-selection.enum';
import { GameService } from '../../../../core/services/game/game.service';

@Component({
  selector: 'app-game-selection',
  standalone: true,
  imports: [SelectPlayerButtonComponent],
  templateUrl: './game-selection.component.html',
  styleUrl: './game-selection.component.scss'
})
export class GameSelectionComponent {

  private _gameService = inject(GameService);

  protected gameTypes = PlayerSelections;

  playerSelect(player: PlayerSelections) {
    this._gameService.player.setPlayerSelect(player);
  }  
}
