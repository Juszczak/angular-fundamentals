import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PageTitleService } from './page-title.service';

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
  ) {}

  public ngOnInit() {
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
