import { AfterContentInit, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';
import { PageTitleService } from './page-title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterContentInit {
  public isUserLogged$;

  constructor(
    private authService: AuthService,
    private router: Router,
    private pageTitleService: PageTitleService,
    private translateService: TranslateService,
  ) {}

  public ngOnInit() {
    this.translateService.setDefaultLang('pl');

    this.isUserLogged$ = this.authService.isUserLogged$;

    const routerEvents$ = this.router.events;

    routerEvents$
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.pageTitleService.setTitle(event.url);
      });
  }

  public ngAfterContentInit(): void {}

  public logout() {
    this.authService.logOut();
  }
}
