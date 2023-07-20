import { ICoreModuleState } from '@app/interfaces';
import { createSelector } from '@ngrx/store';
import { VendorState } from '@app/core/store/reducers/vendor.reducer';

export const selectVendorState = (state: ICoreModuleState): VendorState => state.vendor;

export const selectMyVendors = createSelector(selectVendorState, (state: VendorState) => state?.my_vendors);
export const selectMyVendorsLength = createSelector(
  selectVendorState,
  (state: VendorState) => state?.my_vendors?.length,
);
export const selectGlobalVendors = createSelector(selectVendorState, (state: VendorState) => state?.global_vendors);
export const selectGlobalVendorsLength = createSelector(
  selectVendorState,
  (state: VendorState) => state?.global_vendors?.length,
);
export const isNoResults = createSelector(
  selectMyVendorsLength,
  selectGlobalVendorsLength,
  (myVendorsLength, globalVendorsLength) => !myVendorsLength && !globalVendorsLength,
);

export const selectMyVendorsList = createSelector(
  selectVendorState,
  (myVendors: VendorState) => myVendors?.my_vendors_list,
);

export const selectLastSearchRequest = createSelector(
  selectVendorState,
  (state: VendorState): string => state?.searchRequest,
);
