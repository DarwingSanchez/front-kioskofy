import { selectAccountProfileData, selectCurrentAccountPlan } from '@app/core/store/selectors/account.selector';
import { getNestedParam } from '@app/core/store/selectors/router.selector';
import { IAccountData, ICurrentDefaultLocationId, ILocation, IUserProfile, Locations } from '@app/interfaces';
import { LoadingState } from '@app/shared/constants';
import { get } from '@app/shared/helpers';
import { Nullable } from '@app/shared/models';
import { createSelector } from '@ngrx/store';
import { ICoreModuleState } from '../reducers';
import { ILocationsState } from '../reducers/locations.reducer';
import { selectUserProfile } from './user.selector';

export const selectLocationsState = (state: ICoreModuleState): ILocationsState => state?.locations;

export const selectDefaultLocationId = createSelector(selectUserProfile, (userProfile: IUserProfile): string =>
  userProfile?.id ? userProfile?.default_location_id : null,
);

export const selectCurrentLocationId = createSelector(
  selectLocationsState,
  (state: ILocationsState): string => state?.current_location,
);

export const selectCurrentDefaultLocationId = createSelector(
  selectDefaultLocationId,
  selectLocationsState,
  (defaultId: string, state: ILocationsState): ICurrentDefaultLocationId => ({
    currentId: state?.current_location,
    defaultId,
  }),
);

export const selectLocations = createSelector(
  selectLocationsState,
  (state: ILocationsState): Locations => state?.locations,
);

export const selectAllLocations = createSelector(
  selectLocationsState,
  (state: ILocationsState): Locations => state?.allLocations,
);

export const selectLocationsLoading = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state?.callState === LoadingState.LOADING,
);

export const selectIsLocationsLoaded = createSelector(
  selectLocationsState,
  ({ isLocationsLoaded }: ILocationsState) => isLocationsLoaded,
);

export const selectLocationsCallState = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state?.callState,
);

export const selectLocationCallStateHasError = createSelector(selectLocationsState, (state: ILocationsState) => ({
  hasError: !!get(state, 'callState.errorMsg'),
}));

export const selectLocationImg = createSelector(
  selectLocationsState,
  (state: ILocationsState) => state?.uploaded_location_img,
);

export const selectCurrentLocationName = createSelector(
  selectLocations,
  selectCurrentLocationId,
  (locations: ILocation[], location_id: string): string => {
    if (locations?.length && location_id) {
      return locations?.find((location: ILocation) => location.id === location_id)?.name;
    }
    return 'All locations';
  },
);

export const selectLocationsCombinedData = createSelector(
  selectLocations,
  selectAccountProfileData,
  selectCurrentAccountPlan,
  (locations: ILocation[], account_profile_data: IAccountData, current_account_plan: any) => ({
    locations,
    current_locations_qty: get(locations, 'length', 0) as number,
    max_locations_qty: get(account_profile_data, 'max_locations', null) as Nullable<number>,
    is_only_one_location: locations && locations.length === 1,
    additional_location_price: get(current_account_plan, 'additional_location_price', null) as Nullable<number>,
  }),
);

export const selectIsOnlyOneLocation = createSelector(
  selectLocationsCombinedData,
  ({ locations }) => locations && locations.length === 1,
);

export const selectMaxLocationQty = createSelector(
  selectLocationsCombinedData,
  ({ max_locations_qty }): number => max_locations_qty,
);

export const getResolveLocationId = getNestedParam<string>('location_id');

export const selectSpecificLocation = createSelector(
  selectLocationsState,
  getResolveLocationId,
  (state: ILocationsState, location_id: string): ILocation =>
    location_id && state?.locations?.find((l) => l.id === location_id),
);
