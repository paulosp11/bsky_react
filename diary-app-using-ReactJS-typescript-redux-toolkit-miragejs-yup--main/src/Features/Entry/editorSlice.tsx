import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry, initStateEditor } from "../../Interface/type";

const initialState: initStateEditor = {
  canEdit: false,
  activeDiaryId: null,
  currentlyEditing: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setCanEdit(state, { payload }: PayloadAction<boolean>) {
      state.canEdit = payload !== null ? payload : !state.canEdit;
    },
    setCurrentlyEditing(state, { payload }: PayloadAction<Entry | null>) {
      state.currentlyEditing = payload;
    },
    setActiveDiaryId(state, { payload }: PayloadAction<string>) {
      state.activeDiaryId = payload;
    },
  },
});

export const {
  setActiveDiaryId,
  setCanEdit,
  setCurrentlyEditing,
} = editorSlice.actions;
export default editorSlice.reducer;
