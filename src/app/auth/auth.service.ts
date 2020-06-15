/**
 * Serwis autoryzacji, wykorzystujący klasę `HttpClient` do komunikacji z zewnętrznym API protokołem HTTP.
 */
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
  /**
   * Prywatne, statyczne stałe przechowujące informacje wykorzystywane wielokrotnie wewnątrz danej klasy.
   */
  private static readonly API_URL = 'https://reqres.in/api'; /* Adres URL zewnętrznego API */
  private static readonly STORAGE_KEY = 'session-token'; /* Klucz pod którym Token sesyjny jest zapisywany w Session Storage */

  /**
   * Strumień emitujący wartości w przypadku zmiany statusu autoryzacji użytkownika.
   * Wykorzystana klasa `BehaviorSubject` pozwala na ustawienie wartości początkowej,
   * a także pozwala na wyemitowanie ostatniej zapisanej wartości w momencie subskrypcji w dowolnym miejscu w aplikacji.
   *
   * W przypadku użycia strumienia typu `Subject` nie byłoby możliwe ustawienie wartości początkowej,
   * a kolejne wartości emitowane były by tylko w momencie kolejnego wywołania metody `next` na obiekcie strumienia.
   */
  public isUserLogged$: BehaviorSubject<boolean> = new BehaviorSubject(
    this.isUserLogged(),
  );

  constructor(private httpClient: HttpClient, private router: Router) {}

  /**
   * Metoda wysyłająca zapytanie HTTP, która zwraca Promise.
   */
  public registerUser(user: AuthUser): Promise<unknown> {
    return this.httpClient
      .post(AuthService.API_URL + '/register', user)
      .toPromise();
  }

  /**
   * Metoda wysyłająca zapytanie HTTP, która zwraca obiekt, będący strumieniem typu `Observable`
   */
  public loginUser(user: AuthUser): Observable<AuthResponse> {
    return this.httpClient
      .post<AuthResponse>(AuthService.API_URL + '/login', user)
      .pipe(
        /**
         * Operator `tap` pozwala na wykonanie _efektu ubocznego_, bez zmiany wartości emitowanych przez strumień;
         * W tym przypadku wykorzyswany do zapisania wartości tokenu sesyjnego
         * oraz wyemitowania nowej wartości na strumień `isUserLogged$`
         */
        tap((response: AuthResponse) => {
          if (response.token) {
            sessionStorage.setItem(AuthService.STORAGE_KEY, response.token);
            this.isUserLogged$.next(true);
          }
        }),

        /**
         * Operator `catchError` pozwala na obsługę błędów podczas wykonywania zapytań HTTP.
         * Argumentem funkcji wywołania zwrotnego dla tego operatora jest błąd który wystąpił.
         * Funkcja ta powinna również zwrócić strumień danych – w tym przypadku poprzez wywołanie funkcji `of`,
         * utworzony jest strumień, który jeden raz wyemituje wartość przekazaną mu jako argument.
         */
        catchError((errorReponse) => {
          this.isUserLogged$.next(false);
          return of(errorReponse.error);
        }),
      );
  }

  /**
   * Metoda służąca do odczytania zawartości Session Storage pod kluczem zdefiniowanym w statycznej stałej.
   */
  public isUserLogged(): boolean {
    return !!sessionStorage.getItem(AuthService.STORAGE_KEY);
  }

  /**
   * Metoda służąca do kasowania sesji użytkownika.
   * Kasuje ona klucz w Session Storage, następnie ustawia nową wartość na strumieniu `isUserLogged$`,
   * po czym przekierowuje użytkownika na stronę główną.
   */
  public logOut() {
    sessionStorage.removeItem(AuthService.STORAGE_KEY);
    this.isUserLogged$.next(false);
    this.router.navigateByUrl('/');
  }
}
