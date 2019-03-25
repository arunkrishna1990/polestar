import { Action } from '@ngrx/store';
import { ScreeningProfile } from '../../models/ScreeningProfiles';
import { CountryCheckSevirity } from './screening-profiles.reducer';

export enum ScreeningProfilesActionTypes {
  LoadScreeningProfiles = '[ScreeningProfiles] Load ScreeningProfiles',
  LoadScreeningProfilesSuccessful = '[ScreeningProfiles] Load ScreeningProfiles Successful',
  LoadScreeningProfilesFailed = '[ScreeningProfiles] Load ScreeningProfiles Failed',
  FilterScreeningProfilesByName = '[ScreeningProfiles] Filter ScreeningProfiles By Name',
  FilterScreeningProfilesByCountryCheckSeverity = '[ScreeningProfiles] Filter ScreeningProfiles By CountryCheckSeverity',
  OpenScreeningProfile = '[ScreeningProfiles] Open ScreeningProfile',
}

export class LoadScreeningProfiles implements Action {
  readonly type = ScreeningProfilesActionTypes.LoadScreeningProfiles;
}

export class LoadScreeningProfilesSuccessful implements Action {
  readonly type = ScreeningProfilesActionTypes.LoadScreeningProfilesSuccessful;

  constructor(public payload: ScreeningProfile[]) {

  }
}

export class LoadScreeningProfilesFailed implements Action {
  readonly type = ScreeningProfilesActionTypes.LoadScreeningProfilesFailed;
}

export class FilterScreeningProfilesByName implements Action {
  readonly type = ScreeningProfilesActionTypes.FilterScreeningProfilesByName;

  constructor(public payload: string) {

  }
}

export class FilterScreeningProfilesByCountryCheckSeverity implements Action {
  readonly type = ScreeningProfilesActionTypes.FilterScreeningProfilesByCountryCheckSeverity;

  constructor(public payload: CountryCheckSevirity) {

  }
}

export class OpenScreeningProfile implements Action {
  readonly type = ScreeningProfilesActionTypes.OpenScreeningProfile;

  constructor(public payload: string) {

  }
}

export type ScreeningProfilesActions =
  LoadScreeningProfiles
  | LoadScreeningProfilesSuccessful
  | LoadScreeningProfilesFailed
  | FilterScreeningProfilesByName
  | FilterScreeningProfilesByCountryCheckSeverity
  | OpenScreeningProfile;
