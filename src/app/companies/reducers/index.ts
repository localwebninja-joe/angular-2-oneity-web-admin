import { Company } from '@app/companies/models';
import {
  createSelector,
  createFeatureSelector,
  combineReducers,
  Action,
} from '@ngrx/store';
import * as fromSearch from '@app/companies/reducers/search.reducer';
import * as fromCompanies from '@app/companies/reducers/companies.reducer';
import * as fromCollection from '@app/companies/reducers/collection.reducer';
import * as fromRoot from '@app/reducers';

export const companiesFeatureKey = 'companies';

export interface CompaniesState {
  [fromSearch.searchFeatureKey]: fromSearch.State;
  [fromCompanies.companiesFeatureKey]: fromCompanies.State;
  [fromCollection.collectionFeatureKey]: fromCollection.State;
}

export interface State extends fromRoot.State {
  [companiesFeatureKey]: CompaniesState;
}

/** Provide reducer in AoT-compilation happy way */
export function reducers(state: CompaniesState | undefined, action: Action) {
  return combineReducers({
    [fromSearch.searchFeatureKey]: fromSearch.reducer,
    [fromCompanies.companiesFeatureKey]: fromCompanies.reducer,
    [fromCollection.collectionFeatureKey]: fromCollection.reducer,
  })(state, action);
}

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `companies` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.companiesState$ = state$.pipe(select(getCompaniesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const selectCompaniesState = createFeatureSelector<State, CompaniesState>(
  companiesFeatureKey
);

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const selectCompanyEntitiesState = createSelector(
  selectCompaniesState,
  state => state.companies
);

export const selectSelectedCompanyId = createSelector(
  selectCompanyEntitiesState,
  fromCompanies.selectId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: selectCompanyIds,
  selectEntities: selectCompanyEntities,
  selectAll: selectAllCompanies,
  selectTotal: selectTotalCompanies,
} = fromCompanies.adapter.getSelectors(selectCompanyEntitiesState);

export const selectSelectedCompany = createSelector(
  selectCompanyEntities,
  selectSelectedCompanyId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

/**
 * Just like with the Companies selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const selectSearchState = createSelector(
  selectCompaniesState,
  state => state.search
);

export const selectSearchCompanyIds = createSelector(
  selectSearchState,
  fromSearch.getIds
);
export const selectSearchQuery = createSelector(
  selectSearchState,
  fromSearch.getQuery
);
export const selectSearchLoading = createSelector(
  selectSearchState,
  fromSearch.getLoading
);
export const selectSearchError = createSelector(
  selectSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of Companies in the store.
 */
export const selectSearchResults = createSelector(
  selectCompanyEntities,
  selectSearchCompanyIds,
  (Companies, searchIds) => {
    return searchIds
      .map(id => Companies[id])
      .filter((Company): Company is Company => Company != null);
  }
);

export const selectCollectionState = createSelector(
  selectCompaniesState,
  state => state.collection
);

export const selectCollectionLoaded = createSelector(
  selectCollectionState,
  fromCollection.getLoaded
);
export const getCollectionLoading = createSelector(
  selectCollectionState,
  fromCollection.getLoading
);
export const selectCollectionCompanyIds = createSelector(
  selectCollectionState,
  fromCollection.getIds
);

export const selectCompanyCollection = createSelector(
  selectCompanyEntities,
  selectCollectionCompanyIds,
  (entities, ids) => {
    return ids
      .map(id => entities[id])
      .filter((Company): Company is Company => Company != null);
  }
);

export const isSelectedCompanyInCollection = createSelector(
  selectCollectionCompanyIds,
  selectSelectedCompanyId,
  (ids, selected) => {
    return !!selected && ids.indexOf(selected) > -1;
  }
);
