import { Pipe, PipeTransform } from '@angular/core';
import { Color } from './model/color';
import { unescape } from 'querystring';

@Pipe({
  name: 'displayColor'
})
export class DisplayColorPipe implements PipeTransform {

  transform(value: Color): string {
    if (value !== undefined) {
      return `${value.name} (color of the year ${value.year})`;
    } else {
      return '';
    }
  }

}
