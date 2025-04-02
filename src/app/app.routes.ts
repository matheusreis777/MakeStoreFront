import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';

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
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./areas/loja/loja.routes').then((m) => m.LOJA_ROUTES),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
