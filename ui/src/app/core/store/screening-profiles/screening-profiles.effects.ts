import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ScreeningProfilesActionTypes, LoadScreeningProfilesSuccessful, LoadScreeningProfilesFailed } from './screening-profiles.actions';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import { of } from 'rxjs';


@Injectable()
export class ScreeningProfilesEffects {

  constructor(private actions$: Actions, private api: ApiService) { }

  @Effect()
  loadScreeningProfiles$ = this.actions$.pipe(
    ofType(ScreeningProfilesActionTypes.LoadScreeningProfiles),
    switchMap(_ => {
      return this.api.getProfiles().pipe(
        map(profiles => new LoadScreeningProfilesSuccessful(profiles)),
        catchError(e => of(new LoadScreeningProfilesFailed()))
      );
    })
  );
}
