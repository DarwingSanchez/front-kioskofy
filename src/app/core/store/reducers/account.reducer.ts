import { IArchiveAccountUserRes, IReactivateAccountUserRes } from '@app/core/services';
import {
  IAccountData,
  IAccountLockedCounts,
  IAccountPlan,
  IAccountUser,
  IInvitedUser,
  IInvitedUserProfile,
  ILockObjects,
  IPaymentMethod,
  IStripeFailureRes,
} from '@app/interfaces';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { Action, createReducer, on } from '@ngrx/store';
import * as AccountActions from '../actions/account.actions';
import * as AuthActions from '../actions/auth.actions';
import * as AccountSettingsActions from '@app/modules/lazy-routable/account_settings/store/actions/account-settings.actions';

export interface IAccountState {
  account_profile_data: IAccountData;
  account_plans: IAccountPlan[];
  current_account_plan: any;
  account_users: IAccountUser[];
  invited_users: IInvitedUser[];
  invited_user: IInvitedUserProfile;
  archived_users: IAccountUser[];
  locked_objects: ILockObjects;
  callState: CallState;
  counts: IAccountLockedCounts;
  countsPending: boolean;
}

const initialState: IAccountState = {
  account_profile_data: null,
  account_plans: null,
  current_account_plan: null,
  account_users: null,
  invited_users: null,
  invited_user: null,
  archived_users: null,
  locked_objects: null,
  callState: LoadingState.INIT,
  counts: null,
  countsPending: false,
};

const accountReducer = createReducer<IAccountState, Action>(
  initialState,

  on(AuthActions.logoutSuccessAction, () => initialState),

  // CORE ACCOUNT

  on(AccountActions.createAccountProfileAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.createAccountProfileSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountData>) => ({
      ...state,
      account_profile_data: result,
      callState,
    }),
  ),
  on(AccountActions.createAccountProfileFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getAccountProfileDataAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.getAccountProfileDataSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountData>) => ({
      ...state,
      account_profile_data: result,
      callState,
    }),
  ),
  on(AccountActions.getAccountProfileDataFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getAccountPlansAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.getAccountPlansSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountPlan[]>) => ({
      ...state,
      account_plans: result,
      callState,
    }),
  ),
  on(AccountActions.getAccountPlansFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getCurrentAccountPlanAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.getCurrentAccountPlanSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<any>) => ({
      ...state,
      current_account_plan: result,
      callState,
    }),
  ),
  on(AccountActions.getCurrentAccountPlanFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.setAccountPaymentMethodAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.setAccountPaymentMethodSuccessAction,
    (
      state: IAccountState,
      { result, callState }: ResultState<{ payment_methods: IPaymentMethod[]; stripe_error: IStripeFailureRes }>,
    ) => ({ ...state, account_profile_data: { ...state.account_profile_data, ...result }, callState }),
  ),
  on(AccountActions.setAccountPaymentMethodFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  // ACCOUNT USERS

  on(AccountActions.getAccountUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.getAccountUsersSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({
      ...state,
      account_users: result,
      callState,
    }),
  ),
  on(AccountActions.getAccountUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.updateAccountUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.updateAccountUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({
      ...state,
      account_users: result,
      callState,
    }),
  ),
  on(AccountActions.updateAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.archiveAccountUserAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.archiveAccountUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IArchiveAccountUserRes>) => ({
      ...state,
      ...result,
      callState,
    }),
  ),
  on(AccountActions.archiveAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getArchivedUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.getArchivedUsersSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IAccountUser[]>) => ({
      ...state,
      archived_users: result,
      callState,
    }),
  ),
  on(AccountActions.getArchivedUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.reactivateAccountUserAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.reactivateAccountUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IReactivateAccountUserRes>) => ({
      ...state,
      ...result,
      callState,
    }),
  ),
  on(AccountActions.reactivateAccountUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getUserDataByInviteTokenAction, (state: IAccountState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AccountActions.getUserDataByInviteTokenSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IInvitedUserProfile>) => ({
      ...state,
      invited_user: result,
      callState,
    }),
  ),
  on(AccountActions.getUserDataByInviteTokenFailureAction, (state: IAccountState) => ({
    ...state,
    callState: { errorMsg: 'User not found' },
  })),

  on(AccountActions.getInvitedUsersAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.getInvitedUsersSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({
      ...state,
      invited_users: result,
      callState,
    }),
  ),
  on(AccountActions.getInvitedUsersFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
  on(AccountActions.inviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.inviteUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({
      ...state,
      invited_users: result,
      callState,
    }),
  ),
  on(AccountActions.inviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.editInviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.editInviteUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({
      ...state,
      invited_users: result,
      callState,
    }),
  ),
  on(AccountActions.editInviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.deleteInviteUserAction, (state: IAccountState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AccountActions.deleteInviteUserSuccessAction,
    (state: IAccountState, { result, callState }: ResultState<IInvitedUser[]>) => ({
      ...state,
      invited_users: result,
      callState,
    }),
  ),
  on(AccountActions.deleteInviteUserFailureAction, (state: IAccountState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AccountActions.getLockedObjectsSuccessAction, (state: IAccountState, { result }: ResultState<ILockObjects>) => ({
    ...state,
    locked_objects: result,
  })),

  on(AccountActions.getLockedObjectsCountsAction, (state: IAccountState) => ({
    ...state,
    countsPending: true,
  })),

  on(AccountActions.getLockedObjectsCountsErrorAction, (state: IAccountState) => ({
    ...state,
    countsPending: false,
  })),

  on(
    AccountActions.getLockedObjectsCountsSuccessAction,
    (state: IAccountState, { result }: ResultState<IAccountLockedCounts>) => ({
      ...state,
      counts: result,
      countsPending: false,
    }),
  ),

  on(AccountSettingsActions.successAction, (state: IAccountState, action) => ({
    ...state,
    account_profile_data: {
      ...state.account_profile_data,
      ...action,
    },
  })),
);

export default function (state: IAccountState, action: Action): IAccountState {
  return accountReducer(state, action);
}
