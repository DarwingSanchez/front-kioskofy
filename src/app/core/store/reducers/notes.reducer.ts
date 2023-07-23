import { Action, createReducer, on } from '@ngrx/store';
import * as NotesActions from '../actions/notes.actions';
import { Note } from '@app/core/interfaces';

export interface NotesState {
  notes: Note[];
  loading: boolean;
}

const initialState: NotesState = {
  notes: [],
  loading: false,
};

const notesReducer = createReducer<NotesState, Action>(
  initialState,

  on(
    NotesActions.getNotesAction,
    NotesActions.createNoteAction,
    NotesActions.deleteNoteAction,
    (state: NotesState) => ({
      ...state,
      loading: true,
    }),
  ),

  on(
    NotesActions.getNotesSuccessAction,
    NotesActions.getNotesFailureAction,
    NotesActions.createNoteSuccessAction,
    NotesActions.createNoteFailureAction,
    NotesActions.deleteNoteSuccessAction,
    NotesActions.deleteNoteFailureAction,
    (state: NotesState) => ({
      ...state,
      loading: false,
    }),
  ),

  on(NotesActions.getNotesSuccessAction, (state: NotesState, { notes }: { notes: Note[] }) => ({
    ...state,
    notes,
  })),

  on(NotesActions.createNoteSuccessAction, (state: NotesState, { note }) => ({
    ...state,
    notes: [...state.notes, note],
  })),

  on(NotesActions.deleteNoteSuccessAction, (state: NotesState, { id }) => ({
    ...state,
    notes: state.notes.filter((note) => note.id !== id),
  })),
);

export default function (state: NotesState, action: Action) {
  return notesReducer(state, action);
}
