import { createReducer, on } from '@ngrx/store';

import { LayoutActions } from '@app/core/actions';
import { AuthActions } from '@app/auth/actions';
import { Settings, userRegistrationFields, Languages, Countries, Roles } from '../models';

export const layoutFeatureKey = 'layout';

export interface State {
  showSidenav: boolean;
  settings: Settings;
  userRegistrationFields: userRegistrationFields;
  languages: Languages;
  countries: Countries;
  roles: Roles;

}

const initialState: State = {
  showSidenav: false,
  settings: null,
  userRegistrationFields: null,
  languages: null,
  countries: null,
  roles: null
};

export const reducer = createReducer(
  initialState,
  // Even thought the `state` is unused, it helps infer the return type
  on(LayoutActions.closeSidenav, state => ({ ...state, showSidenav: false })),
  on(LayoutActions.openSidenav, state => ({ ...state, showSidenav: true })),
  on(AuthActions.logoutConfirmation, state => ({  ...state, showSidenav: false })),
  on(LayoutActions.getSettings, (state, settings) => ({ ...state, ...settings })),
  on(LayoutActions.getUserRegistrationFieldsAction, (state, {userRegistrationFields} ) => ({ ...state, userRegistrationFields })),
  on(LayoutActions.getAllCountries, (state, {countries}) => ({ ...state, countries })),
  on(LayoutActions.getAllLanguages, (state, {languages}) => ({ ...state, languages })),
  on(LayoutActions.getAllRoles, (state, {roles}) => ({ ...state, roles }))
);

export const selectShowSidenav = (state: State) => state.showSidenav;
export const selectSettings = (state: State) => state.settings;
export const selectUserRegistrationFields = (state: State) => {
  return state.userRegistrationFields;
}
export const selectCountries = (state: State) => state.countries;
export const selectLanguages = (state: State) => state.languages;
export const selectRoles = (state: State) => state.roles;
