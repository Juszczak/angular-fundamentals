/**
 * Moduł Routingu aplikacji, deklarujący zachowanie dla poszczególnych ścieżek.
 */
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from './auth.guard';

/**
 * Deklaracja ścieżek aplikacji – tablica obiektów typu `Route`
 */
const routes: Routes = [
  /**
   * W przypadku komponentów zadeklarowanych na tym samym poziomie,
   * możliwe jest ich wyświetlenie poprzez pole `component`
   */
  {
    path: 'home', /* deklaracja ścieżki */
    component: HomeComponent, /* deklaracja komponentu */
  },
  {
    path: 'about',
    component: AboutComponent,
  },

  /* Przekierowanie pustej ścieżki.na adres /home */
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },


  /* Lazy loading. Zamiast konkretnego komponentu ścieżka deklaruje asynchroniczny import innego modułu */
  {
    path: 'colors',
    loadChildren: () =>
      import('./colors/colors.module').then((m) => m.ColorsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },

  /**
   * Ścieżka zabezpieczona poprzez Route Guard.
   * Pole `canActivate` przyjmuje tablicę serwisów implementujących interfejs `CanActivate`
   */
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard],
  }
];

/**
 * W dekoratorze modułu importowany jest moduł Routera Angulara z przekazanymi w metodzie `forRoot` ścieżkami ze zmiennej `routes`
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
