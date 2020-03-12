import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '@app/auth/services';
import { NotFoundPageComponent } from '@app/core/containers';

export const routes: Routes = [
  { path: '', redirectTo: '/books', pathMatch: 'full' },
  {
    path: 'books',
    loadChildren: () =>
      import('@app/books/books.module').then(m => m.BooksModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'companies',
    loadChildren: () =>
      import('@app/companies/companies.module').then(m => m.CompaniesModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
