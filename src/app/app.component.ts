/**
 * Wejściowy komponent aplikacji zawierający nawigację dostępną w całej aplikacji oraz <router-outlet> najwyższego poziomu.
 */
import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { PageTitleService } from './page-title.service';
import { Observable } from 'rxjs';

/**
 * Dekorator komponentu deklaruje jego `selector`, czyli nowy tag HTML,
 * oraz ścieżki do jego szablonu HTML oraz pliku ze stylami
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {

  /* Deklaracja strumienia z informacją o statusie autoryzacji użytkownika */
  public isUserLogged$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private pageTitleService: PageTitleService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit() {
    /* Ustawienie domyslnego języka przez metodę Serwisu Tranclacji */
    this.translateService.setDefaultLang('pl');

    /* Przypisanie wartości pola `isUserLogged$` na podstawie strumienia z Serwisu Autoryzacji */
    this.isUserLogged$ = this.authService.isUserLogged$;

    /* Zmienna pomocnicza będąca strumieniem wydarzeń Routera */
    const routerEvents$ = this.router.events;

    /**
     * Metoda `pipe` na strumieniu pozwala na wykorzystanie operatorów rxjs,
     * w celu zarządzania wartościami emitowanymi przez dany strumień.
     */
    routerEvents$
      .pipe(
        /**
         * Operator `filter` podobnie jak metoda `filter` na tablicach pozwala na przefiltowanie wszystkich wydarzeń
         * bazując na przekazanym wyrażeniu. W tym przypadku pozostawione zostanę tylko obiekty będące instancją klasy `NavigationEnd`.
         */
        filter((event) => event instanceof NavigationEnd),
      )
      /**
       * Metoda `subscribe` na strumieniach pozwala na zasubskrybowanie się na końcowe wydarzenia.
       */
      .subscribe((event: NavigationEnd) => {
        /* W metodzie subscribe wywoływana jest metoda `setTitle`, której argumentem jest pole `url` z otrzymanego Eventu */
        this.pageTitleService.setTitle(event.url);
      });
  }

  public ngAfterContentInit(): void {}

  /**
   * Metoda `logout` kończy sesję użytkownika poprzez wywołanie odpowiedniej metody na obiekcie Serwisu Autoryzacji.
   */
  public logout() {
    this.authService.logOut();
  }
}
