import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Register } from '@app/auth/models';
import * as fromAuth from '@app/auth/reducers';
import * as fromRoot from '@app/reducers';
import { RegisterPageActions, LoginPageActions, AuthApiActions } from '@app/auth/actions';
import { userRegistrationFields,Countries, Languages, Roles, Settings } from '@app/core/models';
import { LayoutActions } from '@app/core/actions';

@Component({
  selector: 'bc-login-page',
  template: `
    <bc-register-form
      (submitted)="onSubmit($event)"
      [pending]="pending$ | async"
      [errorMessage]="error$ | async"
      [userRegistrationFields]= "userRegistrationFields$ | async"
      [languages]= "languages$ | async"
      [countries]= "countries$ | async" 
    >
    </bc-register-form>
  `,
  styles: [],
})
export class RegisterPageComponent {
  pending$: Observable<boolean>;
  error$: Observable<string>;
  settings$: Observable<Settings>;
  userRegistrationFields$: Observable<userRegistrationFields>;
  countries$: Observable<Countries>;
  languages$: Observable<Languages>;
  roles$: Observable<Roles>;

  constructor(private store: Store<fromRoot.State &fromAuth.State>) {
    this.pending$ = this.store.pipe(select(fromAuth.selectRegisterPagePending));
    this.error$ = this.store.pipe(select(fromAuth.selectRegisterPageError));
    this.settings$ = this.store.pipe(select(fromRoot.selectSettings));
    this.userRegistrationFields$ = this.store.pipe(select(fromRoot.selectUserRegistrationFields));
    this.countries$ = this.store.pipe(select(fromRoot.selectCountries));
    this.languages$ = this.store.pipe(select(fromRoot.selectLanguages));
    this.roles$ = this.store.pipe(select(fromRoot.selectRoles));
  }

  onSubmit(register: Register) {
    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('ref');
    this.store.dispatch(AuthApiActions.join({ref: myParam}));
    this.store.dispatch(RegisterPageActions.register({ register }));
  }
}
