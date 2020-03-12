import { ChangeDetectionStrategy, Component } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SelectedCompanyPageActions } from '@app/companies/actions';
import { Company } from '@app/companies/models';
import * as fromCompanies from '@app/companies/reducers';

@Component({
  selector: 'bc-selected-company-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-company-detail
      [company]="company$ | async"
      [inCollection]="isSelectedCompanyInCollection$ | async"
      (add)="addToCollection($event)"
      (remove)="removeFromCollection($event)">
    </bc-company-detail>
  `,
})
export class SelectedCompanyPageComponent {
  company$: Observable<Company>;
  isSelectedCompanyInCollection$: Observable<boolean>;

  constructor(private store: Store<fromCompanies.State>) {
    this.company$ = store.pipe(select(fromCompanies.selectSelectedCompany)) as Observable<Company>;
    this.isSelectedCompanyInCollection$ = store.pipe(
      select(fromCompanies.isSelectedCompanyInCollection)
    );
  }

  addToCollection(company: Company) {
    this.store.dispatch(SelectedCompanyPageActions.addCompany({ company }));
  }

  removeFromCollection(company: Company) {
    this.store.dispatch(SelectedCompanyPageActions.removeCompany({ company }));
  }
}
