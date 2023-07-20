import { HttpErrorResponse } from '@angular/common/http';
import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/recent-activity.action';
import { IRecentActivitiesData } from '@app/interfaces';

export interface IRecentActivityState {
  activity: IRecentActivitiesData;
  pending: boolean;
  error: HttpErrorResponse;
}

export const initialState: IRecentActivityState = {
  activity: null,
  pending: false,
  error: null,
};

export const reducer = createReducer<IRecentActivityState, Action>(
  initialState,

  on(actions.getRecentActivityAction, (state: IRecentActivityState, { page }) => ({
    ...state,
    pending: true,
    activity: {
      ...state.activity,
      activity: page === 1 ? [] : [...state.activity.activity],
    },
  })),

  on(actions.getRecentActivityErrorAction, (state: IRecentActivityState, { error }) => ({
    ...state,
    pending: false,
    error,
  })),

  on(actions.getRecentActivitySuccessAction, (state: IRecentActivityState, { result }) => {
    const activities = state.activity.activity
      ? [...state.activity.activity, ...result.activity]
      : [...result.activity];

    return {
      ...state,
      pending: false,
      activity: {
        ...result,
        activity: activities,
      },
    };
  }),
);

export default function recentActivityReducer(state: IRecentActivityState, action: Action): IRecentActivityState {
  return reducer(state, action);
}
