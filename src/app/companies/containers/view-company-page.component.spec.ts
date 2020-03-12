import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { BehaviorSubject } from 'rxjs';

import {
  CompanyAuthorsComponent,
  CompanyDetailComponent,
} from '@app/companies/components';
import { SelectedCompanyPageComponent } from '@app/companies/containers';
import { ViewCompanyPageComponent } from '@app/companies/containers';
import { ViewCompanyPageActions } from '@app/companies/actions';
import * as fromCompanies from '@app/companies/reducers';
import { AddCommasPipe } from '@app/shared/pipes/add-commas.pipe';
import { MaterialModule } from '@app/material';

describe('View Company Page', () => {
  let fixture: ComponentFixture<ViewCompanyPageComponent>;
  let store: MockStore<fromCompanies.State>;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: new BehaviorSubject({}) },
        },
        provideMockStore(),
      ],
      declarations: [
        ViewCompanyPageComponent,
        SelectedCompanyPageComponent,
        CompanyDetailComponent,
        CompanyAuthorsComponent,
        AddCommasPipe,
      ],
    });

    fixture = TestBed.createComponent(ViewCompanyPageComponent);
    store = TestBed.get(Store);
    route = TestBed.get(ActivatedRoute);

    jest.spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a company.Select action on init', () => {
    const action = ViewCompanyPageActions.selectCompany({ id: '2' });

    (route.params as BehaviorSubject<any>).next({ id: '2' });

    expect(store.dispatch).toHaveBeenLastCalledWith(action);
  });
});
