import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthResponse } from './model/auth-response.interface';
import { AuthUser } from './model/auth-user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private static readonly API_URL = 'https://reqres.in/api';
  private static readonly STORAGE_KEY = 'session-token';

  public isUserLogged$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isUserLogged(),
  );

  constructor(private httpClient: HttpClient, private router: Router) {}

  public registerUser(user: AuthUser): Promise<unknown> {
    return this.httpClient
      .post(AuthService.API_URL + '/register', user)
      .toPromise();
  }

  public loginUser(user: AuthUser): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(AuthService.API_URL + '/login', user)
      .pipe(
        tap((response: AuthResponse) => {
          if (response.token) {
            sessionStorage.setItem(AuthService.STORAGE_KEY, response.token);
            this.isUserLogged$.next(true);
          }
        }),
        catchError((errorReponse) => {
          this.isUserLogged$.next(false);
          return of(errorReponse.error);
        }),
      );
  }

  public isUserLogged(): boolean {
    return !!sessionStorage.getItem(AuthService.STORAGE_KEY);
  }

  public logOut() {
    sessionStorage.removeItem(AuthService.STORAGE_KEY);
    this.isUserLogged$.next(false);
    this.router.navigateByUrl('/');
  }
}
