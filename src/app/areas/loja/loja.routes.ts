import { Route } from '@angular/router';
import { LayoutComponent } from '../../shared/layout/layout.component';

export const LOJA_ROUTES: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./perfil/perfil.component').then(m => m.PerfilComponent),
      },
      {
        path: 'carrinho',
        loadComponent: () => import('./carrinho/carrinho.component').then(m => m.CarrinhoComponent),
      },
      {
        path: 'lista-compras',
        loadComponent: () => import('./lista-compras/lista-compras.component').then(m => m.ListaComprasComponent),
      },
      {
        path: 'produtos',
        loadComponent: () => import('./produtos/produtos.component').then(m => m.ProdutosComponent),
      },
    ],
  },
];
