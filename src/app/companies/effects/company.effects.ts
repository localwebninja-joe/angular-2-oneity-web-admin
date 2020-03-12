import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { asyncScheduler, EMPTY as empty, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { Company } from '@app/companies/models';
import {
  CompaniesApiActions,
  FindCompanyPageActions,
} from '@app/companies/actions';
import { CompaniesService } from '@app/core/services/companies.service';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class CompanyEffects {
  search$ = createEffect(
    () => ({ debounce = 300, scheduler = asyncScheduler } = {}) =>
      this.actions$.pipe(
        ofType(FindCompanyPageActions.searchCompanies),
        debounceTime(debounce, scheduler),
        switchMap(({ query }) => {
          if (query === '') {
            return empty;
          }

          const nextSearch$ = this.actions$.pipe(
            ofType(FindCompanyPageActions.searchCompanies),
            skip(1)
          );

          return this.Companies.searchCompanies(query).pipe(
            takeUntil(nextSearch$),
            map((companies: Company[]) => CompaniesApiActions.searchSuccess({ companies })),
            catchError(err =>
              of(CompaniesApiActions.searchFailure({ errorMsg: err.message }))
            )
          );
        })
      )
  );

  constructor(
    private actions$: Actions,
    private Companies: CompaniesService
  ) {}
}
