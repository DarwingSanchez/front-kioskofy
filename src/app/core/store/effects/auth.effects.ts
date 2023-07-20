import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of, throwError } from 'rxjs';
import { catchError, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  BASE_URL,
  DEFAULT_ERROR_MSG,
  DIALOG_SIZES,
  EMAIL_IS_USED_MSG,
  LoadingState,
  LOGIN_URL,
  ResultState,
  ToastTypes,
} from '@app/shared/constants';
import {
  AuthService,
  ICheckIfEmailAddressInUseReq,
  ICheckIfEmailAddressInUseRes,
  ILoginReq,
  ILoginRes,
  ILogout,
  IPasswordResetReq,
  IRemindPasswordReq,
  IUserRegisterReq,
  IValidateResetTokenReq,
  IValidateResetTokenRes,
  RedirectService,
  SocketService,
  ToasterService,
  UserService,
} from '@app/core/services';
import { IInfoModalData, InfoModalComponent } from '@app/modules/ui-elements';
import { effectsResponseHandler, get, getHttpResponseErrorMsg, showResultStateMsgOperator } from '@app/shared/helpers';

import {
  FORGOT_PASSWORD_MODAL_BTN_NAME,
  FORGOT_PASSWORD_MODAL_MSG,
  FORGOT_PASSWORD_MODAL_TITLE,
  RESET_PASSWORD_MODAL_TITLE,
  RESET_PASSWORD_SUCCESS_MSG,
  RESET_TOKEN_INVALID_MSG,
} from '../../constants/messages';
import * as AuthActions from '../actions/auth.actions';
import { Action, Store } from '@ngrx/store';
import { ICoreModuleState } from '@app/core/store';
import { navigateByUrlAction } from '@app/core/store/actions/navigate.actions';

