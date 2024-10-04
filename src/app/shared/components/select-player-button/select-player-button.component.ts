import { Component, input, output } from '@angular/core';
import { PlayerSelections } from '../../../core/enums/player-selection.enum';
import { PlayerSelectionComponent } from "../player-selection/player-selection.component";

@Component({
  selector: 'app-select-player-button',
  standalone: true,
  imports: [PlayerSelectionComponent],
  templateUrl: './select-player-button.component.html',
  styleUrl: './select-player-button.component.scss',
})
export class SelectPlayerButtonComponent {
  public type = input.required<PlayerSelections>();
  public selectPlayer = output<PlayerSelections>();
}
