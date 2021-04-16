import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { Diary } from "../../interfaces/diary.interface";
import http from "../../services/api";

interface diaryPayload {
  diary: Diary;
}

export const createDiary: any = createAsyncThunk(
  "/create/dairy",
  async (data: Diary) => {
    const response = await http.post("/diaries", {
      subject: data.subject,
      title: data.title,
      type: data.type,
      userId: data?.userId || null,
    });
    return response;
  }
);

export const UpdateDiary : any = createAsyncThunk(
  "/update/dairy",
  async (data: any) => {
    const response = await http.put(`/diaries/${data.id}`, {
      id : data.id,
      subject: data.subject,
      title: data.title,
      type: data.type,
      userId: data?.userId || null,
    });
    return response;
  }
);


export const diarySlice = createSlice({
  name: "diary",
  initialState: [] as Diary[],
  reducers: {
    addDairy: (state, { payload }: PayloadAction<Diary[]>) => {
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
  extraReducers: {
    [createDiary.fulfilled]: (
      state,
      { payload }: PayloadAction<diaryPayload>
    ) => {
      const { diary } = payload;
      state.push(diary);
    },
    [createDiary.pending]: (state) => state,

    [UpdateDiary.fulfilled]:(state, {payload} : PayloadAction<Diary>)=>{
      const diaryIndex = state.findIndex((diary) => diary.id === payload.id);
      if (diaryIndex !== -1) {
        state.splice(diaryIndex, 1, payload);
      }
    },
    [UpdateDiary.pending]:(state)=> state
  },
});

export const { addDairy, updateDiary } = diarySlice.actions;
export default diarySlice.reducer;
export const GET_DIARY = (state: RootState) => state.diary;
