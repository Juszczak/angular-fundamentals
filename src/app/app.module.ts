/**
 * Główny moduł aplikacji deklarujący komponenty głównego poziomu,
 * oraz importujący zależności dla całej aplikacji.
 */
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  /* Deklaracja komponentów danego modułu (UWAGA! Każda z klas musi zostać zaimportowana na górze pliku) */
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    SettingsComponent,
  ],
  /* Moduły importowane przez moduł (UWAGA! Każda z klas musi zostać zaimportowana na górze pliku) */
  imports: [
    /* Bazowe moduły Angulara */
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,

    /* Moduł z deklaracjami ścieżek aplikacji */
    AppRoutingModule,

    /* Moduł animacji wykorzystywany przez Angular Material */
    BrowserAnimationsModule,

    /* Moduły komponentów Angular Material */
    MatToolbarModule,
    MatButtonModule,
    MatSelectModule,
    MatSnackBarModule,

    /* Moduł tłumaczeń z biblioteki `ngx-translate` */
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      defaultLanguage: 'pl',
    }),
  ],
  providers: [],
  /**
   * Główny moduł aplikacji deklaruje pole `bootstrap`, informujące o komponencie,
   * który ma zostać użyty w przypadku przekazania tego modułu do metody `bootstrapModule`
   * > (zobacz plik ../main.ts)
   */
  bootstrap: [AppComponent],
})
export class AppModule {}
