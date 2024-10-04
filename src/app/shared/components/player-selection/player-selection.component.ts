import { Component, input } from '@angular/core';
import { PlayerSelections } from '../../../core/enums/player-selection.enum';

@Component({
  selector: 'app-player-selection',
  standalone: true,
  imports: [],
  templateUrl: './player-selection.component.html',
  styleUrl: './player-selection.component.scss'
})
export class PlayerSelectionComponent {
  public type = input.required<PlayerSelections | null>();
  public showBubbles = input(false);

  protected image() {
    return `/images/icon-${this.type()}.svg`
  }

  protected bgColor() {
    switch (this.type()) {
      case PlayerSelections.scissors:
        return 'bg-primary-scissors';
      case PlayerSelections.rock:
        return 'bg-primary-rock';
      case PlayerSelections.spock:
        return 'bg-primary-spock';
      case PlayerSelections.paper:
        return 'bg-primary-paper';
      case PlayerSelections.lizard:
        return 'bg-primary-lizard';
      default:
        return 'bg-white';
    }
  }

  protected bgBorderColor() {
    switch (this.type()) {
      case PlayerSelections.scissors:
        return 'border-primary-scissors-dark';
      case PlayerSelections.rock:
        return 'border-primary-rock-dark';
      case PlayerSelections.spock:
        return 'border-primary-spock-dark';
      case PlayerSelections.paper:
        return 'border-primary-paper-dark';
      case PlayerSelections.lizard:
        return 'border-primary-lizard-dark';
      default:
        return 'border-white-dark';
    }
  }
}
