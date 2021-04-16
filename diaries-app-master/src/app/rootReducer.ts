import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice/authSlice";
import diaryReducer from '../features/diaries/diariesSlice'
import entryReducer from '../features/entrySlice/entrySlice'
export const rootReducer = combineReducers({
  auth: authReducer,
  diary: diaryReducer,
  entry : entryReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;