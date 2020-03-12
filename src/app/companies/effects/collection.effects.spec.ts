import { TestBed } from '@angular/core/testing';

import {
  CollectionApiActions,
  CollectionPageActions,
  SelectedCompanyPageActions,
} from '@app/companies/actions';
import { CollectionEffects } from '@app/companies/effects';
import { Company } from '@app/companies/models';
import {
  CompanyStorageService,
  LOCAL_STORAGE_TOKEN,
} from '@app/core/services';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

describe('CollectionEffects', () => {
  let db: any;
  let effects: CollectionEffects;
  let actions$: Observable<any>;

  const company1 = { id: '111', companyInfo: {} } as Company;
  const company2 = { id: '222', companyInfo: {} } as Company;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CollectionEffects,
        {
          provide: CompanyStorageService,
          useValue: {
            supported: jest.fn(),
            deleteStoredCollection: jest.fn(),
            addToCollection: jest.fn(),
            getCollection: jest.fn(),
            removeFromCollection: jest.fn(),
          },
        },
        {
          provide: LOCAL_STORAGE_TOKEN,
          useValue: {
            removeItem: jest.fn(),
            setItem: jest.fn(),
            getItem: jest.fn(_ => JSON.stringify([])),
          },
        },
        provideMockActions(() => actions$),
      ],
    });

    db = TestBed.get(CompanyStorageService);
    effects = TestBed.get(CollectionEffects);
    actions$ = TestBed.get(Actions);
  });
  describe('checkStorageSupport$', () => {
    it('should call db.checkStorageSupport when initially subscribed to', () => {
      effects.checkStorageSupport$.subscribe();
      expect(db.supported).toHaveBeenCalled();
    });
  });
  describe('loadCollection$', () => {
    it('should return a collection.LoadSuccess, with the companies, on success', () => {
      const action = CollectionPageActions.loadCollection();
      const completion = CollectionApiActions.loadCompaniesSuccess({
        companies: [company1, company2],
      });

      actions$ = hot('-a', { a: action });
      const response = cold('-a|', { a: [company1, company2] });
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });

    it('should return a collection.LoadFail, if the query throws', () => {
      const action = CollectionPageActions.loadCollection();
      const error = 'Error!';
      const completion = CollectionApiActions.loadCompaniesFailure({ error });

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.getCollection = jest.fn(() => response);

      expect(effects.loadCollection$).toBeObservable(expected);
    });
  });

  describe('addCompanyToCollection$', () => {
    it('should return a collection.AddCompanySuccess, with the company, on success', () => {
      const action = SelectedCompanyPageActions.addCompany({ company: company1 });
      const completion = CollectionApiActions.addCompanySuccess({ company: company1 });

      actions$ = hot('-a', { a: action });
      const response = cold('-b', { b: true });
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addCompanyToCollection$).toBeObservable(expected);
      expect(db.addToCollection).toHaveBeenCalledWith([company1]);
    });

    it('should return a collection.AddCompanyFail, with the company, when the db insert throws', () => {
      const action = SelectedCompanyPageActions.addCompany({ company: company1 });
      const completion = CollectionApiActions.addCompanyFailure({ company: company1 });
      const error = 'Error!';

      actions$ = hot('-a', { a: action });
      const response = cold('-#', {}, error);
      const expected = cold('--c', { c: completion });
      db.addToCollection = jest.fn(() => response);

      expect(effects.addCompanyToCollection$).toBeObservable(expected);
    });

    describe('removeCompanyFromCollection$', () => {
      it('should return a collection.RemoveCompanySuccess, with the company, on success', () => {
        const action = SelectedCompanyPageActions.removeCompany({ company: company1 });
        const completion = CollectionApiActions.removeCompanySuccess({
          company: company1,
        });

        actions$ = hot('-a', { a: action });
        const response = cold('-b', { b: true });
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeCompanyFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([company1.id]);
      });

      it('should return a collection.RemoveCompanyFail, with the company, when the db insert throws', () => {
        const action = SelectedCompanyPageActions.removeCompany({ company: company1 });
        const completion = CollectionApiActions.removeCompanyFailure({
          company: company1,
        });
        const error = 'Error!';

        actions$ = hot('-a', { a: action });
        const response = cold('-#', {}, error);
        const expected = cold('--c', { c: completion });
        db.removeFromCollection = jest.fn(() => response);

        expect(effects.removeCompanyFromCollection$).toBeObservable(expected);
        expect(db.removeFromCollection).toHaveBeenCalledWith([company1.id]);
      });
    });
  });
});
