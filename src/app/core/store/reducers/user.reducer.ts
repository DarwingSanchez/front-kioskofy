import { Action, createReducer, on } from '@ngrx/store';

import {
  IChangePasswordRes,
  ICheckIfEmailAddressInUseRes,
  ILoginRes,
  IUploadAvatarRes,
  IValidatePasswordRes,
  IValidateResetTokenRes,
} from '@app/core/services';
import { IUserProfile } from '@app/interfaces';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';

import { IActiveUser } from '@app/core/interfaces';
import { Nullable } from '@app/shared/models';
import * as AuthActions from '../actions/auth.actions';
import * as UserActions from '../actions/user.actions';

export interface IUserState {
  user_profile: IUserProfile;
  password_reset_data: Nullable<IValidateResetTokenRes>;
  isUserProfileLoaded: boolean;
  email_address_used: boolean;
  onboarding_email_verify_res: any;
  update_password_data: { password_verified: boolean; password_changed: boolean };
  callState: CallState;
  activeUsers: IActiveUser[];
}
const initialState = {
  user_profile: null,
  password_reset_data: null,
  isUserProfileLoaded: false,
  email_address_used: false,
  onboarding_email_verify_res: null,
  update_password_data: { password_verified: true, password_changed: false },
  callState: LoadingState.INIT,
  activeUsers: [],
};

/**
 * Update the local storage with the user flags
 * @param userProfile - Profile in the store
 */
const updateLocalStorageFlags = (userProfile: IUserProfile): void => {
  localStorage.setItem('show_almost_done', JSON.stringify(userProfile.show_almost_done ?? null));
  localStorage.setItem('show_subtract_modal', JSON.stringify(userProfile.show_subtract_modal ?? null));
  localStorage.setItem('show_stock_count_modal', JSON.stringify(userProfile.show_stock_count_modal ?? null));
};

const userReducer = createReducer<IUserState, Action>(
  initialState,

  on(AuthActions.logoutSuccessAction, () => initialState),

  // CORE USER
  on(UserActions.getActiveUsersAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.susccessActiveUsersAction, (state: IUserState, { result, callState }: ResultState<null>) => ({
    ...state,
    callState,
    activeUsers: result,
  })),
  on(UserActions.getProfileDataAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.getProfileDataSuccessAction, (state: IUserState, { result, callState }: ResultState<IUserProfile>) => {
    updateLocalStorageFlags(result);
    return {
      ...state,
      isUserProfileLoaded: true,
      user_profile: result,
      callState,
    };
  }),
  on(UserActions.partialUpdateUserProfile, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.partialUpdateUserProfileSuccess, (state: IUserState, { result }: ResultState<IUserProfile>) => {
    if (!result) {
      return {
        ...state,
        callState: LoadingState.LOADED,
      };
    }
    updateLocalStorageFlags(result);
    return {
      ...state,
      user_profile: result,
      callState: LoadingState.LOADED,
    };
  }),
  on(UserActions.getProfileDataFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(UserActions.uploadAvatarAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    UserActions.uploadAvatarSuccessAction,
    (state: IUserState, { result, callState }: ResultState<IUploadAvatarRes>) => ({
      ...state,
      user_profile: { ...state.user_profile, avatar: result.avatar_url },
      callState,
    }),
  ),
  on(UserActions.uploadAvatarFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(UserActions.changePasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    UserActions.changePasswordSuccessAction,
    (state: IUserState, { result, callState }: ResultState<IChangePasswordRes>) => ({
      ...state,
      ...result,
      update_password_data: { password_verified: true, password_changed: true },
      callState,
    }),
  ),
  on(UserActions.changePasswordFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
  on(UserActions.cleanChangedPasswordStateAction, (state: IUserState) => ({
    ...state,
    update_password_data: { password_verified: true, password_changed: false },
  })),

  on(UserActions.updateProfileAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(UserActions.updateProfileSuccessAction, (state: IUserState, { result, callState }: ResultState<IUserProfile>) => ({
    ...state,
    user_profile: result,
    callState,
  })),
  on(UserActions.updateProfileFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(UserActions.resendOnboardingInviteAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    UserActions.resendOnboardingInviteSuccessAction,
    (state: IUserState, { result, callState }: ResultState<{ email_address: string }>) => ({
      ...state,
      user_profile: { ...state.user_profile, ...result },
      callState,
    }),
  ),
  on(UserActions.resendOnboardingInviteFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(UserActions.validateOnboardingEmailTokenAction, (state: IUserState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    UserActions.validateOnboardingEmailTokenSuccessAction,
    (state: IUserState, { result, callState }: ResultState<any>) => ({
      ...state,
      onboarding_email_verify_res: result,
      callState,
    }),
  ),
  on(UserActions.validateOnboardingEmailTokenFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(UserActions.validatePasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    UserActions.validatePasswordSuccessAction,
    (state: IUserState, { result, callState }: ResultState<IValidatePasswordRes>) => ({
      ...state,
      update_password_data: { password_verified: result.password_valid, password_changed: false },
      callState,
    }),
  ),
  on(UserActions.validatePasswordFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  // AUTH

  on(AuthActions.loginAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.loginSuccessAction, (state: IUserState, { result, callState }: ResultState<ILoginRes>) => ({
    ...state,
    user_profile: result.user,
    callState,
  })),
  on(AuthActions.loginFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AuthActions.signinAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.signinSuccessAction, (state: IUserState, { result, callState }: ResultState<ILoginRes>) => ({
    ...state,
    user_profile: result.user,
    callState,
  })),
  on(AuthActions.signinFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AuthActions.remindPasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.remindPasswordSuccessAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADED })),
  on(AuthActions.remindPasswordFailureAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADED })),

  on(AuthActions.resetPasswordAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(AuthActions.resetPasswordSuccessAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
  on(AuthActions.resetPasswordFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),

  on(AuthActions.validateResetTokenAction, (state: IUserState) => ({ ...state, callState: LoadingState.LOADING })),
  on(
    AuthActions.validateResetTokenSuccessAction,
    (state: IUserState, { result, callState }: ResultState<IValidateResetTokenRes>) => ({
      ...state,
      password_reset_data: result,
      callState,
    }),
  ),
  on(
    AuthActions.validateResetTokenFailureAction,
    (state: IUserState, { callState }: ResultState<IValidateResetTokenRes>) => ({
      ...state,
      password_reset_data: null,
      callState,
    }),
  ),

  on(AuthActions.checkIfEmailAddressInUseAction, (state: IUserState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    AuthActions.checkIfEmailAddressInUseSuccessAction,
    (state: IUserState, { result, callState }: ResultState<ICheckIfEmailAddressInUseRes>) => ({
      ...state,
      ...result,
      callState,
    }),
  ),
  on(AuthActions.checkIfEmailAddressInUseFailureAction, (state: IUserState, { callState }: ResultState<null>) => ({
    ...state,
    email_address_used: null,
    callState,
  })),
);

export default function (state: IUserState, action: Action) {
  return userReducer(state, action);
}
