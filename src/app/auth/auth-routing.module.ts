import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';

/**
 * Wewnętrzny routing modułu `AuthModule`
 * Ścieżki deklarowane poniżej dotyczą podścieżki /auth, na przykład:
 * - zadeklarowana poniżej pusta ścieżka odności się do `/auth`
 * - zadeklarowane poniżej ścieżka `register` to `/auth/register`
 */
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'register',
        /**
         * Różne sposoby asynchronicznego ładowania elementów:
         * Poniższe zapisy są równoważne.
         *
         * 1.
         *
         * loadChildren: () => import('./register/register.module')
         *  .then(m => m.RegisterModule),
         *
         * 2.
         * loadChildren: () => import('./register/register.module')
         *  .then((importedModule) => importedModule.RegisterModule)
         *
         * 3.
         */
        loadChildren: () => {
          const importedModulePromise = import('./register/register.module');
          return importedModulePromise.then(
            (importedModule) => importedModule.RegisterModule,
          );
        },
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
