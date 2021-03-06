import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CollectionPageActions } from '@app/companies/actions';
import { Company } from '@app/companies/models';
import * as fromCompanies from '@app/companies/reducers';

@Component({
  selector: 'bc-collection-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>My Collection</mat-card-title>
    </mat-card>

    <bc-company-preview-list [companies]="companies$ | async"></bc-company-preview-list>
  `,
  /**
   * Container components are permitted to have just enough styles
   * to bring the view together. If the number of styles grow,
   * consider breaking them out into presentational
   * components.
   */
  styles: [
    `
      mat-card-title {
        display: flex;
        justify-content: center;
      }
    `,
  ],
})
export class CollectionPageComponent implements OnInit {
  companies$: Observable<Company[]>;

  constructor(private store: Store<fromCompanies.State>) {
    this.companies$ = store.pipe(select(fromCompanies.selectCompanyCollection));
  }

  ngOnInit() {
    this.store.dispatch(CollectionPageActions.loadCollection());
  }
}
