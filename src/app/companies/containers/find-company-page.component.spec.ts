import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { FindCompanyPageActions } from '@app/companies/actions';
import {
  CompanyAuthorsComponent,
  CompanyPreviewComponent,
  CompanyPreviewListComponent,
  CompanySearchComponent,
} from '@app/companies/components';
import { FindCompanyPageComponent } from '@app/companies/containers';
import * as fromCompanies from '@app/companies/reducers';
import { AddCommasPipe } from '@app/shared/pipes/add-commas.pipe';
import { EllipsisPipe } from '@app/shared/pipes/ellipsis.pipe';
import { MaterialModule } from '@app/material';

describe('Find Company Page', () => {
  let fixture: ComponentFixture<FindCompanyPageComponent>;
  let store: MockStore<fromCompanies.State>;
  let instance: FindCompanyPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
      ],
      declarations: [
        FindCompanyPageComponent,
        CompanySearchComponent,
        CompanyPreviewComponent,
        CompanyPreviewListComponent,
        CompanyAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromCompanies.selectSearchQuery, value: '' },
            { selector: fromCompanies.selectSearchResults, value: [] },
            { selector: fromCompanies.selectSearchLoading, value: false },
            { selector: fromCompanies.selectSearchError, value: '' },
          ],
        }),
      ],
    });

    fixture = TestBed.createComponent(FindCompanyPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a company.Search action on search', () => {
    const $event = 'Company name';
    const action = FindCompanyPageActions.searchCompanies({ query: $event });

    instance.search($event);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
