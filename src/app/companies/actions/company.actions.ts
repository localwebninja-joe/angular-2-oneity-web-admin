import { createAction, props } from '@ngrx/store';

import { Company } from '@app/companies/models';

export const loadCompany = createAction(
  '[Company Exists Guard] Load Company',
  props<{ company: Company }>()
);
