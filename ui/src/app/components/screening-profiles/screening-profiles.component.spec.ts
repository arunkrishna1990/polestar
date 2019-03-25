import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScreeningProfilesComponent } from './screening-profiles.component';
import { MockComponent } from 'ng2-mock-component';
import { StoreModule, Store } from '@ngrx/store';
import { reducers, State } from 'src/app/reducers';
import {
  LoadScreeningProfilesSuccessful,
  FilterScreeningProfilesByName,
  CountryCheckSevirity,
  FilterScreeningProfilesByCountryCheckSeverity,
  OpenScreeningProfile
} from 'src/app/core/store/screening-profiles';
import { screeningProfiles } from 'src/app/shared/screening-profiles.mock.data';
import { ScreeningProfile } from 'src/app/core/models/ScreeningProfiles';
import { MatDialog } from '@angular/material';
import { MaterialModule } from 'src/app/shared/material.module';
import { ScreeningProfileDataTable } from 'src/app/core/models/ScreeningProfilesDataTable';
import { By } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

describe('ScreeiningProfilesComponent', () => {
  let component: ScreeningProfilesComponent;
  let fixture: ComponentFixture<ScreeningProfilesComponent>;
  let store: Store<State>, mockDialog;

  beforeEach(async(() => {
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(reducers), MaterialModule],
      declarations: [
        ScreeningProfilesComponent,
        MockComponent({ selector: 'app-filter-control', outputs: ['filterByName', 'filterByCountryCheckSeverity'] })
      ],
      providers: [{ provide: MatDialog, useValue: mockDialog }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture = TestBed.createComponent(ScreeningProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when the component is compiled', () => {
    it('should set the data table data source', () => {
      const mockData = screeningProfiles.results.map(profile => new ScreeningProfile(profile));
      store.dispatch(new LoadScreeningProfilesSuccessful(mockData));

      fixture.detectChanges();

      const expectedDataTable = mockData.map(item =>
        new ScreeningProfileDataTable(item.id, item.name, item.created, item.modified, item.country_check_severity));
      expect(component.datasource.data).toEqual(expectedDataTable);

      const datatTableDOM = fixture.debugElement.query(By.css('.wrapper')).nativeElement.innerHTML;
      const datePipe = new DatePipe(navigator.language);
      expectedDataTable.forEach(row => {
        expect(datatTableDOM).toContain(row.name);
        expect(datatTableDOM).toContain(datePipe.transform(row.created, 'mediumDate'));
        expect(datatTableDOM).toContain(datePipe.transform(row.modified, 'mediumDate'));
        expect(datatTableDOM).toContain(row.country_check_severity);
      });
    });
  });

  describe('onFilterByName', () => {
    it('should trigger filter by name action', () => {
      component.onFilterByName('dummy filter text');

      expect(store.dispatch).toHaveBeenCalledWith(new FilterScreeningProfilesByName('dummy filter text'));
    });
  });

  describe('onFilterByCountryCheckSeverity', () => {
    it('should trigger filter by name action', () => {
      component.onFilterByCountryCheckSeverity(CountryCheckSevirity.CRITICAL);

      expect(store.dispatch)
        .toHaveBeenCalledWith(new FilterScreeningProfilesByCountryCheckSeverity(CountryCheckSevirity.CRITICAL));
    });
  });

  describe('open', () => {
    const dummyProfile = new ScreeningProfileDataTable('1', 'dummyName', new Date(), new Date(), CountryCheckSevirity.CRITICAL);
    beforeEach(() => {
      component.open(dummyProfile);
    });

    it('should trigger an action for selecting the profile', () => {
      expect(store.dispatch).toHaveBeenCalledWith(new OpenScreeningProfile(dummyProfile.id));
    });

    it('should open the modal dialog with the config options', () => {
      expect(mockDialog.open).toHaveBeenCalledWith(jasmine.any(Function),
        { panelClass: 'screening-profiles-details' });
    });
  });
});
