import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';

import { ScreeningProfilesEffects } from './screening-profiles.effects';
import { LoadScreeningProfiles, LoadScreeningProfilesSuccessful, LoadScreeningProfilesFailed } from './screening-profiles.actions';
import { screeningProfiles } from 'src/app/shared/screening-profiles.mock.data';
import { ScreeningProfile } from '../../models/ScreeningProfiles';
import { ApiService } from '../../services/api.service';

describe('ScreeningProfilesEffects', () => {
  let actions$: Observable<any>;
  let effects: ScreeningProfilesEffects, mockApiService;

  beforeEach(() => {
    mockApiService = jasmine.createSpyObj('ApiService', ['getProfiles']);
    TestBed.configureTestingModule({
      providers: [
        ScreeningProfilesEffects,
        provideMockActions(() => actions$),
        { provide: ApiService, useValue: mockApiService }
      ]
    });

    effects = TestBed.get(ScreeningProfilesEffects);
  });

  describe('when an action for loading screening profiles is triggered', () => {
    it('should return loading screening profiles scuceeded action when api call is successful', () => {
      actions$ = of(new LoadScreeningProfiles());
      const mockScreeningProfiles = screeningProfiles.results.map(profile => new ScreeningProfile(profile));
      mockApiService.getProfiles.and.returnValue(of(mockScreeningProfiles));

      effects.loadScreeningProfiles$.subscribe(response => {
        expect(response).toEqual(new LoadScreeningProfilesSuccessful(mockScreeningProfiles));
      });
    });

    it('should return loading screening profiles failed action when api call throws an error', () => {
      actions$ = of(new LoadScreeningProfiles());
      mockApiService.getProfiles.and.returnValue(throwError(new Error('dummyError')));

      effects.loadScreeningProfiles$.subscribe(response => {
        expect(response).toEqual(new LoadScreeningProfilesFailed());
      });
    });
  });
});
