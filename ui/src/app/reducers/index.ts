import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { State as ScreeningProfilesState, reducer as ScreeningProfilesReducer } from '../core/store/screening-profiles';

export interface State {
  screeningProfiles: ScreeningProfilesState;
}

export const reducers: ActionReducerMap<State> = {
  screeningProfiles: ScreeningProfilesReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
