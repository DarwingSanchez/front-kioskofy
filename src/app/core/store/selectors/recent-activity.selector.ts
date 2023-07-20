import { ICoreModuleState } from '@app/core/store';
import { IRecentActivityState } from '@app/core/store/reducers/recent-activity.reducer';
import { createSelector } from '@ngrx/store';

export const selectRecentActivityState = (state: ICoreModuleState): IRecentActivityState => state.recentActivity;

export const selectActivityData = createSelector(
  selectRecentActivityState,
  (state: IRecentActivityState) => state.activity,
);
export const selectActivityDataPending = createSelector(
  selectRecentActivityState,
  (state: IRecentActivityState): boolean => state.pending,
);
