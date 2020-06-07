import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { AuthUser } from './model/auth-user.interface';
import { AuthResponse } from './model/auth-response.interface';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static readonly API_URL = 'https://reqres.in/api';

  public isUserLogged$: BehaviorSubject<boolean> = new BehaviorSubject(this.isUserLogged());

  constructor(private httpClient: HttpClient, private router: Router) {}

  public registerUser(user: AuthUser): Promise<unknown> {
    return this.httpClient.post(AuthService.API_URL + '/register', user).toPromise();
  }

  public loginUser(user: AuthUser): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(AuthService.API_URL + '/login', user).pipe(
      tap((response: AuthResponse) => {
        if (response.token) {
          sessionStorage.setItem('session-token', response.token);
          this.isUserLogged$.next(true);
        }
      }),
      catchError((errorReponse) => {
        this.isUserLogged$.next(false);
        return of(errorReponse.error);
      })
    );
  }

  public isUserLogged(): boolean {
    return !!sessionStorage.getItem('session-token');
  }

  public logOut() {
    sessionStorage.removeItem('session-token');
    this.isUserLogged$.next(false);
    this.router.navigateByUrl('/');
  }
}
