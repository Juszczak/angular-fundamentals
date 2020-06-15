/**
 * Dyrektywa służąca do zmiany koloru tła na podstawie wartości wejściowych oraz interakcji użytkownika
 */
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
  /**
   * Poprzez dekorator `Input` możliwe jest bindowanie wartości do danego komponentu czy dyrektywy.
   * Wartości są ustawiane podczas pierwszego wywołania hooka `ngOnChanges`,
   * które następuje tuż przez wywołaniem `ngOnInit`
   */
  @Input() public highlightColor = 'yellow';
  @Input() public highlightAlways: boolean;

  /**
   * Dekorator `HostListener` pozwala na przypinanie Event Listenerów na element będący hostem danej dyrektywy,
   * bądź taga komponentu, w którym jest użyty.
   */
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

  /**
   * Hook `ngOnChanges`, wywoływany jest za każdym razem gdy wartość dodolnego pola z dekoratorem `Input`,
   * zostanie zmieniona na zewnątrz komponentu. Pozwala na obsługę zmian na podstawie nowych danych wejściowych.
   */
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
