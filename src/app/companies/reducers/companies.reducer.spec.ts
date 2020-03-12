import { reducer } from '@app/companies/reducers/companies.reducer';
import * as fromCompanies from '@app/companies/reducers/companies.reducer';
import {
  CompaniesApiActions,
  CompanyActions,
  ViewCompanyPageActions,
  CollectionApiActions,
} from '@app/companies/actions';
import { Company, generateMockCompany } from '@app/companies/models';

describe('CompaniesReducer', () => {
  const company1 = generateMockCompany();
  const company2 = { ...company1, id: '222' };
  const company3 = { ...company1, id: '333' };
  const initialState: fromCompanies.State = {
    ids: [company1.id, company2.id],
    entities: {
      [company1.id]: company1,
      [company2.id]: company2,
    },
    selectedCompanyId: null,
  };

  describe('undefined action', () => {
    it('should return the default state', () => {
      const result = reducer(undefined, {} as any);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SEARCH_COMPLETE & LOAD_SUCCESS', () => {
    type CompaniesActions =
      | typeof CompaniesApiActions.searchSuccess
      | typeof CollectionApiActions.loadCompaniesSuccess;
    function noExistingCompanies(
      action: CompaniesActions,
      companiesInitialState: any,
      companies: Company[]
    ) {
      const createAction = action({ companies });

      const result = reducer(companiesInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    function existingCompanies(
      action: CompaniesActions,
      companiesInitialState: any,
      companies: Company[]
    ) {
      // should not replace existing companies
      const differentCompany2 = { ...companies[0], foo: 'bar' };
      const createAction = action({ companies: [companies[1], differentCompany2] });

      const expectedResult = {
        ids: [...companiesInitialState.ids, companies[1].id],
        entities: {
          ...companiesInitialState.entities,
          [companies[1].id]: companies[1],
        },
        selectedCompanyId: null,
      };

      const result = reducer(companiesInitialState, createAction);

      expect(result).toMatchSnapshot();
    }

    it('should add all companies in the payload when none exist', () => {
      noExistingCompanies(CompaniesApiActions.searchSuccess, initialState, [
        company1,
        company2,
      ]);

      noExistingCompanies(CollectionApiActions.loadCompaniesSuccess, initialState, [
        company1,
        company2,
      ]);
    });

    it('should add only companys when companys already exist', () => {
      existingCompanies(CompaniesApiActions.searchSuccess, initialState, [
        company2,
        company3,
      ]);

      existingCompanies(CollectionApiActions.loadCompaniesSuccess, initialState, [
        company2,
        company3,
      ]);
    });
  });

  describe('LOAD', () => {
    const expectedResult = {
      ids: [company1.id],
      entities: {
        [company1.id]: company1,
      },
      selectedCompanyId: null,
    };

    it('should add a single company, if the company does not exist', () => {
      const action = CompanyActions.loadCompany({ company: company1 });

      const result = reducer(fromCompanies.initialState, action);

      expect(result).toMatchSnapshot();
    });

    it('should return the existing state if the company exists', () => {
      const action = CompanyActions.loadCompany({ company: company1 });

      const result = reducer(expectedResult, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('SELECT', () => {
    it('should set the selected company id on the state', () => {
      const action = ViewCompanyPageActions.selectCompany({ id: company1.id });

      const result = reducer(initialState, action);

      expect(result).toMatchSnapshot();
    });
  });

  describe('Selectors', () => {
    describe('selectId', () => {
      it('should return the selected id', () => {
        const result = fromCompanies.selectId({
          ...initialState,
          selectedCompanyId: company1.id,
        });

        expect(result).toMatchSnapshot();
      });
    });
  });
});
