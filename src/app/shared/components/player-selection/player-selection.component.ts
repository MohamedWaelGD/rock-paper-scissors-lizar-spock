import { Component, effect, ElementRef, inject, input } from '@angular/core';
import { PlayerSelections } from '../../../core/enums/player-selection.enum';
import gsap from 'gsap';

@Component({
  selector: 'app-player-selection',
  standalone: true,
  imports: [],
  templateUrl: './player-selection.component.html',
  styleUrl: './player-selection.component.scss',
})
export class PlayerSelectionComponent {
  public type = input.required<PlayerSelections | null>();
  public showBubbles = input(false);

  private _elementRef = inject(ElementRef);

  constructor() {
    effect(() => {
      if (this.type()) {
        gsap.from(this._elementRef.nativeElement, {
          opacity: 0,
          duration: 0.5,
        });
      }
    });

    effect(() => {
      const bubble1 = this._elementRef.nativeElement.querySelector('#bubble-1');
      const bubble2 = this._elementRef.nativeElement.querySelector('#bubble-2');
      const bubble3 = this._elementRef.nativeElement.querySelector('#bubble-3');
      if (this.showBubbles()) {
        const tl = gsap.timeline();
        tl.from(bubble1, {
          scale: 0,
          duration: 0.2,
          ease: 'power1.out'
        });
        tl.from(bubble2, {
          scale: 0,
          duration: 0.2,
          ease: 'power1.out'
        }, "-=0.15");
        tl.from(bubble3, {
          scale: 0,
          duration: 0.2,
          ease: 'power1.out'
        }, "-0.2");
        gsap.fromTo(this._elementRef.nativeElement, {
          filter: 'brightness(1)'
        }, {
          filter: 'brightness(1.2)',
          duration: 0.2
        })
      }
    })
  }

  protected image() {
    return `/images/icon-${this.type()}.svg`;
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
