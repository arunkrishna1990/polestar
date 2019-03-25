import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningProfileDetailsComponent } from './screening-profile-details.component';
import { MaterialModule } from 'src/app/shared/material.module';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import { screeningProfiles } from 'src/app/shared/screening-profiles.mock.data';
import { ScreeningProfile } from 'src/app/core/models/ScreeningProfiles';
import { OpenScreeningProfile, LoadScreeningProfilesSuccessful } from 'src/app/core/store/screening-profiles';
import { By } from '@angular/platform-browser';
import { ScreeningProfileDetailViewModel } from 'src/app/core/models/ScreeiningProfileDetailViewModel';

describe('ScreeningProfileDetailsComponent', () => {
  let component: ScreeningProfileDetailsComponent;
  let fixture: ComponentFixture<ScreeningProfileDetailsComponent>;
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MaterialModule,
        StoreModule.forRoot(reducers)],
      declarations: [ScreeningProfileDetailsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(ScreeningProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should render the details view with the selected screening profile', () => {
      const mockData = screeningProfiles.results.map(item => new ScreeningProfile(item));
      store.dispatch(new LoadScreeningProfilesSuccessful(mockData));
      store.dispatch(new OpenScreeningProfile(mockData[1].id));

      fixture.detectChanges();
      const expectedProfileDetails = [];

      for (const key in mockData) {
        if (mockData.hasOwnProperty(key)) {
          expectedProfileDetails.push(mockData[key]);
        }
      }

      expect(component.screeningProfile).toEqual(new ScreeningProfileDetailViewModel(mockData[1]));
      const detailView = fixture.debugElement.query(By.css('.wrapper')).nativeElement.innerHTML;
      expectedProfileDetails.forEach(detail => {
        expect(detailView).toContain(detail);
      });
    });
  });
});
