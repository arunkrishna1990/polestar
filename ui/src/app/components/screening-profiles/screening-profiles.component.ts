import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { ScreeningProfileDataTable } from 'src/app/core/models/ScreeningProfilesDataTable';
import {
  CountryCheckSevirity,
  FilterScreeningProfilesByName,
  FilterScreeningProfilesByCountryCheckSeverity,
  OpenScreeningProfile
} from 'src/app/core/store/screening-profiles';
import { Observable } from 'rxjs';
import { MatSort, MatTableDataSource, MatDialog } from '@angular/material';
import { ScreeningProfileDetailsComponent } from './screening-profile-details/screening-profile-details.component';

@Component({
  selector: 'app-screening-profiles',
  templateUrl: './screening-profiles.component.html',
  styleUrls: ['./screening-profiles.component.scss']
})
export class ScreeningProfilesComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = ['name', 'created', 'modified', 'country_check_severity'];
  datasource = new MatTableDataSource<ScreeningProfileDataTable>();

  constructor(private store: Store<State>, private dialog: MatDialog) {
    this.store.pipe(
      select(state => state.screeningProfiles.filteredDataTable))
      .subscribe(profiles => {
        this.datasource.data = profiles;
      });
  }

  ngOnInit() {
    this.datasource.sort = this.sort;
  }

  onFilterByName(name: string) {
    this.store.dispatch(new FilterScreeningProfilesByName(name));
  }

  onFilterByCountryCheckSeverity(countryCheckSeverity: CountryCheckSevirity) {
    this.store.dispatch(new FilterScreeningProfilesByCountryCheckSeverity(countryCheckSeverity));
  }

  open(row: ScreeningProfileDataTable) {
    this.store.dispatch(new OpenScreeningProfile(row.id));
    this.dialog.open(ScreeningProfileDetailsComponent, {
      panelClass: 'screening-profiles-details'
    });
  }

  trackById(profile: ScreeningProfileDataTable) {
    return profile.id;
  }
}



