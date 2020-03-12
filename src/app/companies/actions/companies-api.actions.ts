import { createAction, props } from '@ngrx/store';

import { Company } from '@app/companies/models';

export const searchSuccess = createAction(
  '[Companies/API] Search Success',
  props<{ companies: Company[] }>()
);

export const searchFailure = createAction(
  '[Companies/API] Search Failure',
  props<{ errorMsg: string }>()
);
