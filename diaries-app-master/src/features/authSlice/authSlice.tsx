import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/rootReducer";
import { User } from "../../interfaces/user.interface";
import http from "../../services/api";

interface login {
  username: string,
  password: string
}
interface signup extends login {
  email: string
}

export const signUpAuth: any = createAsyncThunk(
  'auth/signup',
  async (data: signup) => {
    const response = await http.post('/signup',
      {
        username: data?.username,
        password: data?.password,
        email: data?.email
      }
    );
    return response
  }
)

export const loginAuth: any = createAsyncThunk(
  'auth/login',
  async (data: login, thunkAPI) => {
    const response = await http.post("/login",
      {
        username: data?.username,
        password: data?.password
      }
    )
    return response
  },
)


interface AuthSlice {
  token: string | null;
  isAuthenticate: boolean;
  loading: boolean;
  user: User | null
}
const initialState: AuthSlice = {
  token: null,
  isAuthenticate: false,
  loading: false,
  user: null
};
export const AuthSlice = createSlice({
  name: "auth ",
  initialState,
  reducers: {
    saveToken: (state, action) => {
      if (action.payload) {
        state.token = action.payload;
      }
    },
    clearToken: (state) => {
      state.token = null;
      state.isAuthenticate = false
    },
    setAuthenticate: (state, action) => {
      state.isAuthenticate = true;
    },
  },
  extraReducers: {
    [loginAuth.fulfilled]: (state, { payload }: PayloadAction<AuthSlice>) => {
      state.token = payload.token
      state.isAuthenticate = true
      state.loading = false
      state.user = payload.user
    },
    [loginAuth.pending]: (state) => {
      state.loading = true
    },
    [signUpAuth.fulfilled]: (state, { payload }: PayloadAction<AuthSlice>) => {
      state.loading = false
      state.token = payload.token
      state.isAuthenticate = true
      state.user = payload.user
    },
    [signUpAuth.pending]: (state) => {
      state.loading = true
    }
  }
});

export default AuthSlice.reducer;
export const { clearToken, saveToken, setAuthenticate } = AuthSlice.actions;
export const GET_AUTH = (state: RootState) => state.auth