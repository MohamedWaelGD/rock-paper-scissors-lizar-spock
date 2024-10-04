import { BehaviorSubject } from 'rxjs';
import { PlayerSelections } from '../enums/player-selection.enum';

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

  randomSelect() {
    const allGamePlays = Object.values(PlayerSelections);
    const randomIndex = Math.floor(Math.random() * allGamePlays.length);
    this.setPlayerSelect(allGamePlays[randomIndex]);
  }
}
