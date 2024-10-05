import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'app-draw-cycle-lines',
  standalone: true,
  imports: [],
  templateUrl: './draw-cycle-lines.component.html',
  styleUrl: './draw-cycle-lines.component.scss',
})
export class DrawCycleLinesComponent implements AfterViewInit {
  public elementPoints = input.required<string>();

  private _container = inject(ElementRef);

  protected svgLines: { x1: number; x2: number; y1: number; y2: number }[] = [];
  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.drawLines();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawLines();
    })
  }

  drawLines() {
    this.svgLines = [];
    const elementPoints = document.querySelectorAll(`.${this.elementPoints()}`);
    for (let index = 0; index < elementPoints.length; index++) {
      const element: Element = elementPoints[index];
      const start = this.getCenterRelativeContainer(element);
      const nextIndex = index + 1 == elementPoints.length ? 0 : index + 1;
      const end = this.getCenterRelativeContainer(elementPoints[nextIndex]);

      this.svgLines.push({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
      });
    }
  }

  private getCenterRelativeContainer(el: Element) {
    const container = this._container?.nativeElement!;
    const containerReact = container.getBoundingClientRect();
    const react = el.getBoundingClientRect();
    return {
      x: react.left + react.width / 2 - containerReact.left,
      y: react.top + react.height / 2 - containerReact.top - 22,
    };
  }
}
