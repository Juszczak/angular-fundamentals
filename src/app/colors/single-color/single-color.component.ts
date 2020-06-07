import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ColorsService } from '../colors.service';
import { Color } from '../model/color';

@Component({
  selector: 'app-single-color',
  templateUrl: './single-color.component.html',
  styleUrls: ['./single-color.component.scss'],
})
export class SingleColorComponent implements OnInit, OnDestroy {
  public color: Color;
  public errorMessage: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private colorsService: ColorsService,
  ) {}

  async ngOnInit(): Promise<void> {
    const id: string = this.activatedRoute.snapshot.params.id;
    const colorId: number = Number.parseInt(id, 10);
    if (!Number.isNaN(colorId)) {
      this.color = await this.colorsService.getSingleColor(colorId);
      if (this.color === undefined) {
        this.errorMessage = 'No such color';
      }
    } else {
      this.errorMessage = 'Not a valid color ID';
    }
  }

  public ngOnDestroy(): void {}
}
