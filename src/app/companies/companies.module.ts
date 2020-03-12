import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CompaniesRoutingModule } from '@app/companies/companies-routing.module';
import {
  CompanyAuthorsComponent,
  CompanyDetailComponent,
  CompanyPreviewComponent,
  CompanyPreviewListComponent,
  CompanySearchComponent,
} from '@app/companies/components';
import {
  CollectionPageComponent,
  FindCompanyPageComponent,
  SelectedCompanyPageComponent,
  ViewCompanyPageComponent,
} from '@app/companies/containers';
import { CompanyEffects, CollectionEffects } from '@app/companies/effects';

import * as fromCompanies from '@app/companies/reducers';
import { MaterialModule } from '@app/material';
import { PipesModule } from '@app/shared/pipes';

export const COMPONENTS = [
  CompanyAuthorsComponent,
  CompanyDetailComponent,
  CompanyPreviewComponent,
  CompanyPreviewListComponent,
  CompanySearchComponent,
];

export const CONTAINERS = [
  FindCompanyPageComponent,
  ViewCompanyPageComponent,
  SelectedCompanyPageComponent,
  CollectionPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    CompaniesRoutingModule,

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature(fromCompanies.companiesFeatureKey, fromCompanies.reducers),

    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([CompanyEffects, CollectionEffects]),
    PipesModule,
  ],
  declarations: [COMPONENTS, CONTAINERS],
})
export class CompaniesModule {}
