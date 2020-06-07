import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class PageTitleService {
  private titles = {
    '/auth/login': 'Log in',
    '/about': 'About',
    '/home': 'Home',
  };

  constructor(private title: Title) {}

  public setTitle(url: string) {
    const title = this.getTitleByUrl(url);
    this.title.setTitle(`${title ? title + ' - ' : ''}Angular Fundamentals`);
  }

  private getTitleByUrl(url: string) {
    return this.titles[url] ?? '';
  }
}
