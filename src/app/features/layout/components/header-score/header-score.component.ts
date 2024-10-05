import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { GameService } from '../../../../core/services/game/game.service';
import gsap from 'gsap';

@Component({
  selector: 'app-header-score',
  standalone: true,
  imports: [],
  templateUrl: './header-score.component.html',
  styleUrl: './header-score.component.scss'
})
export class HeaderScoreComponent implements OnInit {

  protected score = toSignal(inject(GameService).score$);
  private _elementRef = inject(ElementRef);

  ngOnInit(): void {
    gsap.from(this._elementRef.nativeElement, {
      y: -500,
      opacity: 0,
      duration: 0.8
    });
  }
}
