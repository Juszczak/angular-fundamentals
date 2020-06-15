/**
 * Serwis służący do ustawiania tytułu strony w tagu `<title>`, wykorzystujący usługę Angulara o nazwie `Title`.
 */
import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

/** Każdy Serwis wykorzystuje dekorator `Injectable`, informujący mechanizm Dependency Injection o tym,
 * że dana klasa może zostać wstrzyknięta w konstruktorze innych klas jako ich zależność.
 */
@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  /**
   * Pole zawierające tytuły dla wybranych ścieżek aplikacji.
   * Jest to obiekt, którego zarówno kluczami jak i wartościamy są stringi.
   */
  private titles: Record<string, string> = {
    '/auth/login': 'Log in',
    '/about': 'About',
    '/home': 'Home',
  };

  /** Konstruktor klasy z wstrzykniętą zależnością typu `Title` */
  constructor(private title: Title) {}

  /**
   * Metoda set title na podstawie przekazanej ścieżki ustawia tytuł strony poprzez metodę o tej samej nazwie na obiekcie `title`.
   */
  public setTitle(url: string) {
    const title = this.getTitleByUrl(url); /* pobranie wartości na podstawie przekazanego argumentu `url` */
    /**
     * Ustawienie wartości w zależności od zmiennej `title`:
     * - jeśli zmienna title posiada wartość, ustawiana jest ona wraz z częścią wspólną `Angular Fundamentals`
     * - jeśli zmienna nie posiada wartości (jest pustym stringiem) ustawiana jest tylko wartość `Angular Fundamentals`
     */
    this.title.setTitle(`${title ? title + ' - ' : ''}Angular Fundamentals`);
  }

  /**
   * Metoda zwracająca wartość z pola `titles` na podstawie przekazanego argumentu z pustym stringiem jako wartością domyślną.
   */
  private getTitleByUrl(url: string) {
    return this.titles[url] ?? '';
  }
}
