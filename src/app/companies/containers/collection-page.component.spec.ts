import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CollectionPageActions } from '@app/companies/actions';
import {
  CompanyAuthorsComponent,
  CompanyPreviewComponent,
  CompanyPreviewListComponent,
} from '@app/companies/components';
import { CollectionPageComponent } from '@app/companies/containers';
import * as fromCompanies from '@app/companies/reducers';
import { AddCommasPipe } from '@app/shared/pipes/add-commas.pipe';
import { EllipsisPipe } from '@app/shared/pipes/ellipsis.pipe';
import { MaterialModule } from '@app/material';

describe('Collection Page', () => {
  let fixture: ComponentFixture<CollectionPageComponent>;
  let store: MockStore<fromCompanies.State>;
  let instance: CollectionPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      declarations: [
        CollectionPageComponent,
        CompanyPreviewListComponent,
        CompanyPreviewComponent,
        CompanyAuthorsComponent,
        AddCommasPipe,
        EllipsisPipe,
      ],
      providers: [
        provideMockStore({
          selectors: [{ selector: fromCompanies.selectCompanyCollection, value: [] }],
        }),
      ],
    });

    fixture = TestBed.createComponent(CollectionPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a collection.Load on init', () => {
    const action = CollectionPageActions.loadCollection();

    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
