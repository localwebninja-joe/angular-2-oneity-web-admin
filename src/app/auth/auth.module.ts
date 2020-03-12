import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { LoginPageComponent, RegisterPageComponent } from '@app/auth/containers';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  LoginFormComponent,
  RegisterFormComponent,
  LogoutConfirmationDialogComponent,
} from '@app/auth/components';

import { UserEffects, RouterEffects } from '@app/core/effects';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { AuthEffects } from '@app/auth/effects';
import { AppEffects } from '@app/app.effects';
import * as fromAuth from '@app/auth/reducers';
import { MaterialModule } from '@app/material';
import { AuthRoutingModule } from './auth-routing.module';
import { AppRoutingModule } from '@app/app-routing.module';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS} from '@angular/material/form-field';
import {FormFieldCustomControl, MyTelInput} from '@app/material/form-field-custom';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';

import { ROOT_REDUCERS, metaReducers } from '@app/reducers';

export const COMPONENTS = [
  LoginPageComponent,
  LoginFormComponent,
  RegisterPageComponent,
  RegisterFormComponent,
  LogoutConfirmationDialogComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialModule,
    AuthRoutingModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxMatIntlTelInputModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
        strictStateSerializability: true,
        strictActionSerializability: true,
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    EffectsModule.forRoot([UserEffects, RouterEffects, AppEffects]),
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducers),
    EffectsModule.forFeature([AuthEffects, UserEffects, RouterEffects, AppEffects]),

  ],
  declarations: [COMPONENTS, FormFieldCustomControl, MyTelInput],
  entryComponents: [LogoutConfirmationDialogComponent, FormFieldCustomControl, MyTelInput],
  bootstrap: [FormFieldCustomControl],
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
  ]
})
export class AuthModule {}
