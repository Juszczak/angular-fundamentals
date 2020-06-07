import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  public lang = new FormControl('pl');

  constructor(
    private title: Title,
    private translateService: TranslateService,
    private snackBar: MatSnackBar,
  ) {}

  public ngOnInit(): void {
    this.lang.valueChanges.subscribe((lang) => {
      this.translateService.use(lang);
    });

    this.translateService.onLangChange.subscribe((lang) => {
      this.snackBar.open(lang.lang);
    });
  }
}
