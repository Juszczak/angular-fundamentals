/**
 * Główny plik wejściowy aplikacji, importujący niezbędne zależności oraz uruchamiający aplikację
 */

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

/**
 * Gdy zmienna środowiskowa ustawiona jest na wartość `true` uruchomiony zostaje tryp produkcyjny aplikacji
 * Tryb produkcyjny wyłącza asercje i inne mechanizmy sprawdzające pomocne podczas tworzenia aplikacji.
 */
if (environment.production) {
  enableProdMode();
}

/**
 * Na obiekcie typu `PlatformRef` zwróconym przez funkcję `platformBrowserDynamic` wywoływana jest metoda `bootstrapModule`,
 * która jako argument przyjmuje typ głównego modułu aplikacji. Metoda `bootstrapModule` jest asynchroniczna,
 * więc zwracany przez nią Promise jest dodatkowo obsługiwany w przypadku wystąpienia błędu podczas uruchamiania aplikacji.
 */
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
