import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public isUserLogged$;

  constructor(private authService: AuthService) {}

  public ngOnInit() {
    this.isUserLogged$ = this.authService.isUserLogged$;
  }

  public logout() {
    this.authService.logOut();
  }
}
