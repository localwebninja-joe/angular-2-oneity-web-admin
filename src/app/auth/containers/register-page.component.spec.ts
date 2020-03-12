import { TestBed, ComponentFixture } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { RegisterPageComponent } from '@app/auth/containers';
import { RegisterFormComponent } from '@app/auth/components';
import * as fromAuth from '@app/auth/reducers';
import { RegisterPageActions } from '@app/auth/actions';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { MaterialModule } from '@app/material';

describe('Register Page', () => {
  let fixture: ComponentFixture<RegisterPageComponent>;
  let store: MockStore<fromAuth.State>;
  let instance: RegisterPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [RegisterPageComponent, RegisterFormComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: fromAuth.selectRegisterPagePending, value: false },
          ],
        }),
      ],
    });

    fixture = TestBed.createComponent(RegisterPageComponent);
    instance = fixture.componentInstance;
    store = TestBed.get(Store);

    spyOn(store, 'dispatch');
  });

  /**
   * Container components are used as integration points for connecting
   * the store to presentational components and dispatching
   * actions to the store.
   *
   * Container methods that dispatch events are like a component's output observables.
   * Container properties that select state from store are like a component's input properties.
   * If pure components are functions of their inputs, containers are functions of state
   *
   * Traditionally you would query the components rendered template
   * to validate its state. Since the components are analogous to
   * pure functions, we take snapshots of these components for a given state
   * to validate the rendered output and verify the component's output
   * against changes in state.
   */
  it('should compile', () => {
    fixture.detectChanges();

    expect(fixture).toMatchSnapshot();
  });

  it('should dispatch a register event on submit', () => {
    const credentials: any = {};
    const action = RegisterPageActions.register({ credentials });

    instance.onSubmit(credentials);

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });
});
