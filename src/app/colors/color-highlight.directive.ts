import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

@Directive({
  selector: '[appColorHighlight]',
})
export class ColorHighlightDirective implements OnInit, OnChanges {
  @Input() public highlightColor = 'yellow';
  @Input() public highlightAlways: boolean;

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.highlightColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (!this.highlightAlways) {
      this.highlight(null);
    }
  }

  constructor(private elementRef: ElementRef) {}

  public highlight(color: string) {
    this.elementRef.nativeElement.style.backgroundColor = color;
  }

  public ngOnInit(): void {
    if (this.highlightAlways) {
      this.highlight(this.highlightColor);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const changeHighlightAlways: SimpleChange = changes.highlightAlways;

    if (changeHighlightAlways) {
      const currentValue: boolean = changeHighlightAlways.currentValue;

      if (currentValue) {
        this.highlight(this.highlightColor);
      } else {
        this.highlight(null);
      }
    }
  }
}
