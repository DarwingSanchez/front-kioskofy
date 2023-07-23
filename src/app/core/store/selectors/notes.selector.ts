import { createSelector } from '@ngrx/store';
import { ICoreModuleState } from '../reducers';
import { NotesState } from '../reducers/notes.reducer';
import { Note } from '@app/core/interfaces';

export const selectNotesState = (state: ICoreModuleState): NotesState => state?.notes;

export const selectNotes = createSelector(selectNotesState, (state: NotesState): Note[] => state?.notes);

export const selectLoading = createSelector(selectNotesState, (state: NotesState): boolean => state?.loading);
