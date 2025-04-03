import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { appRoutes } from './app.routes';
import { StorageService } from './shared/services/storage.service';
import { importProvidersFrom } from '@angular/core';
import { BlockUIModule } from 'ng-block-ui';
import { BlockUIHttpModule } from 'ng-block-ui/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(appRoutes),
    provideClientHydration(withEventReplay()),
    provideAnimations(), 
    provideToastr(), 
    StorageService,
    importProvidersFrom(
      BlockUIModule.forRoot({
        delayStart: 1, // Tempo antes de iniciar o bloqueio (ms)
        delayStop: 500 // Tempo antes de parar o bloqueio (ms)
      }),
      BlockUIHttpModule.forRoot({
        blockAllRequestsInProgress: true // Bloqueia todas as requisições HTTP automaticamente
      })
    )
  ],
};
