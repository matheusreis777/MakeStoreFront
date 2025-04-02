import { Route } from '@angular/router';

export const LOGIN_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./signin/signin.component').then(m => m.SigninComponent),
  },
  {
    path: 'cadastrar',
    loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent),
  },
];
