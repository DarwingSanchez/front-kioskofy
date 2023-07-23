import { ICoreModuleState } from '@app/interfaces';
import { createSelector } from '@ngrx/store';
import { IGetShoppingListPreviewState } from '@app/core/store/reducers/shopping-preview.reducer';
import { LoadingState } from '@app/shared/constants';

// get shopping list preview selectors
export const selectGetShoppingListPreviewState = (state: ICoreModuleState): IGetShoppingListPreviewState =>
  state.shoppingPreview;
export const selectGetShoppingListPreviewData = createSelector(
  selectGetShoppingListPreviewState,
  (state: IGetShoppingListPreviewState) => state.data,
);
export const selectGetShoppingListPreviewCallState = createSelector(
  selectGetShoppingListPreviewState,
  (state: IGetShoppingListPreviewState) => state.callState,
);
export const selectGetShoppingListPreviewLoading = createSelector(
  selectGetShoppingListPreviewState,
  (state: IGetShoppingListPreviewState) => state.callState === LoadingState.LOADING,
);
