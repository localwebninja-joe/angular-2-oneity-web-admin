import { TestBed } from '@angular/core/testing';

import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { cold, getTestScheduler, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import {
  CompaniesApiActions,
  FindCompanyPageActions,
} from '@app/companies/actions';
import { CompanyEffects } from '@app/companies/effects';
import { Company } from '@app/companies/models';
import { CompaniesService } from '@app/core/services/companies.service';

describe('CompanyEffects', () => {
  let effects: CompanyEffects;
  let CompaniesService: any;
  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyEffects,
        {
          provide: CompaniesService,
          useValue: { searchCompanies: jest.fn() },
        },
        provideMockActions(() => actions$),
      ],
    });

    effects = TestBed.get(CompanyEffects);
    CompaniesService = TestBed.get(CompaniesService);
    actions$ = TestBed.get(Actions);
  });

  describe('search$', () => {
    it('should return a company.SearchComplete, with the companies, on success, after the de-bounce', () => {
      const company1 = { id: '111', companyInfo: {} } as Company;
      const company2 = { id: '222', companyInfo: {} } as Company;
      const companies = [company1, company2];
      const action = FindCompanyPageActions.searchCompanies({ query: 'query' });
      const completion = CompaniesApiActions.searchSuccess({ companies });

      actions$ = hot('-a---', { a: action });
      const response = cold('-a|', { a: companies });
      const expected = cold('-----b', { b: completion });
      CompaniesService.searchCompanies = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });

    it('should return a company.SearchError if the companies service throws', () => {
      const action = FindCompanyPageActions.searchCompanies({ query: 'query' });
      const completion = CompaniesApiActions.searchFailure({
        errorMsg: 'Unexpected Error. Try again later.',
      });
      const error = { message: 'Unexpected Error. Try again later.' };

      actions$ = hot('-a---', { a: action });
      const response = cold('-#|', {}, error);
      const expected = cold('-----b', { b: completion });
      CompaniesService.searchCompanies = jest.fn(() => response);

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });

    it(`should not do anything if the query is an empty string`, () => {
      const action = FindCompanyPageActions.searchCompanies({ query: '' });

      actions$ = hot('-a---', { a: action });
      const expected = cold('---');

      expect(
        effects.search$({
          debounce: 30,
          scheduler: getTestScheduler(),
        })
      ).toBeObservable(expected);
    });
  });
});
