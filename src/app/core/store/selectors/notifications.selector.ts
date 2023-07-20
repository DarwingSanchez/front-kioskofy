import { createSelector } from '@ngrx/store';
import { ICoreModuleState } from '../reducers';
import { INotificationsState } from '../reducers/notifications.reducer';

export const selectNotificationsState = (state: ICoreModuleState): INotificationsState => state.notifications;

export const selectNotifications = createSelector(
  selectNotificationsState,
  (state: INotificationsState) => state.notifications,
);

export const selectNewNotificationsCount = createSelector(
  selectNotificationsState,
  (state: INotificationsState) => state.new,
);
