import { props, createAction } from '@ngrx/store';
import { User, Register } from '@app/auth/models';

export const loginSuccess = createAction(
  '[Auth/API] Login Success',
  props<{ user: User }>()
);

export const loginProviderSuccess = createAction(
  '[Auth/API] Login Provider Success',
  props<{ user: User }>()
);

export const loginFailure = createAction(
  '[Auth/API] Login Failure',
  props<{ error: any }>()
);

export const registerSuccess = createAction(
  '[Auth/API] Register Success',
  props<{ register: Register }>()
);


export const registerFailure = createAction(
  '[Auth/API] Register Failure',
  props<{ error: any }>()
);

export const join = createAction('[Layout] Join',props<{ref: string}>());

export const joinSuccess = createAction('[Layout] Join Success',props<{any}>());
export const joinFailure = createAction('[Layout] Join Failure',props<{ error: any }>());

export const readyDetails = createAction('[Layout] Ready Details');

export const loginRedirect = createAction('[Auth/API] Login Redirect');

export const registerRedirect = createAction('[Auth/API] Register Redirect');
