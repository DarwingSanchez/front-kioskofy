import * as actions from '@app/core/store/actions/vendor.actions';
import { SearchVendor } from '@app/interfaces';
import { Action, createReducer, on } from '@ngrx/store';

export interface VendorState {
  my_vendors: SearchVendor[];
  global_vendors: SearchVendor[];
  my_vendors_list: SearchVendor[];
  searchRequest: string;
}

const initialState: VendorState = {
  my_vendors: [],
  global_vendors: [],
  my_vendors_list: [],
  searchRequest: '',
};

const getVendorReducer = createReducer<VendorState, Action>(
  initialState,
  on(actions.searchVendorsSuccessAction, (state: VendorState, result: VendorState) => ({
    ...state,
    ...result,
    my_vendors: result?.my_vendors?.map((item) => ({ ...item, global: false })),
    global_vendors: result?.global_vendors?.map((item) => ({ ...item, global: true })),
  })),
  on(actions.getMyVendorsListSuccess, (state: VendorState, { my_vendors }: Partial<VendorState>) => ({
    ...state,
    my_vendors_list: my_vendors,
  })),
  on(actions.resetAction, () => initialState),
);

export default function (state: VendorState = initialState, actions: Action) {
  return getVendorReducer(state, actions);
}
