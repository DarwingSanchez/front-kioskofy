import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

import { ActivatedRouteSnapshot, Params } from '@angular/router';

import { ICoreModuleState } from '@app/core/store';

import { ROUTER_FEATURE_NAME } from '@app/core/store/reducers/router.reducer';

import * as fromRouterStore from '@ngrx/router-store';

export const getRouterFeatureState = createFeatureSelector<ICoreModuleState, RouterReducerState<any>>(
  ROUTER_FEATURE_NAME,
);

export const {
  selectCurrentRoute: getCurrentRoute,
  selectQueryParams: getQueryParams,
  selectQueryParam: getQueryParam,
  selectRouteParams: getRouteParams,
  selectRouteParam: getRouteParam,
  selectRouteData: getRouteData,
  selectUrl: getUrl,
} = fromRouterStore.getSelectors(getRouterFeatureState);

export const selectRouteNestedParams = createSelector(
  getRouterFeatureState,
  (routerState: RouterReducerState<any>): Params => {
    let currentRoute: ActivatedRouteSnapshot = routerState?.state?.root;
    let params: Params = {};

    while (currentRoute?.firstChild) {
      currentRoute = currentRoute.firstChild;
      params = {
        ...params,
        ...currentRoute.params,
      };
    }

    return params;
  },
);

export const getNestedParam = <T>(param: string): MemoizedSelector<Params, T> =>
  createSelector(selectRouteNestedParams, (params: Params) => params[param]);

export const getUrlPath = createSelector(
  getCurrentRoute,
  <T extends string>(route: ActivatedRouteSnapshot): T => (route.routeConfig.path as unknown) as T,
);
