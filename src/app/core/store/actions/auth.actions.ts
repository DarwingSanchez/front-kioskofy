import { createAction, props } from '@ngrx/store';
import { ResultState } from '@app/shared/constants';
import {
  ILoginReq,
  ILoginRes,
  IUserRegisterReq,
  IRemindPasswordReq,
  IPasswordResetReq,
  IValidateResetTokenReq,
  IValidateResetTokenRes,
  ICheckIfEmailAddressInUseReq,
  ICheckIfEmailAddressInUseRes,
} from '@app/interfaces';
import { createPayload } from '@app/core/utils/store';
import { HttpErrorResponse } from '@angular/common/http';
import { ILogout } from '@app/core/services';

export enum ACTION_TYPES {
  LOGIN = '[CORE AUTH] Login',
  LOGIN_SUCCESS = '[CORE AUTH] Login Success',
  LOGIN_FAILURE = '[CORE AUTH] Login Failure',

  LOGOUT = '[CORE AUTH] Logout',
  LOGOUT_SUCCESS = '[CORE AUTH] Logout Success',
  LOGOUT_FAILURE = '[CORE AUTH] Logout Failure',

  SIGNIN = '[CORE AUTH] Signin',
  SIGNIN_SUCCESS = '[CORE AUTH] Signin Success',
  SIGNIN_FAILURE = '[CORE AUTH] Signin Failure',

  REMIND_PASSWORD = '[CORE AUTH] Remind Password',
  REMIND_PASSWORD_SUCCESS = '[CORE AUTH] Remind Password Success',
  REMIND_PASSWORD_FAILURE = '[CORE AUTH] Remind Password Failure',

  RESET_PASSWORD = '[CORE AUTH] Reset Password',
  RESET_PASSWORD_SUCCESS = '[CORE AUTH] Reset Password Success',
  RESET_PASSWORD_FAILURE = '[CORE AUTH] Reset Password Failure',

  VALIDATE_RESET_TOKEN = '[CORE AUTH] Validate Reset Token',
  VALIDATE_RESET_TOKEN_SUCCESS = '[CORE AUTH] Validate Reset Token Success',
  VALIDATE_RESET_TOKEN_FAILURE = '[CORE AUTH] Validate Reset Token Failure',

  CHECK_IF_EMAIL_ADDRESS_IN_USE = '[CORE AUTH] Check If Email Address In Use',
  CHECK_IF_EMAIL_ADDRESS_IN_USE_SUCCESS = '[CORE AUTH] Check If Email Address In Use Success',
  CHECK_IF_EMAIL_ADDRESS_IN_USE_FAILURE = '[CORE AUTH] Check If Email Address In Use Failure',
}

export const loginAction = createAction(ACTION_TYPES.LOGIN, props<ILoginReq>());
export const loginSuccessAction = createAction(ACTION_TYPES.LOGIN_SUCCESS, props<ResultState<ILoginRes>>());
export const loginFailureAction = createAction(ACTION_TYPES.LOGIN_FAILURE, props<ResultState<null>>());

export const logoutAction = createAction(ACTION_TYPES.LOGOUT);
export const logoutSuccessAction = createAction(ACTION_TYPES.LOGOUT_SUCCESS, createPayload<ILogout>());
export const logoutFailureAction = createAction(ACTION_TYPES.LOGOUT_FAILURE, createPayload<HttpErrorResponse>());

export const signinAction = createAction(ACTION_TYPES.SIGNIN, props<IUserRegisterReq>());
export const signinSuccessAction = createAction(ACTION_TYPES.SIGNIN_SUCCESS, props<ResultState<ILoginRes>>());
export const signinFailureAction = createAction(ACTION_TYPES.SIGNIN_FAILURE, props<ResultState<null>>());

export const remindPasswordAction = createAction(ACTION_TYPES.REMIND_PASSWORD, props<IRemindPasswordReq>());
export const remindPasswordSuccessAction = createAction(ACTION_TYPES.REMIND_PASSWORD_SUCCESS);
export const remindPasswordFailureAction = createAction(ACTION_TYPES.REMIND_PASSWORD_FAILURE);

export const resetPasswordAction = createAction(ACTION_TYPES.RESET_PASSWORD, props<IPasswordResetReq>());
export const resetPasswordSuccessAction = createAction(ACTION_TYPES.RESET_PASSWORD_SUCCESS, props<ResultState<null>>());
export const resetPasswordFailureAction = createAction(ACTION_TYPES.RESET_PASSWORD_FAILURE, props<ResultState<null>>());

export const validateResetTokenAction = createAction(
  ACTION_TYPES.VALIDATE_RESET_TOKEN,
  props<IValidateResetTokenReq>(),
);
export const validateResetTokenSuccessAction = createAction(
  ACTION_TYPES.VALIDATE_RESET_TOKEN_SUCCESS,
  props<ResultState<IValidateResetTokenRes>>(),
);
export const validateResetTokenFailureAction = createAction(
  ACTION_TYPES.VALIDATE_RESET_TOKEN_FAILURE,
  props<ResultState<null>>(),
);

export const checkIfEmailAddressInUseAction = createAction(
  ACTION_TYPES.CHECK_IF_EMAIL_ADDRESS_IN_USE,
  props<ICheckIfEmailAddressInUseReq>(),
);
export const checkIfEmailAddressInUseSuccessAction = createAction(
  ACTION_TYPES.CHECK_IF_EMAIL_ADDRESS_IN_USE_SUCCESS,
  props<ResultState<ICheckIfEmailAddressInUseRes>>(),
);
export const checkIfEmailAddressInUseFailureAction = createAction(
  ACTION_TYPES.CHECK_IF_EMAIL_ADDRESS_IN_USE_FAILURE,
  props<ResultState<null>>(),
);
