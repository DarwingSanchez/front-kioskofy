import * as AuthActions from '@app/core/store/actions/auth.actions';
import * as LocationsActions from '@app/core/store/actions/locations.actions';
import { GetLocationsSuccessActionPayload, IImageResultRes, ILocation, Locations } from '@app/interfaces';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { Action, createReducer, on } from '@ngrx/store';

export interface ILocationsState {
  locations: Locations;
  isLocationsLoaded: boolean;
  allLocations: Locations;
  current_location: string;
  uploaded_location_img: string;
  callState: CallState;
}

const initialState: ILocationsState = {
  locations: [],
  isLocationsLoaded: false,
  allLocations: [],
  current_location: null,
  uploaded_location_img: null,
  callState: LoadingState.INIT,
};

const getLocationsSuccessActionHandler = (
  state: ILocationsState,
  { locations, all }: GetLocationsSuccessActionPayload,
) => ({
  ...state,
  isLocationsLoaded: true,
  locations,
  allLocations: all ? [...locations] : [...state.allLocations],
});

const locationsReducer = createReducer<ILocationsState, Action>(
  initialState,

  on(AuthActions.logoutSuccessAction, () => initialState),

  on(LocationsActions.getLocationsSuccessAction, getLocationsSuccessActionHandler),

  on(
    LocationsActions.changeCurrentLocationAction,
    (state: ILocationsState, { current_location }: { current_location: string }): ILocationsState => ({
      ...state,
      current_location: current_location || null,
    }),
  ),

  on(
    LocationsActions.createLocationAction,
    (state: ILocationsState): ILocationsState => ({
      ...state,
      callState: LoadingState.LOADING,
    }),
  ),
  on(
    LocationsActions.createLocationSuccessAction,
    (state: ILocationsState, { result, callState }: ResultState<ILocation>): ILocationsState => ({
      ...state,
      locations: [...state.locations, result],
      callState,
    }),
  ),
  on(LocationsActions.createLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(LocationsActions.editLocationAction, (state: ILocationsState) => ({ ...state, callState: LoadingState.LOADING })),

  on(
    LocationsActions.editLocationSuccessAction,
    (state: ILocationsState, { result, callState }: ResultState<ILocation>) => ({
      ...state,
      callState,
      locations: state.locations.map((l) => (l.id === result.id ? result : l)),
    }),
  ),
  on(LocationsActions.editLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(LocationsActions.deleteLocationAction, (state: ILocationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    LocationsActions.deleteLocationSuccessAction,
    (state: ILocationsState, { result, callState }: ResultState<string>) => ({
      ...state,
      locations: state.locations.filter((l) => l.id !== result),
      callState,
    }),
  ),
  on(LocationsActions.deleteLocationFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(LocationsActions.addLocationImgAction, (state: ILocationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    LocationsActions.addLocationImgSuccessAction,
    (state: ILocationsState, { result, callState }: ResultState<IImageResultRes>) => ({
      ...state,
      uploaded_location_img: result.image,
      callState,
    }),
  ),
  on(LocationsActions.addLocationImgFailureAction, (state: ILocationsState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
);

export default function (state: ILocationsState = initialState, action: Action): ILocationsState {
  return locationsReducer(state, action);
}
