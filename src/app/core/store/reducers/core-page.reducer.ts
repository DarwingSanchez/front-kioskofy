import { Action, createReducer, on } from '@ngrx/store';
import { IRole, ICurrency, Currencies } from '@app/interfaces';
import * as CorePageActions from '@app/core/store/actions/core-page.actions';
import { ResultState } from '@app/shared/constants';

export interface ICorePageState {
  roles: IRole[];
  currencies: Currencies;
}

const initialState: ICorePageState = {
  roles: null,
  currencies: null,
};

const corePageReducer = createReducer<ICorePageState, Action>(
  initialState,

  on(CorePageActions.getRolesSuccessAction, (state: ICorePageState, { result }: ResultState<IRole[]>) => ({
    ...state,
    roles: result,
  })),
  on(CorePageActions.getCurrenciesSuccessAction, (state: ICorePageState, { result }: ResultState<ICurrency[]>) => ({
    ...state,
    currencies: result,
  })),
);

export default function (state: ICorePageState = initialState, action: Action) {
  return corePageReducer(state, action);
}
