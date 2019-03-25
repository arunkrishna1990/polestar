import { ApiService } from './api.service';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { screeningProfiles } from 'src/app/shared/screening-profiles.mock.data';
import { ScreeningProfile } from '../models/ScreeningProfiles';

describe('ApiService', () => {
  let apiService: ApiService, mockHttpClient;
  beforeEach(() => {
    mockHttpClient = jasmine.createSpyObj('HttpCLient', ['get']);
    apiService = new ApiService(mockHttpClient);
  });

  describe('getProfiles', () => {
    it('should call to get the profiles with correct url', () => {
      mockHttpClient.get.and.returnValue(of([]));

      apiService.getProfiles();

      expect(mockHttpClient.get).toHaveBeenCalledWith(`${environment.host}/api/screeningProfiles`);
    });

    it('should return the screening profiles mapped to the ', () => {
      mockHttpClient.get.and.returnValue(of(screeningProfiles));

      const expectedResult = screeningProfiles.results.map(profile => new ScreeningProfile(profile));
      apiService.getProfiles().subscribe((response) => {
        expect(expectedResult).toEqual(response);
      });
    });
  });
});
