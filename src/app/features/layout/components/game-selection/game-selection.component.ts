import {
  AfterViewInit,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  viewChild,
  viewChildren,
} from '@angular/core';
import { SelectPlayerButtonComponent } from '../../../../shared/components/select-player-button/select-player-button.component';
import { PlayerSelections } from '../../../../core/enums/player-selection.enum';
import { GameService } from '../../../../core/services/game/game.service';
import { DrawCycleLinesComponent } from '../../../../shared/components/draw-cycle-lines/draw-cycle-lines.component';
import gsap from 'gsap';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameModes } from '../../../../core/enums/game-modes.enum';

@Component({
  selector: 'app-game-selection',
  standalone: true,
  imports: [SelectPlayerButtonComponent, DrawCycleLinesComponent],
  templateUrl: './game-selection.component.html',
  styleUrl: './game-selection.component.scss',
})
export class GameSelectionComponent implements OnInit {
  private _gameService = inject(GameService);
  private _elementRef = inject(ElementRef);
  private _drawCycleLines = viewChild<DrawCycleLinesComponent>('drawCycleLines');

  protected gameMode = toSignal(this._gameService.gameModes$);
  protected gameTypes = PlayerSelections;
  protected isSelecting = false;
  protected is5GameMode = computed(() => this.gameMode() == GameModes['5-based']);

  constructor() {
    effect(() => {
      if (this.gameMode()) {
        setTimeout(() => {
          this._drawCycleLines()?.drawLines();
        })
      }
    })
  }

  ngOnInit(): void {
    gsap.from(this._elementRef.nativeElement, {
      opacity: 0,
      duration: 0.8,
      onUpdate: () => {
        this._drawCycleLines()?.drawLines();
      }
    });
  }

  playerSelect(
    player: PlayerSelections,
    selectButton: SelectPlayerButtonComponent
  ) {
    if (this.isSelecting) return;

    this.isSelecting = true;
    const tl = gsap.timeline();
    tl.to(selectButton.elementRef.nativeElement, {
      scale: 1.5,
      duration: 0.2,
      ease: 'power1.out'
    });
    tl.to(this._elementRef.nativeElement, {
      scale: 0,
      opacity: 0,
      rotate: 360,
      duration: 0.8,
      delay: 0.35,
      ease: 'expo.inOut',
      onComplete: () => {
        this._gameService.player.setPlayerSelect(player);
      },
    });
  }
}
