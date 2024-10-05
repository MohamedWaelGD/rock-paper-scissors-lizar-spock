import { BehaviorSubject } from 'rxjs';
import { PlayerSelections } from '../enums/player-selection.enum';
import { GameModes } from '../enums/game-modes.enum';

export class Player {
  private _playerSelected = new BehaviorSubject<PlayerSelections | null>(null);

  get playerSelected() {
    return this._playerSelected.value;
  }

  get playerSelected$() {
    return this._playerSelected.asObservable();
  }

  setPlayerSelect(player: PlayerSelections) {
    this._playerSelected.next(player);
  }

  resetPlayerSelect() {
    this._playerSelected.next(null);
  }

  randomSelect(gameMode: GameModes) {
    const allGamePlays = Object.values(PlayerSelections);
    const randomIndex5Based = Math.floor(Math.random() * allGamePlays.length);
    const randomIndex3Based = Math.floor(Math.random() * 3);
    this.setPlayerSelect(allGamePlays[gameMode == GameModes['5-based'] ? randomIndex5Based : randomIndex3Based]);
  }
}
