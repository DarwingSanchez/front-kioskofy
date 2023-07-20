import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { IGetShoppingListPreviewResponse } from '@app/modules/lazy-routable/shopping-list/interfaces';
import {
  clearGetShoppingListPreviewAction,
  getShoppingListPreviewAction,
  getShoppingListPreviewFailureAction,
  getShoppingListPreviewSuccessAction,
} from '@app/core/store/actions/shopping-preview.actions';

export interface IGetShoppingListPreviewState {
  data: IGetShoppingListPreviewResponse;
  callState: CallState;
}

const getShoppingListPreviewInitialState: IGetShoppingListPreviewState = {
  data: {
    shopping_list_products: [],
    total: 0,
  },
  callState: LoadingState.INIT,
};

const getShoppingListPreviewReducer = createReducer<IGetShoppingListPreviewState, Action>(
  getShoppingListPreviewInitialState,
  on(getShoppingListPreviewAction, (state: IGetShoppingListPreviewState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    getShoppingListPreviewSuccessAction,
    (state: IGetShoppingListPreviewState, { result, callState }: ResultState<IGetShoppingListPreviewResponse>) => ({
      ...state,
      data: result,
      callState,
    }),
  ),
  on(getShoppingListPreviewFailureAction, (state: IGetShoppingListPreviewState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
  on(clearGetShoppingListPreviewAction, (state: IGetShoppingListPreviewState) => ({
    ...state,
    data: {
      shopping_list_products: [],
      total: 0,
    },
  })),
);

export default function (
  state: IGetShoppingListPreviewState = getShoppingListPreviewInitialState,
  actions: Action,
): IGetShoppingListPreviewState {
  return getShoppingListPreviewReducer(state, actions);
}
