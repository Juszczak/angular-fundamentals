/**
 * Serwis typu Guard, służący do zabezpieczania pewnych ścieżek aplikacji.
 * Serwis implementuje interfejs `CanActivate`, który zabezpiecza możliwość przejścia na wskazaną ścieżkę.
 */
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Implementacja metody `canActivate` spełniającej interfejs `CanActivate`.
   * Metoda ta w pierwszym kroku ustawia wartość zmiennej `isUserLogged`,
   * bazując na informacji pobranej z wstrzykniętego serwisu typu AuthService.
   * Jeśli używkownik jest zalogowany metoda zwraca wartość `true`,
   * która informuje Router o pozwoleniu na przejście pod wskazany adres.
   * W przeciwnym wypadku, metoda zwraca obiekt typu `UrlTree`,
   * skonstruowany przez metodę `parseUrl`,
   * która przekierowuje użytkownika pod inny adres.
   */
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isUserLogged = this.authService.isUserLogged();
    return isUserLogged ? true : this.router.parseUrl('/auth/login');
  }
}
