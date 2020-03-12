import { createAction, props } from '@ngrx/store';

import { Company } from '@app/companies/models';

/**
 * Add Company to Collection Action
 */
export const addCompany = createAction(
  '[Selected Company Page] Add Company',
  props<{ company: Company }>()
);

/**
 * Remove Company from Collection Action
 */
export const removeCompany = createAction(
  '[Selected Company Page] Remove Company',
  props<{ company: Company }>()
);
