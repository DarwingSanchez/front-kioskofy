import { Action, createReducer, on } from '@ngrx/store';
import { CallState, LoadingState, ResultState } from '@app/shared/constants';
import { ActivitiesFeed } from '@app/interfaces';
import {
  getActivityFeedAction,
  getActivityFeedFailureAction,
  getActivityFeedSuccessAction,
} from '@app/core/store/actions/acivity-feed.actions';

export interface ActivityFeedRes {
  activity: ActivitiesFeed;
  count: number;
  filters: { label: string; id: string }[];
}

export interface IActivityFeedState {
  activity: ActivitiesFeed;
  filters: { label: string; id: string }[];
  count: number;
  callState: CallState;
}

const initialState = {
  activity: [],
  filters: [],
  count: 0,
  callState: LoadingState.INIT,
};

const activityFeedReducer = createReducer<IActivityFeedState, Action>(
  initialState,

  on(getActivityFeedAction, (state: IActivityFeedState) => ({
    ...state,
    callState: LoadingState.LOADING,
  })),
  on(getActivityFeedSuccessAction, (state: IActivityFeedState, { result, callState }: ResultState<ActivityFeedRes>) => {
    const act = [...state.activity.concat(result.activity)];
    return { ...state, activity: act, filters: result.filters, count: result.count, callState };
  }),
  on(getActivityFeedFailureAction, (state: IActivityFeedState, { callState }: ResultState<null>) => ({
    ...state,
    callState,
  })),
);

export default function (state: IActivityFeedState, action: Action): IActivityFeedState {
  return activityFeedReducer(state, action);
}
