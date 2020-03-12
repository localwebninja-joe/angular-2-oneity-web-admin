import { createAction, props } from '@ngrx/store';

export const selectCompany = createAction(
  '[View Company Page] Select Company',
  props<{ id: string }>()
);
