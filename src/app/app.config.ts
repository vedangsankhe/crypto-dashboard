import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';


import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
  provideRouter(routes),
  provideHttpClient(
    withInterceptors([httpInterceptor])
  )
]
};
