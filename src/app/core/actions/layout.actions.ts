import { createAction, props } from '@ngrx/store';
import { Settings, userRegistrationFields, Languages, Countries, Roles } from '../models';

export const openSidenav = createAction('[Layout] Open Sidenav');

export const closeSidenav = createAction('[Layout] Close Sidenav');

export const getSettings = createAction('[Layout] Get Settings', props<Settings>());

export const getUserRegistrationFieldsAction = createAction('[Layout] Get User Registration Fields', props<{userRegistrationFields: userRegistrationFields}>());

export const getAllCountries = createAction('[Layout] Get All Countries', props<{countries: Countries}>());

export const getAllLanguages = createAction('[Layout] Get All Languages', props<{languages:Languages}>());

export const getAllRoles = createAction('[Layout] Get All Roles', props<{roles: Roles}>());

export const UserRegistrationFieldsFailure = createAction(
    '[Auth/API] User Registration Fields Failure Failure',
    props<{ error: any }>()
  );
