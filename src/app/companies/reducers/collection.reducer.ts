import { createReducer, on } from '@ngrx/store';

import {
  CollectionApiActions,
  CollectionPageActions,
} from '@app/companies/actions';

export const collectionFeatureKey = 'collection';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: string[];
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
};

export const reducer = createReducer(
  initialState,
  on(CollectionPageActions.loadCollection, state => ({
    ...state,
    loading: true,
  })),
  on(CollectionApiActions.loadCompaniesSuccess, (state, { companies }) => ({
    loaded: true,
    loading: false,
    ids: companies.map(company => company.id),
  })),
  // Supports handing multiple types of actions
  on(
    CollectionApiActions.addCompanySuccess,
    CollectionApiActions.removeCompanyFailure,
    (state, { company }) => {
      if (state.ids.indexOf(company.id) > -1) {
        return state;
      }
      return {
        ...state,
        ids: [...state.ids, company.id],
      };
    }
  ),
  on(
    CollectionApiActions.removeCompanySuccess,
    CollectionApiActions.addCompanyFailure,
    (state, { company }) => ({
      ...state,
      ids: state.ids.filter(id => id !== company.id),
    })
  )
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;
