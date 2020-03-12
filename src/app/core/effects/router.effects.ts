import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { tap, filter, map, mergeMap, exhaustMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Actions, ofType, createEffect } from '@ngrx/effects';

import {
LayoutActions
} from '@app/core/actions';
import { AppSettingsService } from '@app/core/services/appSettings.service';
@Injectable()
export class RouterEffects {
  updateTitle$ = createEffect(() => {
    return this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute;
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      mergeMap(route => route.data),
      map(data => `Oneity Web Admin - ${data['title']}`),
      tap(title => this.titleService.setTitle(title))
  )}, { dispatch: false });

  settings$ = createEffect(() => {
    return this.settingsService.getSettings()
    .pipe(map((settings) => LayoutActions.getSettings(settings)))
  });

  userRegistrationFields$ = createEffect(() => {
    return this.settingsService.getUserRegistrationFields()
    .pipe(map((userRegistrationFields) => LayoutActions.getUserRegistrationFieldsAction({userRegistrationFields})),
      catchError(({message}) => of(LayoutActions.UserRegistrationFieldsFailure({ error: message })))
    )
  });

  countries$ = createEffect(() => {
    return this.settingsService.getAllCountries()
      .pipe(map((countries) => LayoutActions.getAllCountries({countries})),
        catchError(({message}) => of(LayoutActions.UserRegistrationFieldsFailure({ error: message })))
      )
  });

  languages$ = createEffect(() => {
    return this.settingsService.getAllLanguages()
      .pipe(map((languages) => LayoutActions.getAllLanguages({ languages })),
        catchError(({message}) => of(LayoutActions.UserRegistrationFieldsFailure({ error: message })))
      )
  });

  roles$ = createEffect(() => {
    return this.settingsService.getAllRoles()
    .pipe(map((roles) => LayoutActions.getAllRoles({roles})),
      catchError(({message}) => of(LayoutActions.UserRegistrationFieldsFailure({ error: message })))
    )
  });

  constructor(
    private router: Router,
    private titleService: Title,
    private activatedRoute: ActivatedRoute,
    private settingsService: AppSettingsService
  ) {}
}
