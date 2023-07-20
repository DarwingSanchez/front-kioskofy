import { LoadingState } from '@app/shared/constants';
import { get } from '@app/shared/helpers';
import { createSelector } from '@ngrx/store';
import { IAccountData } from '@app/interfaces';
import { ICoreModuleState } from '../reducers';
import { IAccountState } from '../reducers/account.reducer';
import { selectUserProfile } from '@app/core/store/selectors/user.selector';
import { ROLES_FOR_APPROVAL } from '@app/core/interfaces';

export const selectAccountState = (state: ICoreModuleState): IAccountState => state?.account;

export const selectAccountProfileData = createSelector(
  selectAccountState,
  (state: IAccountState): IAccountData => state?.account_profile_data,
);

export const selectOrderAreReconciled = createSelector(
  selectAccountState,
  (state: IAccountState): boolean => state?.account_profile_data?.orders_are_reconciled,
);

export const selectAccountMaxLocations = createSelector(
  selectAccountState,
  (state: IAccountState): number => state?.account_profile_data && state?.account_profile_data?.max_locations,
);

export const selectLockedObjectsCounts = createSelector(selectAccountState, (state: IAccountState) => state.counts);
export const selectLockedObjectsCountsPending = createSelector(
  selectAccountState,
  (state: IAccountState) => state.countsPending,
);

export const selectAccountPlans = createSelector(selectAccountState, (state: IAccountState) => state?.account_plans);

export const selectCurrentAccountPlan = createSelector(
  selectAccountState,
  (state: IAccountState) => state?.current_account_plan,
);

export const selectAccountUsers = createSelector(selectAccountState, (state: IAccountState) => state?.account_users);

export const selectManagersAccountUsers = createSelector(selectAccountUsers, selectUserProfile, (accounts, user) => {
  return (accounts || []).filter((account) => {
    return account.id !== user.id && ROLES_FOR_APPROVAL.includes(account?.role?.role_name);
  });
});

export const selectInvitedUsers = createSelector(selectAccountState, (state: IAccountState) => state?.invited_users);

export const selectInvitedUser = createSelector(selectAccountState, (state: IAccountState) => state?.invited_user);

export const selectAccountCallState = createSelector(selectAccountState, (state: IAccountState) => state?.callState);

export const selectIsAccountLoading = createSelector(
  selectAccountState,
  (state: IAccountState) => state?.callState === LoadingState.LOADING,
);

export const selectArchivedUsers = createSelector(selectAccountState, (state: IAccountState) => state?.archived_users);

export const selectAccountData = createSelector(
  selectAccountState,
  (state: IAccountState): IAccountData => state?.account_profile_data,
);

export const selectAccountPaymentData = createSelector(selectAccountState, (state: IAccountState) => ({
  payment_methods: get(state, 'account_profile_data.payment_methods', null),
  stripe_error: get(state, 'account_profile_data.stripe_error', null),
}));

export const selectLockedObjects = createSelector(selectAccountState, (state: IAccountState) => state?.locked_objects);