@Injectable()
export class AuthEffects {
  login$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginAction),
      mergeMap((req: ILoginReq) =>
        this.authService.login(req).pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService }),
          map((payload: ResultState<ILoginRes | null>) => {
            if (!payload.result) {
              return AuthActions.loginFailureAction(payload as ResultState<null>);
            }
            this.userService.saveTokenInStorage(get(payload.result, 'token'));
            this.userService.saveUserDataInStorage(get(payload.result, 'user'));
            this.socketService.init();
            this._store.dispatch(navigateByUrlAction({ url: BASE_URL }));
            return AuthActions.loginSuccessAction(payload);
          }),
        ),
      ),
    ),
  );
  logout$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutAction),
      mergeMap(() => this.redirectService.executeRedirectCallback()),
      filter((canLogout: boolean) => canLogout),
      filter(() => this.userService.isCredentialsInStorage()),
      switchMap(() =>
        this.authService.logout().pipe(
          map((data: ILogout) => AuthActions.logoutSuccessAction(data)),
          catchError((error: HttpErrorResponse) => of(AuthActions.logoutFailureAction(error))),
        ),
      ),
      catchError((error) => throwError(error)),
    ),
  );
  removeAndRedirectAfterLogoutSuccess$: Observable<unknown> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccessAction),
        tap(() => {
          this.userService.removeAllDataFromStorage();
          this._store.dispatch(navigateByUrlAction({ url: LOGIN_URL }));
          this.socketService.shutdown();
        }),
      ),
    { dispatch: false },
  );
  showErrorAfterLogoutError$: Observable<unknown> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutFailureAction),
        tap(() => this.toasterService.pop(DEFAULT_ERROR_MSG, ToastTypes.error)),
      ),
    { dispatch: false },
  );
  signin$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ACTION_TYPES.SIGNIN),
      mergeMap((req: IUserRegisterReq) =>
        this.authService.validateEmailAddress({ email_address: req.email_address }).pipe(
          switchMap((res: ICheckIfEmailAddressInUseRes | null) => {
            if (res && !res.email_address_used) {
              return this.authService.signin(req).pipe(effectsResponseHandler);
            }
            const errorMsg = EMAIL_IS_USED_MSG;
            this.toasterService.pop(errorMsg, ToastTypes.error);
            return of({ result: null, callState: { errorMsg } });
          }),
          map((payload: ResultState<ILoginRes | null>) => {
            if (!payload.result) {
              return AuthActions.signinFailureAction(payload as ResultState<null>);
            }
            this.userService.saveTokenInStorage(payload.result.token);
            this.userService.saveUserDataInStorage(get(payload.result, 'user'));
            this.router.navigateByUrl(BASE_URL);
            return AuthActions.signinSuccessAction(payload);
          }),
        ),
      ),
    ),
  );
  remindPassword$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ACTION_TYPES.REMIND_PASSWORD),
      mergeMap((req: IRemindPasswordReq) =>
        this.authService.forgot(req).pipe(
          map(() => null),
          catchError((err: HttpErrorResponse) => {
            const errorMsg = getHttpResponseErrorMsg(err);
            if (errorMsg) {
              this.toasterService.pop(errorMsg, ToastTypes.error);
            }
            return of(errorMsg);
          }),
          switchMap((errorMsg: string | null) =>
            !errorMsg
              ? this.openInfoModal({
                  titles: [FORGOT_PASSWORD_MODAL_TITLE, `${FORGOT_PASSWORD_MODAL_MSG} ${req.email_address}`],
                  btnNames: [null, FORGOT_PASSWORD_MODAL_BTN_NAME],
                }).pipe(map(() => null))
              : of(errorMsg),
          ),
          tap((errorMsg: string | null) => !errorMsg && this.router.navigateByUrl(LOGIN_URL)),
          map((errorMsg: string | null) =>
            errorMsg
              ? { type: AuthActions.ACTION_TYPES.REMIND_PASSWORD_FAILURE }
              : { type: AuthActions.ACTION_TYPES.REMIND_PASSWORD_SUCCESS },
          ),
        ),
      ),
    ),
  );
  reset$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ACTION_TYPES.RESET_PASSWORD),
      mergeMap((req: IPasswordResetReq) =>
        this.authService.resetPassword(req).pipe(
          catchError((err: HttpErrorResponse) => of(getHttpResponseErrorMsg(err))),
          switchMap((errorMsg: string | null) =>
            errorMsg
              ? of(errorMsg)
              : this.openInfoModal({
                  titles: [RESET_PASSWORD_MODAL_TITLE, RESET_PASSWORD_SUCCESS_MSG],
                  btnNames: [null, 'OK'],
                }).pipe(map(() => null)),
          ),
          tap(() => this.router.navigateByUrl(LOGIN_URL)),
          map((errorMsg: string | null) =>
            errorMsg
              ? AuthActions.resetPasswordFailureAction({ result: null, callState: { errorMsg } })
              : AuthActions.resetPasswordSuccessAction({ result: null, callState: LoadingState.LOADED }),
          ),
        ),
      ),
    ),
  );
  checkIfEmailAddressUsed$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ACTION_TYPES.CHECK_IF_EMAIL_ADDRESS_IN_USE),
      mergeMap((req: ICheckIfEmailAddressInUseReq) =>
        this.authService.validateEmailAddress(req).pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService }),
          map((payload: ResultState<ICheckIfEmailAddressInUseRes | null>) =>
            payload.result
              ? AuthActions.checkIfEmailAddressInUseSuccessAction(payload)
              : AuthActions.checkIfEmailAddressInUseFailureAction(payload as ResultState<null>),
          ),
        ),
      ),
    ),
  );
  validateResetToken$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.ACTION_TYPES.VALIDATE_RESET_TOKEN),
      mergeMap((req: IValidateResetTokenReq) =>
        this.authService.validateResetToken(req).pipe(
          effectsResponseHandler,
          showResultStateMsgOperator({ service: this.toasterService }),
          map((payload: ResultState<IValidateResetTokenRes | null>) => {
            if (!payload.result) {
              this.router.navigateByUrl(BASE_URL);
              return AuthActions.validateResetTokenFailureAction(payload as ResultState<null>);
            }
            if (!payload.result.valid) {
              this.toasterService.pop(RESET_TOKEN_INVALID_MSG, ToastTypes.error);
              this.router.navigateByUrl(BASE_URL);
              return AuthActions.validateResetTokenFailureAction({
                result: null,
                callState: { errorMsg: RESET_TOKEN_INVALID_MSG },
              });
            }
            return AuthActions.validateResetTokenSuccessAction(payload);
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private toasterService: ToasterService,
    private userService: UserService,
    private router: Router,
    private readonly _store: Store<ICoreModuleState>,
    private dialog: MatDialog,
    private socketService: SocketService,
    private redirectService: RedirectService,
  ) {}

  private openInfoModal(data: IInfoModalData): Observable<any> {
    return this.dialog.open(InfoModalComponent, { width: DIALOG_SIZES.MD, data }).afterClosed();
  }
}
