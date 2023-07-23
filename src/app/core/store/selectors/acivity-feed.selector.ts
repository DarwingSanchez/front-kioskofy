import { ICoreModuleState } from '@app/interfaces';
import { LoadingState } from '@app/shared/constants';
import { createSelector } from '@ngrx/store';
import { IActivityFeedState } from '../reducers/acivity-feed.reducer';

export const selectActivityFeedState = (state: ICoreModuleState): IActivityFeedState => state.feed;

export const selectActivityFeed = createSelector(
  selectActivityFeedState,
  (state: IActivityFeedState) => state.activity,
);

export const selectActivityFeedLoading = createSelector(
  selectActivityFeedState,
  (state: IActivityFeedState) => state.callState === LoadingState.LOADING,
);
