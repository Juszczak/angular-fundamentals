import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorsService } from '../colors.service';
import { Color } from '../model/color';

@Component({
  selector: 'app-single-color',
  templateUrl: './single-color.component.html',
  styleUrls: ['./single-color.component.scss']
})
export class SingleColorComponent implements OnInit {
  public color: Color;

  constructor(private activatedRoute: ActivatedRoute, private colorsService: ColorsService) {
  }

  async ngOnInit(): Promise<void> {
    console.log(this.activatedRoute.snapshot.params);
    const id: string = this.activatedRoute.snapshot.params.id;
    const colorId: number = Number.parseInt(id, 10);
    // "123" -> 123
    // "1" -> 1

    this.color = await this.colorsService.getSingleColor(colorId);
  }

}
