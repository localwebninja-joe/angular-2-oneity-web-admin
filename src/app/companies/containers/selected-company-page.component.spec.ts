import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { SelectedCompanyPageActions } from '@app/companies/actions';
import {
  CompanyAuthorsComponent,
  CompanyDetailComponent,
} from '@app/companies/components';
import { SelectedCompanyPageComponent } from '@app/companies/containers';
import { Company, generateMockCompany } from '@app/companies/models';
import * as fromCompanies from '@app/companies/reducers';
import { AddCommasPipe } from '@app/shared/pipes/add-commas.pipe';
import { MaterialModule } from '@app/material';

describe('Selected Company Page', () => {
  let fixture: ComponentFixture<SelectedCompanyPageComponent>;
  let store: MockStore<fromCompanies.State>;
  let instance: SelectedCompanyPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule],
      declarations: [
        SelectedCompanyPageComponent,
        CompanyDetailComponent,
        CompanyAuthorsComponent,
        AddCommasPipe,
      ],
      providers: [provideMockStore()],
    });

    fixture = TestBed.createComponent(SelectedCompanyPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.AddCompany action when addToCollection is called', () => {
    const $event: Company = generateMockCompany();
    const action = SelectedCompanyPageActions.addCompany({ company: $event });

    instance.addToCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });

  it('should dispatch a collection.RemoveCompany action on removeFromCollection', () => {
    const $event: Company = generateMockCompany();
    const action = SelectedCompanyPageActions.removeCompany({ company: $event });

    instance.removeFromCollection($event);

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
