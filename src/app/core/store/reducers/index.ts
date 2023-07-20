import { InjectionToken } from '@angular/core';
import { ROUTER_FEATURE_NAME, RouterFeatureState } from '@app/core/store/reducers/router.reducer';
import { ORDER_STATE_FEATURE_NAME, OrderFeatureState } from '@app/modules/lazy-routable/order/store/reducers';
import { ORDER_LIST_STATE_FEATURE_NAME, OrderListFeatureState } from '@app/modules/lazy-routable/orders/store/reducers';
import { routerReducer } from '@ngrx/router-store';
import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import OnboardingReducer, {
  IOnboardingState,
} from '../../../modules/lazy-routable/onboarding/store/reducers/onboarding.reducer';
import {
  SHOPPING_LIST_STATE_FEATURE_NAME,
  ShoppingListFeatureState,
} from '../../../modules/lazy-routable/shopping-list/store/reducers';
import AccountState, { IAccountState } from './account.reducer';
import ActivityState, { IActivityFeedState } from './acivity-feed.reducer';
import CorePageState, { ICorePageState } from './core-page.reducer';
import LocationsState, { ILocationsState } from './locations.reducer';
import NotificationsState, { INotificationsState } from './notifications.reducer';
import GetShoppingListPreviewState, { IGetShoppingListPreviewState } from './shopping-preview.reducer';
import UserState, { IUserState } from './user.reducer';
import VendorStateReducer, { VendorState } from './vendor.reducer';
import NotesStateReducer, { NotesState } from './notes.reducer';
import recentActivityReducer, { IRecentActivityState } from '@app/core/store/reducers/recent-activity.reducer';
import {
  PRODUCT_STATE_FEATURE_NAME,
  ProductFeatureState,
} from '@app/modules/lazy-routable/marketplace/store/reducers/reducer';
import storageLocationReducer, {
  IStorageLocationsState,
} from '../../../modules/lazy-routable/locations/components/storage-location/store/reducers/storage-locations.reducer';

export interface ICoreModuleState {
  user: IUserState;
  account: IAccountState;
  locations: ILocationsState;
  notifications: INotificationsState;
  feed: IActivityFeedState;
  corePage: ICorePageState;
  shoppingPreview: IGetShoppingListPreviewState;
  vendor: VendorState;
  onboarding: IOnboardingState;
  recentActivity: IRecentActivityState;
  notes: NotesState;
  storageLocations: IStorageLocationsState;

  [ROUTER_FEATURE_NAME]: RouterFeatureState;
  [SHOPPING_LIST_STATE_FEATURE_NAME]?: ShoppingListFeatureState;
  [ORDER_STATE_FEATURE_NAME]?: OrderFeatureState;
  [ORDER_LIST_STATE_FEATURE_NAME]?: OrderListFeatureState;
  [PRODUCT_STATE_FEATURE_NAME]?: ProductFeatureState;

  [key: string]: any; // For feature stores
}

export const coreModuleState: ActionReducerMap<ICoreModuleState> = {
  user: UserState,
  account: AccountState,
  locations: LocationsState,
  notifications: NotificationsState,
  feed: ActivityState,
  corePage: CorePageState,
  shoppingPreview: GetShoppingListPreviewState,
  vendor: VendorStateReducer,
  onboarding: OnboardingReducer,
  recentActivity: recentActivityReducer,
  notes: NotesStateReducer,
  storageLocations: storageLocationReducer,

  [ROUTER_FEATURE_NAME]: routerReducer,
};

export function resetState(reducer: ActionReducer<ICoreModuleState>): ActionReducer<ICoreModuleState> {
  return (state: ICoreModuleState, action: Action): ICoreModuleState => {
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [resetState];

export const coreModuleStateToken = new InjectionToken<ActionReducerMap<ICoreModuleState>>('CORE_MODULE_STATE');
