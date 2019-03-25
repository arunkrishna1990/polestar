import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers } from './reducers';
import { LoadScreeningProfiles } from './core/store/screening-profiles';
import { MockComponent } from 'ng2-mock-component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>, component: AppComponent, store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers),
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MockComponent({ selector: 'app-side-bar' })
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch an action to load profiles', () => {
    expect(store.dispatch).toHaveBeenCalledWith(new LoadScreeningProfiles());
  });
});
