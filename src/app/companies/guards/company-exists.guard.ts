import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';

import { CompaniesService } from '@app/core/services/companies.service';
import { CompanyActions } from '@app/companies/actions';
import * as fromCompanies from '@app/companies/reducers';

/**
 * Guards are hooks into the route resolution process, providing an opportunity
 * to inform the router's navigation process whether the route should continue
 * to activate this route. Guards must return an observable of true or false.
 */
@Injectable({
  providedIn: 'root',
})
export class CompanyExistsGuard implements CanActivate {
  constructor(
    private store: Store<fromCompanies.State>,
    private companies: CompaniesService,
    private router: Router
  ) {}

  /**
   * This method creates an observable that waits for the `loaded` property
   * of the collection state to turn `true`, emitting one time once loading
   * has finished.
   */
  waitForCollectionToLoad(): Observable<boolean> {
    return this.store.pipe(
      select(fromCompanies.selectCollectionLoaded),
      filter(loaded => loaded),
      take(1)
    );
  }

  /**
   * This method checks if a company with the given ID is already registered
   * in the Store
   */
  hasCompanyInStore(id: string): Observable<boolean> {
    return this.store.pipe(
      select(fromCompanies.selectCompanyEntities),
      map(entities => !!entities[id]),
      take(1)
    );
  }

  /**
   * This method loads a company with the given ID from the API and caches
   * it in the store, returning `true` or `false` if it was found.
   */
  hasCompanyInApi(id: string): Observable<boolean> {
    return this.companies.retrieveCompany(id).pipe(
      map(companyEntity => CompanyActions.loadCompany({ company: companyEntity })),
      tap(action => this.store.dispatch(action)),
      map(company => !!company),
      catchError(() => {
        this.router.navigate(['/404']);
        return of(false);
      })
    );
  }

  /**
   * `hasCompany` composes `hasCompanyInStore` and `hasCompanyInApi`. It first checks
   * if the company is in store, and if not it then checks if it is in the
   * API.
   */
  hasCompany(id: string): Observable<boolean> {
    return this.hasCompanyInStore(id).pipe(
      switchMap(inStore => {
        if (inStore) {
          return of(inStore);
        }

        return this.hasCompanyInApi(id);
      })
    );
  }

  /**
   * This is the actual method the router will call when our guard is run.
   *
   * Our guard waits for the collection to load, then it checks if we need
   * to request a company from the API or if we already have it in our cache.
   * If it finds it in the cache or in the API, it returns an Observable
   * of `true` and the route is rendered successfully.
   *
   * If it was unable to find it in our cache or in the API, this guard
   * will return an Observable of `false`, causing the router to move
   * on to the next candidate route. In this case, it will move on
   * to the 404 page.
   */
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.waitForCollectionToLoad().pipe(
      switchMap(() => this.hasCompany(route.params['id']))
    );
  }
}
