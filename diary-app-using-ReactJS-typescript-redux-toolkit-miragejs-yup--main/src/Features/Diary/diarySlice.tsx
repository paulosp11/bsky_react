import { Diary } from "../../Interface/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const diarySlice = createSlice({
  name: "diary",
  initialState: [] as Diary[],
  reducers: {
    addDiary(state, { payload }: PayloadAction<Diary[]>) {
      const diariesToSave = payload.filter((diary) => {
        return state.findIndex((item) => item.id === diary.id) === -1;
      });
      state.push(...diariesToSave);
    },
    updateDiary(state, { payload }: PayloadAction<Diary>) {
      const { id } = payload;
      const diaryIndex = state.findIndex((diary) => diary.id === id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
    },
  },
});

export const { updateDiary, addDiary } = diarySlice.actions;
export default diarySlice.reducer;
