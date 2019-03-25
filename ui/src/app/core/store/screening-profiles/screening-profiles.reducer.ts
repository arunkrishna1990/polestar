import { ScreeningProfile } from '../../models/ScreeningProfiles';
import { ScreeningProfilesActions, ScreeningProfilesActionTypes } from './screening-profiles.actions';
import { ScreeningProfileDataTable } from '../../models/ScreeningProfilesDataTable';

export enum CountryCheckSevirity {
  CRITICAL = 'critical',
  WARNING = 'warning',
  OK = 'ok',
  UNKNOWN = 'unknown'
}

export interface Filter {
  byName: string;
  byCountryCheckSeverity: CountryCheckSevirity;
}

export interface State {
  filters: Filter;
  original: ScreeningProfile[];
  dataTableSource: ScreeningProfileDataTable[];
  filteredDataTable: ScreeningProfileDataTable[];
  selectedScreeningProfile: ScreeningProfile;
}

export const initialState: State = {
  filters: { byName: null, byCountryCheckSeverity: null },
  original: [],
  dataTableSource: [],
  filteredDataTable: [],
  selectedScreeningProfile: null
};

export function reducer(state = initialState, action: ScreeningProfilesActions): State {
  switch (action.type) {
    case ScreeningProfilesActionTypes.LoadScreeningProfilesSuccessful:
      state.original = action.payload;
      const convertedDataTableSource = action.payload.map(profile =>
        new ScreeningProfileDataTable(
          profile.id,
          profile.name,
          profile.created,
          profile.modified,
          profile.country_check_severity));
      state.dataTableSource = convertedDataTableSource;
      state.filteredDataTable = convertedDataTableSource;
      return state;

    case ScreeningProfilesActionTypes.LoadScreeningProfilesFailed:
      return state;

    case ScreeningProfilesActionTypes.FilterScreeningProfilesByName:
      return applyFilter(state, action.payload, state.filters.byCountryCheckSeverity);

    case ScreeningProfilesActionTypes.FilterScreeningProfilesByCountryCheckSeverity:
      return applyFilter(state, state.filters.byName, action.payload);

    case ScreeningProfilesActionTypes.OpenScreeningProfile:
      return {
        ...state,
        selectedScreeningProfile: state.original.find(item => item.id === action.payload)
      };
    default:
      return state;
  }
}

function applyFilter(state: State, byName: string, byCountryCheckSeverity: CountryCheckSevirity) {
  return {
    ...state,
    filters: { byName, byCountryCheckSeverity },
    filteredDataTable: state.dataTableSource.filter(item => {
      return (doesContain(byName, item.name)
        && doesContain(byCountryCheckSeverity, item.country_check_severity));
    })
  };
}


const doesContain = (str1: string, inString: string) => {
  return (inString && str1 && inString.toLowerCase().includes(str1.toLowerCase())) || !str1;
};
