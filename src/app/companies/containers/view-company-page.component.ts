import { Component, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import * as fromCompanies from '@app/companies/reducers';
import { ViewCompanyPageActions } from '@app/companies/actions';

/**
 * Note: Container components are also reusable. Whether or not
 * a component is a presentation component or a container
 * component is an implementation detail.
 *
 * The View Company Page's responsibility is to map router params
 * to a 'Select' company action. Actually showing the selected
 * company remains a responsibility of the
 * SelectedCompanyPageComponent
 */
@Component({
  selector: 'bc-view-company-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <bc-selected-company-page></bc-selected-company-page>
  `,
})
export class ViewCompanyPageComponent implements OnDestroy {
  actionsSubscription: Subscription;

  constructor(store: Store<fromCompanies.State>, route: ActivatedRoute) {
    this.actionsSubscription = route.params
      .pipe(map(params => ViewCompanyPageActions.selectCompany({ id: params.id })))
      .subscribe(action => store.dispatch(action));
  }

  ngOnDestroy() {
    this.actionsSubscription.unsubscribe();
  }
}
