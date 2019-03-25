import { Component, OnInit } from '@angular/core';
import { ScreeningProfile } from 'src/app/core/models/ScreeningProfiles';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/reducers';
import { map } from 'rxjs/operators';
import { ScreeningProfileDetailViewModel } from 'src/app/core/models/ScreeiningProfileDetailViewModel';

@Component({
  selector: 'app-screening-profile-details',
  templateUrl: './screening-profile-details.component.html',
  styleUrls: ['./screening-profile-details.component.scss']
})
export class ScreeningProfileDetailsComponent {
  screeningProfile: ScreeningProfileDetailViewModel;
  constructor(private store: Store<State>) {
    this.store.pipe(
      select(state => state.screeningProfiles.selectedScreeningProfile)
    ).subscribe(profile => {
      if (profile) {
        this.screeningProfile = new ScreeningProfileDetailViewModel(profile);
      }
    });
  }
}
