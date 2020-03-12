import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { FindCompanyPageActions } from '@app/companies/actions';
import { Company } from '@app/companies/models';
import * as fromCompanies from '@app/companies/reducers';

@Component({
  selector: 'bc-find-company-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-company-search
      [query]="searchQuery$ | async"
      [searching]="loading$ | async"
      [error]="error$ | async"
      (search)="search($event)">
    </bc-company-search>
    <bc-company-preview-list
      [company]="company$ | async">
    </bc-company-preview-list>
  `,
})
export class FindCompanyPageComponent {
  searchQuery$: Observable<string>;
  companies$: Observable<Company[]>;
  loading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<fromCompanies.State>) {
    this.searchQuery$ = store.pipe(
      select(fromCompanies.selectSearchQuery),
      take(1)
    );
    this.companies$ = store.pipe(select(fromCompanies.selectSearchResults));
    this.loading$ = store.pipe(select(fromCompanies.selectSearchLoading));
    this.error$ = store.pipe(select(fromCompanies.selectSearchError));
  }

  search(query: string) {
    this.store.dispatch(FindCompanyPageActions.searchCompanies({ query }));
  }
}
