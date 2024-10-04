import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../../../core/services/game/game.service';

@Component({
  selector: 'app-header-score',
  standalone: true,
  imports: [],
  templateUrl: './header-score.component.html',
  styleUrl: './header-score.component.scss'
})
export class HeaderScoreComponent {

  protected score = toSignal(inject(GameService).score$);

}
