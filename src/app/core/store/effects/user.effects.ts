// import { Injectable } from '@angular/core';
// import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
// import { map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

// import { IValidatePasswordReq, IValidatePasswordRes, ToasterService, UserService } from '@app/core/services';
// import {
//   IChangePasswordReq,
//   ICoreModuleState,
//   IResendOnboardingInviteReq,
//   IResendOnboardingInviteRes,
//   IUploadAvatarReq,
//   IUploadAvatarRes,
//   IUserProfile,
//   IValidateOnboardingEmailTokenReq,
//   IValidateOnboardingEmailTokenRes,
//   Locations,
// } from '@app/interfaces';
// import { ResultState } from '@app/shared/constants';
// import { effectsResponseHandler, get, showResultStateMsgOperator } from '@app/shared/helpers';

// import { changeCurrentLocationAction } from '@app/core/store/actions/locations.actions';
// import { selectLocations } from '@app/core/store/selectors';
// import { select, Store } from '@ngrx/store';
// import { UPDATE_PASSWORD_SUCCESS_MSG, USER_PROFILE_UPDATED_SUCCESS_MSG } from '../../constants/messages';
// import * as UserActions from '../actions/user.actions';
// import { UsersService } from '../../services/users/users.service';

// @Injectable()
// export class UserEffects {
//   constructor(
//     private actions$: Actions,
//     private usersService: UsersService,
//     // private toasterService: ToasterService,
//     private store: Store<ICoreModuleState>,
//   ) {}

//   @Effect()
//   getActiveUsersEffect$ = this.actions$.pipe(
//     ofType(UserActions.getActiveUsersAction),
//     switchMap(() => {
//       return this.usersService.getUserById('dd').pipe(
//         effectsResponseHandler,
//         map((data: any) => {
//           return UserActions.susccessActiveUsersAction(data);
//         }),
//       );
//     }),
//   );

//   // getUserProfileData$ = createEffect(() =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.getProfileDataAction),
//   //     switchMap(() =>
//   //       this.userService.getUserProfileData().pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService }),
//   //         tap((payload: ResultState<IUserProfile | null>) => this.userService.saveUserDataInStorage(payload.result)),
//   //         map((payload: ResultState<IUserProfile | null>) => {
//   //           if (payload.result) {
//   //             (window as any).Intercom('update', {
//   //               app_id: 'cv9etcib',
//   //               name: payload.result.name,
//   //               email: payload.result.email_address,
//   //               user_id: payload.result.id,
//   //               user_hash: payload.result.intercom_token,
//   //             });
//   //           }
//   //           return payload.result
//   //             ? UserActions.getProfileDataSuccessAction(payload)
//   //             : UserActions.getProfileDataFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // updateLocation$ = createEffect(
//   //   () =>
//   //     this.actions$.pipe(
//   //       ofType(UserActions.getProfileDataSuccessAction),
//   //       withLatestFrom(this.store.pipe(select(selectLocations))),
//   //       tap(([payload, locations]: [ResultState<IUserProfile>, Locations]) => {
//   //         return this.store.dispatch(
//   //           changeCurrentLocationAction({ current_location: payload.result.default_location_id || locations?.[0].id }),
//   //         );
//   //       }),
//   //     ),
//   //   {
//   //     dispatch: false,
//   //   },
//   // );

//   // uploadUserAvatar$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.UPLOAD_AVATAR),
//   //     switchMap((req: IUploadAvatarReq) =>
//   //       this.userService.uploadAvatar(req).pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService }),
//   //         map((payload: ResultState<IUploadAvatarRes | null>) => {
//   //           return payload.result
//   //             ? UserActions.uploadAvatarSuccessAction(payload)
//   //             : UserActions.uploadAvatarFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // changePassword$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.CHANGE_PASSWORD),
//   //     switchMap((req: IChangePasswordReq) =>
//   //       this.userService.changePassword(req).pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService, success: UPDATE_PASSWORD_SUCCESS_MSG }),
//   //         map((payload: ResultState<object | null>) => {
//   //           return payload.result
//   //             ? UserActions.changePasswordSuccessAction(payload)
//   //             : UserActions.changePasswordFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // updateProfile$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.UPDATE_PROFILE),
//   //     switchMap((req: IUserProfile) =>
//   //       this.userService.updateProfile(req).pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService, success: USER_PROFILE_UPDATED_SUCCESS_MSG }),
//   //         map((payload: ResultState<IUserProfile | null>) => {
//   //           return payload.result
//   //             ? UserActions.updateProfileSuccessAction(payload)
//   //             : UserActions.updateProfileFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // /**
//   //  *  Request for updating the user profile in a partial way.
//   //  *  If the request fails, a message is shown to the user.
//   //  */
//   // partialUpdateUserProfile$ = createEffect(() => {
//   //   return this.actions$.pipe(
//   //     ofType(UserActions.partialUpdateUserProfile),
//   //     switchMap((partialUserProfile) => {
//   //       return this.userService.partialUpdateProfile(partialUserProfile).pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService }),
//   //         map((res) => {
//   //           return UserActions.partialUpdateUserProfileSuccess(res);
//   //         }),
//   //       );
//   //     }),
//   //   );
//   // });

//   // resendOnboardingInvite$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.RESEND_ONBOARDING_INVITE),
//   //     switchMap((req: IResendOnboardingInviteReq) =>
//   //       this.userService.resendOnboardingInvite(req).pipe(
//   //         effectsResponseHandler,
//   //         showResultStateMsgOperator({ service: this.toasterService }),
//   //         map((payload: ResultState<IResendOnboardingInviteRes | null>) => {
//   //           const email_address = get(payload, 'result.valid');
//   //           return email_address
//   //             ? UserActions.resendOnboardingInviteSuccessAction({ ...payload, result: { email_address } })
//   //             : UserActions.resendOnboardingInviteFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // validateOnboardingEmailToken$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.VALIDATE_ONBOARDING_EMAIL_TOKEN),
//   //     switchMap((req: IValidateOnboardingEmailTokenReq) =>
//   //       this.userService.validateOnboardingEmailToken(req).pipe(
//   //         effectsResponseHandler,
//   //         map((payload: ResultState<IValidateOnboardingEmailTokenRes | null>) => {
//   //           return payload.result
//   //             ? UserActions.validateOnboardingEmailTokenSuccessAction(payload)
//   //             : UserActions.validateOnboardingEmailTokenFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );

//   // validatePassword$ = createEffect((): any =>
//   //   this.actions$.pipe(
//   //     ofType(UserActions.ACTION_TYPES.VALIDATE_PASSWORD),
//   //     switchMap((req: IValidatePasswordReq) =>
//   //       this.userService.checkPassword(req).pipe(
//   //         effectsResponseHandler,
//   //         map((payload: ResultState<IValidatePasswordRes | null>) => {
//   //           return payload.result
//   //             ? UserActions.validatePasswordSuccessAction(payload)
//   //             : UserActions.validatePasswordFailureAction(payload as ResultState<null>);
//   //         }),
//   //       ),
//   //     ),
//   //   ),
//   // );
// }
