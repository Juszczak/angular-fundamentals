import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ColorsRoutingModule} from './colors-routing.module';
import {ColorsComponent} from './colors.component';
import { ColorsListComponent } from './colors-list/colors-list.component';
import { SingleColorComponent } from './single-color/single-color.component';

@NgModule({
  declarations: [ColorsComponent, ColorsListComponent, SingleColorComponent],
  imports: [CommonModule, ColorsRoutingModule],
})
export class ColorsModule {}
