import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  CollectionPageComponent,
  FindCompanyPageComponent,
  ViewCompanyPageComponent,
} from '@app/companies/containers';
import { CompanyExistsGuard } from '@app/companies/guards';

export const routes: Routes = [
  {
    path: 'find',
    component: FindCompanyPageComponent,
    data: { title: 'Find company' },
  },
  {
    path: ':id',
    component: ViewCompanyPageComponent,
    canActivate: [CompanyExistsGuard],
    data: { title: 'Company details' },
  },
  {
    path: '',
    component: CollectionPageComponent,
    data: { title: 'Collection' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompaniesRoutingModule {}
