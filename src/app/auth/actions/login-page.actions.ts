import { createAction, props } from '@ngrx/store';
import { Credentials } from '@app/auth/models';

export const login = createAction('[Login Page] Login', props<{ credentials: Credentials }>());
export const loginProvider = createAction('[Login Page] Login Provider', props<{ provider: string }>());
