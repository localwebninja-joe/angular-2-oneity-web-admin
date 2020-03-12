import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, from } from 'rxjs';
import { User } from '@app/auth/models/user';

import { AuthActions } from '@app/auth/actions';
import * as fromAuth from '@app/auth/reducers';
import * as fromRoot from '@app/reducers';
import { LayoutActions } from '@app/core/actions';
import { BrowserStack } from 'protractor/built/driverProviders';
import { Settings,userRegistrationFields, Countries, Languages, Roles } from '../models';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'bc-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls:['./app.component.css'],
})
export class AppComponent {
  showSidenav$: Observable<boolean>;
  loggedIn$: Observable<boolean>;
  user$: Observable<User>;
  settings$: Observable<Settings>;
  userRegistrationFields$: Observable<userRegistrationFields>;
  countries$: Observable<Countries>;
  languages$: Observable<Languages>;
  roles$: Observable<Roles>;
  cookieValue$ = 'UNKNOWN';
  allCookies: {} = this.cookieService.getAll();
  
  
  constructor(private store: Store<fromRoot.State & fromAuth.State>, private cookieService: CookieService ) {
    /**
     * Selectors can be applied with the `select` operator which passes the state
     * tree to the provided selector
     */
    this.showSidenav$ = this.store.pipe(select(fromRoot.selectShowSidenav));
    this.loggedIn$ = this.store.pipe(select(fromAuth.selectLoggedIn));
    this.user$ = this.store.pipe(select(fromAuth.selectUser));
    this.settings$ = this.store.pipe(select(fromRoot.selectSettings));
    this.userRegistrationFields$ = this.store.pipe(select(fromRoot.selectUserRegistrationFields));
    this.countries$ = this.store.pipe(select(fromRoot.selectCountries));
    this.languages$ = this.store.pipe(select(fromRoot.selectLanguages));
    this.roles$ = this.store.pipe(select(fromRoot.selectRoles));
    console.log('erick: ',this.allCookies);
  }
  // ngOnInit(){
  //   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //   //Add 'implements OnInit' to the class.
  //   this.cookieService.set( 'Test', 'Hello World' );
  //   this.cookieValue$ = this.cookieService.get('Test');
  //   const allCookies: {} = this.cookieService.getAll();
  //   console.log('erick: ',allCookies);
  // }
  closeSidenav() {
    /**
     * All state updates are handled through dispatched actions in 'container'
     * components. This provides a clear, reproducible history of state
     * updates and user interaction through the life of our
     * application.
     */
    this.store.dispatch(LayoutActions.closeSidenav());
  }

  openSidenav() {
    this.store.dispatch(LayoutActions.openSidenav());
  }

  logout() {
    this.store.dispatch(AuthActions.logoutConfirmation());
  }
}
