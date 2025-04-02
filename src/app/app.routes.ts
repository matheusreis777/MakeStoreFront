import { Route } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { LayoutComponent } from './shared/layout/layout.component';

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
    path: 'loja',
    loadChildren: () =>
      import('./areas/loja/loja.routes').then((m) => m.LOJA_ROUTES),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'login' }
];
