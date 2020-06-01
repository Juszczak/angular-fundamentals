import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ColorsListComponent } from './colors-list/colors-list.component';
import { ColorsRoutingModule } from './colors-routing.module';
import { ColorsComponent } from './colors.component';
import { DisplayColorPipe } from './display-color.pipe';
import { SingleColorComponent } from './single-color/single-color.component';
import { ColorHighlightDirective } from './color-highlight.directive';

@NgModule({
  declarations: [
    ColorsComponent,
    ColorsListComponent,
    SingleColorComponent,
    DisplayColorPipe,
    ColorHighlightDirective,
  ],
  imports: [CommonModule, ColorsRoutingModule],
  exports: [DisplayColorPipe],
})
export class ColorsModule {}
