import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, of, Subject } from 'rxjs';
import { Player } from '../../classes/player.class';
import { GameStates } from '../../enums/game-state.enum';
import { PlayerSelections } from '../../enums/player-selection.enum';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private AI_WAIT_TIME_MS = 1000;
  private RESULT_WAIT_TIME_MS = 500;
  private _humanPlayer = new BehaviorSubject<Player>(new Player());
  private _aiPlayer = new BehaviorSubject<Player>(new Player());
  private _score = new BehaviorSubject<number>(0);
  private _gameState = new BehaviorSubject<GameStates>(
    GameStates.playerSelectState
  );
  private _gameResult = new Subject<number>();

  get player() {
    return this._humanPlayer.value;
  }

  get ai() {
    return this._aiPlayer.value;
  }

  get gameState() {
    return this._gameState.value;
  }

  get gameState$() {
    return this._gameState.asObservable();
  }

  get gameResult$() {
    return this._gameResult.asObservable();
  }

  get score$() {
    return this._score.asObservable();
  }

  constructor() {
    this.player.playerSelected$.subscribe((playerSelection) => {
      if (playerSelection) {
        this._gameState.next(GameStates.aiSelectState);
        setTimeout(() => {
          this._aiPlayer.value.randomSelect();

          setTimeout(() => {
            this._gameState.next(GameStates.endGameState);
            const matchResult = this.checkPlayerMatch();
            const newScore = this._score.value + matchResult;
            this._score.next(newScore >= 0 ? newScore : 0);
            this._gameResult.next(matchResult);
          }, this.RESULT_WAIT_TIME_MS);
        }, this.AI_WAIT_TIME_MS);
      }
    });
  }

  private checkPlayerMatch() {
    const aiPlay = this.ai.playerSelected;
    if (this.player.playerSelected == aiPlay) return 0;

    switch (this.player.playerSelected) {
      case PlayerSelections.scissors:
        if (
          aiPlay == PlayerSelections.paper ||
          aiPlay == PlayerSelections.lizard
        )
          return 1;
        else if (
          aiPlay == PlayerSelections.spock ||
          aiPlay == PlayerSelections.rock
        )
          return -1;
        break;

      case PlayerSelections.paper:
        if (aiPlay == PlayerSelections.rock || aiPlay == PlayerSelections.spock)
          return 1;
        else if (
          aiPlay == PlayerSelections.scissors ||
          aiPlay == PlayerSelections.lizard
        )
          return -1;
        break;

      case PlayerSelections.rock:
        if (
          aiPlay == PlayerSelections.lizard ||
          aiPlay == PlayerSelections.scissors
        )
          return 1;
        else if (
          aiPlay == PlayerSelections.paper ||
          aiPlay == PlayerSelections.spock
        )
          return -1;
        break;

      case PlayerSelections.lizard:
        if (
          aiPlay == PlayerSelections.spock ||
          aiPlay == PlayerSelections.paper
        )
          return 1;
        else if (
          aiPlay == PlayerSelections.scissors ||
          aiPlay == PlayerSelections.rock
        )
          return -1;
        break;

      case PlayerSelections.spock:
        if (
          aiPlay == PlayerSelections.scissors ||
          aiPlay == PlayerSelections.rock
        )
          return 1;
        else if (
          aiPlay == PlayerSelections.paper ||
          aiPlay == PlayerSelections.lizard
        )
          return -1;
        break;
    }

    return 0;
  }

  resetPlayer() {
    this.player.resetPlayerSelect();
    this.ai.resetPlayerSelect();
    this._gameState.next(GameStates.playerSelectState);
  }
}
