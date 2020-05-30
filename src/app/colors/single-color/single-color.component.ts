import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-color',
  templateUrl: './single-color.component.html',
  styleUrls: ['./single-color.component.scss']
})
export class SingleColorComponent implements OnInit {
  public colorName: string;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    this.colorName = id;
  }

}
