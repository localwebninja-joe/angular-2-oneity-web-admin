import { createAction, props } from '@ngrx/store';
import { Register } from '@app/auth/models';

export const register = createAction('[Register Page] Register', props<{ register: Register }>());
