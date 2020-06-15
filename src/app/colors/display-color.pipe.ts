/**
 * Pipe służący do wyświetlenia obiektu typu `Color` w postaci tekstu.
 * Dzięki wykorzystaniu tego Pipe, możemy wyświetlić dowolną zawartość zamiast
 * standardowego `[object Object]`
 */
import { Pipe, PipeTransform } from '@angular/core';
import { Color } from './model/color';

/**
 * Dekorator `Pipe` przyjmuje w obiekcie konfiguracyjnym
 * jedno pole deklarujące nazwę pod jaką dany Pipe będzie wykorzystywany w kodzie
 */
@Pipe({
  name: 'displayColor',
})
export class DisplayColorPipe implements PipeTransform {
  /**
   * Metoda `transform` spełniająca interface `PipeTransform` deklaruje logikę,
   * służącą do konwersji wartości wejściowej (argument funkcji),
   * na dowolną wartość tekstową.
   */
  public transform(value: Color): string {
    if (value !== undefined) {
      return `${value.name} (color of the year ${value.year})`;
    } else {
      return '';
    }
  }
}
