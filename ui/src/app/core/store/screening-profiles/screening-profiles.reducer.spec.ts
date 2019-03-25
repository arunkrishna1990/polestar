import { reducer, initialState, State, CountryCheckSevirity } from './screening-profiles.reducer';
import {
  LoadScreeningProfilesSuccessful,
  FilterScreeningProfilesByName,
  LoadScreeningProfilesFailed,
  FilterScreeningProfilesByCountryCheckSeverity,
  OpenScreeningProfile
} from './screening-profiles.actions';
import { ScreeningProfile } from '../../models/ScreeningProfiles';
import { screeningProfiles } from 'src/app/shared/screening-profiles.mock.data';
import { ScreeningProfileDataTable } from '../../models/ScreeningProfilesDataTable';

describe('ScreeningProfiles Reducer', () => {
  const mockData: any[] = [{
    id: '1',
    name: 'DummyName',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-CRITICAL'
  }, {
    id: '2',
    name: 'DummyName2',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-CRITICAL'
  }, {
    id: '3',
    name: 'DummyName3',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-WARNING'
  }, {
    id: '4',
    name: 'DummyName4',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-OK'
  }, {
    id: '5',
    name: 'DummyName5',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-UNKNOWN'
  }, {
    id: '6',
    name: 'DummyName6',
    created: new Date(),
    modified: new Date(),
    country_check_severity: '90-WARNING'
  }];
  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('LoadScreeningProfilesSuccessful', () => {
    let action, result;
    const mockScreeningProfiles = screeningProfiles.results.map(profile => new ScreeningProfile(profile));
    const mockDataTableSource = mockScreeningProfiles.map(profile =>
      new ScreeningProfileDataTable(profile.id, profile.name, profile.created, profile.modified, profile.country_check_severity));

    it('should return the correct state', () => {
      action = new LoadScreeningProfilesSuccessful(mockScreeningProfiles);

      result = reducer(initialState, action);

      const expectedState: State = {
        filters: {
          byName: null,
          byCountryCheckSeverity: null
        },
        original: mockScreeningProfiles,
        dataTableSource: mockDataTableSource,
        filteredDataTable: mockDataTableSource,
        selectedScreeningProfile: null
      };

      expect(result).toEqual(expectedState);
    });
  });

  describe('LoadScreeningProfilesFailed', () => {
    let action, result;
    const mockScreeningProfiles = screeningProfiles.results.map(profile => new ScreeningProfile(profile));

    it('should return a state that contains the original screening profiles', () => {
      action = new LoadScreeningProfilesFailed();

      result = reducer(initialState, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('FilterScreeningProfilesByName', () => {
    [{
      byNameState: null,
      byCountryCheckSeverityState: null,
      nameFilterValue: '2',
      expectedProfiles: [mockData[1]]
    }, {
      byNameState: null,
      byCountryCheckSeverityState: CountryCheckSevirity.CRITICAL,
      nameFilterValue: '2',
      expectedProfiles: [mockData[1]]
    }, {
      byNameState: '3',
      byCountryCheckSeverityState: CountryCheckSevirity.OK,
      nameFilterValue: '2',
      expectedProfiles: []
    }, {
      byNameState: '3',
      byCountryCheckSeverityState: null,
      nameFilterValue: '2',
      expectedProfiles: [mockData[1]]
    }, {
      byNameState: '3',
      byCountryCheckSeverityState: null,
      nameFilterValue: undefined,
      expectedProfiles: mockData
    }].forEach(testCase => {
      it('should update the filterDataTable state when there is already country check severity filter is added', () => {
        const action = new LoadScreeningProfilesSuccessful(mockData);
        const state = reducer(initialState, action);
        state.filters.byName = testCase.byNameState;
        state.filters.byCountryCheckSeverity = testCase.byCountryCheckSeverityState;

        const result = reducer(state, new FilterScreeningProfilesByName(testCase.nameFilterValue));

        checkTwoProfilesAreEqual(result.filteredDataTable, testCase.expectedProfiles);
      });
    });
  });

  describe('FilterScreeningProfilesByCountryCheckSeverity', () => {
    [{
      byNameState: null,
      byCountryCheckSeverityState: null,
      countryCheckSeverityFilter: CountryCheckSevirity.CRITICAL,
      expectedProfiles: [mockData[0], mockData[1]]
    }, {
      byNameState: '2',
      byCountryCheckSeverityState: null,
      countryCheckSeverityFilter: CountryCheckSevirity.CRITICAL,
      expectedProfiles: [mockData[1]]
    }, {
      byNameState: '4',
      byCountryCheckSeverityState: CountryCheckSevirity.CRITICAL,
      countryCheckSeverityFilter: CountryCheckSevirity.OK,
      expectedProfiles: [mockData[3]]
    }, {
      byNameState: '5',
      byCountryCheckSeverityState: null,
      countryCheckSeverityFilter: CountryCheckSevirity.WARNING,
      expectedProfiles: []
    }, {
      byNameState: null,
      byCountryCheckSeverityState: CountryCheckSevirity.WARNING,
      countryCheckSeverityFilter: undefined,
      expectedProfiles: mockData
    }].forEach(testCase => {
      it('should update the filterDataTable state when there is already country check severity filter is added', () => {
        const action = new LoadScreeningProfilesSuccessful(mockData);
        const state = reducer(initialState, action);
        state.filters.byName = testCase.byNameState;
        state.filters.byCountryCheckSeverity = testCase.byCountryCheckSeverityState;

        const result = reducer(state, new FilterScreeningProfilesByCountryCheckSeverity(testCase.countryCheckSeverityFilter));

        checkTwoProfilesAreEqual(result.filteredDataTable, testCase.expectedProfiles);
      });
    });
  });

  describe('OpenScreeningProfile', () => {
    it('should update the state by setting the selected ScreeningProfile', () => {
      const action = new LoadScreeningProfilesSuccessful(mockData);
      const state = reducer(initialState, action);

      const result = reducer(state, new OpenScreeningProfile(mockData[3].id));

      checkTwoProfilesAreEqual(result.selectedScreeningProfile, mockData[3]);
    });
  });
});




const checkTwoProfilesAreEqual = (profiles, expectedProfiles) => {
  expect(profiles.length).toEqual(expectedProfiles.length);
  for (let i = 0; i < profiles.length; i++) {
    expect(profiles[i].id).toEqual(expectedProfiles[i].id);
    expect(profiles[i].name).toEqual(expectedProfiles[i].name);
    expect(profiles[i].created.getDate()).toEqual(expectedProfiles[i].created.getDate());
    expect(profiles[i].modified.getDate()).toEqual(expectedProfiles[i].modified.getDate());
    expect(profiles[i].country_check_severity).toEqual(expectedProfiles[i].country_check_severity);
  }
};

