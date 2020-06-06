import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        // /auth/register
        path: 'register',
        // 1.
        /* loadChildren: () => import('./register/register.module') */
        /*   .then(m => m.RegisterModule), */

        // 2.
        /* loadChildren: () => import('./register/register.module') */
        /*   .then((importedModule) => importedModule.RegisterModule) */

        // 3.
        loadChildren: () => {
          const importedModulePromise = import('./register/register.module');
          return importedModulePromise
            .then((importedModule) => importedModule.RegisterModule);
        }
      },
      {
        path: 'login',
        component: LoginComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
