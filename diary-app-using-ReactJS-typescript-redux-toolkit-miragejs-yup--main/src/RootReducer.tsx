import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./Features/Auth/authSlice";
import userReducer from "./Features/Auth/userSlice";
import diaryReducer from "./Features/Diary/diarySlice";
import entryReducer from "./Features/Entry/entrySlice";
import editorReducer from "./Features/Entry/editorSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  diary: diaryReducer,
  entry: entryReducer,
  editor: editorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
