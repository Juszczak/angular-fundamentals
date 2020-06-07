import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageTitleService } from './page-title.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isUserLogged$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private pageTitleService: PageTitleService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit() {
    this.translateService.setTranslation('pl', {
      nav: {
        home: 'Strona główna',
        about: 'O mnie',
        colors: 'Kolory',
        settings: 'Ustawienia',
        login: 'Logowanie',
        register: 'Rejestracja',
      }
    });

    this.translateService.setTranslation('en', {
      nav: {
        home: 'Home',
        about: 'About',
        colors: 'Colors',
        settings: 'Settings',
        login: 'Log in',
        register: 'Register',
      }
    });

    this.translateService.setDefaultLang('pl');

    this.isUserLogged$ = this.authService.isUserLogged$;

    const routerEvents$ = this.router.events;

    routerEvents$
      .pipe(
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event: NavigationEnd) => {
        this.pageTitleService.setTitle(event.url);
      });

  }

  public logout() {
    this.authService.logOut();
  }
}
