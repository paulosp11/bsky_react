import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Interface/type";

const userSlice = createSlice({
  name: "user",
  initialState: null as User | null,
  reducers: {
    setUser(state, { payload }: PayloadAction<User | null>) {
      console.log(payload);
      return (state = payload !== null ? payload : null);
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
