import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
// import { provideStore } from '@ngrx/store';
// import { reducers, metaReducers } from './reducers';
// import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync(), 
    // provideStore(reducers, { metaReducers }), 
    // provideEffects(), 
    // provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient(),
    importProvidersFrom(SweetAlert2Module.forRoot()),]
};
