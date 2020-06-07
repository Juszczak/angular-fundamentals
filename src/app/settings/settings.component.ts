import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private title: Title) { }

  public ngOnInit(): void {
    /* this.title.setTitle('Angular Fundamentals - Settings'); */
  }

}
