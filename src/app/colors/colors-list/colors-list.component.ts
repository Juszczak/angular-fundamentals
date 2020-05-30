import {Component, OnInit} from '@angular/core';
import {ColorsService} from '../colors.service';
import {Color} from '../model/color';

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss'],
})
export class ColorsListComponent implements OnInit {
  public colors: Color[];

  constructor(private colorsService: ColorsService) {}

  async ngOnInit(): Promise<void> {
    this.colors = await this.colorsService.getColors();
  }
}
