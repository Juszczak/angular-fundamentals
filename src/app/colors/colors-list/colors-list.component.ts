import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ColorsService } from '../colors.service';
import { Color } from '../model/color';

@Component({
  selector: 'app-colors-list',
  templateUrl: './colors-list.component.html',
  styleUrls: ['./colors-list.component.scss'],
})
export class ColorsListComponent implements OnInit {
  public colors: Color[];
  public highlight = true;

  constructor(private colorsService: ColorsService, private title: Title) {}

  /**
   * Pobranie listy kolorów poprzez wywołanie metody serwisu i przypisanie do pola w klasie.
   */
  async ngOnInit(): Promise<void> {
    this.colors = await this.colorsService.getColors();
  }

  /**
   * Metoda zamieniająca wartości pola `highlight` na `true` bądź `false`
   */
  public toggle(): void {
    this.highlight = !this.highlight;
  }
}
