import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ColorsComponent} from './colors.component';
import { ColorsListComponent } from './colors-list/colors-list.component';
import { SingleColorComponent } from './single-color/single-color.component';

const routes: Routes = [
  {
    path: '',
    component: ColorsComponent,
    children: [
      {
        path: 'list',
        component: ColorsListComponent,
      },
      {
        path: 'details',
        component: SingleColorComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColorsRoutingModule {}
