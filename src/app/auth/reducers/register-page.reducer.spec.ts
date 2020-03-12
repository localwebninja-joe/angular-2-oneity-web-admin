import { reducer } from '@app//auth/reducers/register-page.reducer';
import * as fromRegisterPage from '@app//auth/reducers/register-page.reducer';

import { AuthApiActions, RegisterPageActions } from '@app//auth/actions';

import { Credentials, User } from '@app//auth/models';

describe('RegisterPageReducer', () => {
  describe('undefined action', () => {
    it('should return the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER', () => {
    it('should make pending to true', () => {
      const user = { username: 'test' } as Credentials;
      const createAction = RegisterPageActions.register({ credentials: user });

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('REGISTER_SUCCESS', () => {
    it('should have no error and no pending state', () => {
      const user = { name: 'test' } as User;
      const createAction = AuthApiActions.registerSuccess({ user });

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Register_FAILURE', () => {
    it('should have an error and no pending state', () => {
      const error = 'register failed';
      const createAction = AuthApiActions.registerFailure({ error });

      const result = reducer(fromRegisterPage.initialState, createAction);

      expect(result).toMatchSnapshot();
    });
  });
});
