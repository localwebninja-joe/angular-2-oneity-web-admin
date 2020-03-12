import { createAction, props } from '@ngrx/store';

import { Company } from '@app/companies/models';

/**
 * Add Company to Collection Actions
 */
export const addCompanySuccess = createAction(
  '[Collection/API] Add Company Success',
  props<{ company: Company }>()
);

export const addCompanyFailure = createAction(
  '[Collection/API] Add Company Failure',
  props<{ company: Company }>()
);

/**
 * Remove Company from Collection Actions
 */
export const removeCompanySuccess = createAction(
  '[Collection/API] Remove Company Success',
  props<{ company: Company }>()
);

export const removeCompanyFailure = createAction(
  '[Collection/API] Remove Company Failure',
  props<{ company: Company }>()
);

/**
 * Load Collection Actions
 */
export const loadCompaniesSuccess = createAction(
  '[Collection/API] Load Companies Success',
  props<{ companies: Company[] }>()
);

export const loadCompaniesFailure = createAction(
  '[Collection/API] Load Companies Failure',
  props<{ error: any }>()
);
