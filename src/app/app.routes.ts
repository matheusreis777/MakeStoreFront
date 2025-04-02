import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'login', 
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./areas/login/login.routes').then((m) => m.LOGIN_ROUTES),
  },
];
