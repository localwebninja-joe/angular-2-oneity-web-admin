import { Injectable } from '@angular/core';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { defer, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedCompanyPageActions,
} from '@app/companies/actions';
import { Company } from '@app/companies/models';
import { CompanyStorageService } from '@app/core/services';

@Injectable()
export class CollectionEffects {
  /**
   * This effect does not yield any actions back to the store. Set
   * `dispatch` to false to hint to @ngrx/effects that it should
   * ignore any elements of this effect stream.
   *
   * The `defer` observable accepts an observable factory function
   * that is called when the observable is subscribed to.
   * Wrapping the supported call in `defer` makes
   * effect easier to test.
   */
  checkStorageSupport$ = createEffect(
    () => defer(() => this.storageService.supported()),
    { dispatch: false }
  );

  loadCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CollectionPageActions.loadCollection),
      switchMap(() =>
        this.storageService.getCollection().pipe(
          map((companies: Company[]) =>
            CollectionApiActions.loadCompaniesSuccess({ companies })
          ),
          catchError(error =>
            of(CollectionApiActions.loadCompaniesFailure({ error }))
          )
        )
      )
    )
  );

  addCompanyToCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedCompanyPageActions.addCompany),
      mergeMap(({ company }) =>
        this.storageService.addToCollection([company]).pipe(
          map(() => CollectionApiActions.addCompanySuccess({ company })),
          catchError(() => of(CollectionApiActions.addCompanyFailure({ company })))
        )
      )
    )
  );

  removeCompanyFromCollection$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SelectedCompanyPageActions.removeCompany),
      mergeMap(({ company }) =>
        this.storageService.removeFromCollection([company.id]).pipe(
          map(() => CollectionApiActions.removeCompanySuccess({ company })),
          catchError(() => of(CollectionApiActions.removeCompanyFailure({ company })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private storageService: CompanyStorageService
  ) {}
}
