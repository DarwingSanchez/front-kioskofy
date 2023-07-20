import { createSelector } from '@ngrx/store';
import { LoadingState } from '@app/shared/constants';
import { IUserState } from '../reducers/user.reducer';
import { ICoreModuleState } from '../reducers';
import { IRole, IUserProfile } from '@app/interfaces';

export const selectUserState = (state: ICoreModuleState): IUserState => state?.user;

export const selectUserLoading = createSelector(
  selectUserState,
  (state: IUserState) => state?.callState === LoadingState.LOADING,
);

export const selectIsUserProfileLoaded = createSelector(
  selectUserState,
  ({ isUserProfileLoaded }: IUserState) => isUserProfileLoaded,
);

export const selectUserPasswordResetData = createSelector(
  selectUserState,
  (state: IUserState) => state?.password_reset_data,
);

export const selectUserProfile = createSelector(selectUserState, (state: IUserState) => ({
  ...state?.user_profile,
  avatar: state?.user_profile?.avatar,
}));

export const selectUserRole = createSelector(selectUserProfile, (profile: IUserProfile): IRole => profile.role);
export const selectUserEmail = createSelector(
  selectUserState,
  (state: IUserState): string => state?.user_profile && state?.user_profile.email_address,
);

export const selectUserOnboarding = createSelector(
  selectUserState,
  (state: IUserState) => state?.user_profile && state?.user_profile.onboarding,
);

export const selectOnboardingEmailVerifyRes = createSelector(
  selectUserState,
  (state: IUserState) => state?.onboarding_email_verify_res,
);

export const selectPasswordVerifyRes = createSelector(
  selectUserState,
  (state: IUserState) => state?.update_password_data.password_verified,
);

export const selectIsPasswordChanged = createSelector(
  selectUserState,
  (state: IUserState) => state?.update_password_data.password_changed,
);

export const selectActiveUsers = createSelector(selectUserState, (state: IUserState) => state?.activeUsers);
