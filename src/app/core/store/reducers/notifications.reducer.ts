import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { INotification } from '@app/interfaces';
import { INotificationsRes } from '@app/core/services';
import * as NotificationsActions from '../actions/notifications.actions';

export interface INotificationsState {
  notifications: INotification[];
  new: number;
  callState: CallState;
}

function getUnreadCount(notifications: INotification[]): number {
  return notifications.filter((n) => !n.read).length;
}

function mapNotifications(result: INotificationsRes, state: INotificationsState) {
  let notifications = [];
  if (result.notifications.length === 1) {
    const updatedNotification = result.notifications[0];
    notifications = Object.values(state.notifications).map((n) =>
      n.id === updatedNotification.id ? updatedNotification : n,
    );
  } else {
    notifications = Object.values(state.notifications).map((n) => {
      const res = result.notifications.find((a) => a.id === n.id);
      return res || n;
    });
  }
  return notifications;
}

const initialState: INotificationsState = {
  notifications: [],
  new: 0,
  callState: LoadingState.INIT,
};

const notificationsReducer = createReducer<INotificationsState, Action>(
  initialState,
  on(NotificationsActions.getNotificationsAction, (state: INotificationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    NotificationsActions.getNotificationsSuccessAction,
    (state: INotificationsState, res: { page: number; result: INotificationsRes }) => {
      const notifications =
        res.page === 1 ? res.result.notifications : state.notifications.concat(res.result.notifications);
      return { ...state, notifications, new: getUnreadCount(notifications) };
    },
  ),
  on(NotificationsActions.setNewNotificationAction, (state: INotificationsState, result: INotification) => {
    const notifications = [...state.notifications];
    notifications.unshift(result);
    return { ...state, notifications, new: getUnreadCount(notifications) };
  }),
  on(NotificationsActions.getNotificationsCountAction, (state: INotificationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    NotificationsActions.getNotificationsCountSuccessAction,
    (state: INotificationsState, { result, callState }: ResultState<INotificationsRes>) => ({
      ...state,
      new: result.new,
      callState,
    }),
  ),
  on(NotificationsActions.updateNotificationsAction, (state: INotificationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    NotificationsActions.updateNotificationsSuccessAction,
    (state: INotificationsState, { result, callState }: ResultState<INotificationsRes>) => {
      const notifications = mapNotifications(result, state);
      return { ...state, notifications, new: getUnreadCount(notifications), callState };
    },
  ),

  on(NotificationsActions.deleteNotificationsAction, (state: INotificationsState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(
    NotificationsActions.deleteNotificationsSuccessAction,
    (state: INotificationsState, { result, callState }: ResultState<{ id: string }>) => {
      const notifications = Object.values(state.notifications).filter((n) => n.id !== result.id);
      return { ...state, notifications, new: getUnreadCount(notifications), callState };
    },
  ),
);

export default function (state: INotificationsState = initialState, action: Action) {
  return notificationsReducer(state, action);
}
