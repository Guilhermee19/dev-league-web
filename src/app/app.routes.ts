import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./components/navbar/navbar.component').then(
        (m) => m.NavbarComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: '**',
        redirectTo: '',
      },
      // {
      //   path: '**',
      //   loadComponent: () =>
      //     import('./components/shared/page-error/page-error.component').then(
      //       (m) => m.PageErrorComponent
      //     ),
      //   data: { code: 404 },
      // },
    ],
  },
];
