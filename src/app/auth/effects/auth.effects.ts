import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import {
  LoginPageActions,
  RegisterPageActions,
  AuthActions,
  AuthApiActions,
} from '@app/auth/actions';
import { Credentials, User, Register } from '@app/auth/models';
import { AuthService } from '@app/auth/services';
import { LogoutConfirmationDialogComponent } from '@app/auth/components';
import { UserActions } from '@app/core/actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.login),
      map(action => action.credentials),
      exhaustMap((auth: Credentials) =>
        this.authService.login(auth)
        .pipe(
          map(user => {
            return AuthApiActions.loginSuccess({ user });
          }),
          catchError(error => {
            const err = error.error.error;
            return of(AuthApiActions.loginFailure({ error: err }));
          })
        )
      )
    )
  });
  loginSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(AuthApiActions.loginSuccess),
        tap(() => this.router.navigate(['/']))
  )}, { dispatch: false });
  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(RegisterPageActions.register),
      map(action => action.register),
      exhaustMap((register: Register) =>
        this.authService.register(register)
        .pipe(
          map(register => {
            return AuthApiActions.registerSuccess({ register });
          }),
          catchError(({error}) => {
            const err = error.message;
            return of(AuthApiActions.registerFailure({ error: err }));
          })
        )
      )
    )
  });
  registerSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.loginSuccess),
      tap(() => this.router.navigate(['/']))
    )
  }, { dispatch: false });
  loginRedirect$ = createEffect( () => {
    return this.actions$.pipe(
      ofType(AuthApiActions.loginRedirect, AuthActions.logout),
      tap(authed => {
        this.router.navigate(['/login']);
      })
  )}, { dispatch: false });
  loginProvider$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LoginPageActions.loginProvider),
      map(action => action.provider),
      exhaustMap((provider: string) =>{
        let newWindow = window.open(`https://svc.binomical.com/api/login/${provider}/redirect`);
        // let newWindow = window.open(`https://svc.binomical.com/auth/${provider}/redirect`);
        newWindow.onload = (params) =>{
          console.log(params);
        }
        newWindow
        newWindow.onclose = (params) => {
          console.log(params);
        }
        return this.authService.loginProvider(provider).pipe(
          map(user => {
            return AuthApiActions.loginSuccess({ user });
          }),
          catchError(error => {
            const err = error.error.error;
            return of(AuthApiActions.loginFailure({ error: err }));
          })
        )
        })
    )
  });
  loginProviderSuccess$ = createEffect(() => {
  return  this.actions$.pipe(
    ofType(AuthApiActions.loginProviderSuccess),
    tap(() => this.router.navigate(['/register']))
  )}, { dispatch: false });
  logoutConfirmation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logoutConfirmation),
      exhaustMap(() => {
        const dialogRef = this.dialog.open<
          LogoutConfirmationDialogComponent,
          undefined,
          boolean
        >(LogoutConfirmationDialogComponent);

        return dialogRef.afterClosed();
      }),
      map(
        result =>
          result
            ? AuthActions.logout()
            : AuthActions.logoutConfirmationDismiss()
      )
    )
  });
  logoutIdleUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UserActions.idleTimeout),
      map(() => AuthActions.logout())
    )
  });
  join$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.join),
      map(action => action),
      exhaustMap(({ref}) => 
        this.authService.join(ref)
        .pipe(
          map(result => {
            const value = 0;
            return AuthApiActions.joinSuccess(result);
          }),
          catchError(error => {
            const err = error.message;
            return of(AuthApiActions.joinFailure({ error: err }));
          })
        )
      )
  )}, { dispatch: true });

  readyDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthApiActions.readyDetails),
      map(() => {
        return this.authService.readyDetails().pipe(
        map(result => {
          const value = 0;
          return result;
        }))
      })
  )}, { dispatch: false });

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
