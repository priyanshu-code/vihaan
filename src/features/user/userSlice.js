import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const url = "http://localhost:5000/api/v1/";
const initialState = {
  token: "",
  user: {},
  isAuth: false,
};

// get User not require as of now
// export const getUser = createAsyncThunk("user/getUser", async () => {});
export const loginUser = createAsyncThunk("user/loginUser", async (user, thunkAPI) => {
  try {
    const response = await axios.post(url + "auth/login", user);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});
export const updateUser = createAsyncThunk("user/updateUser", async (user, thunkAPI) => {});
export const deleteUser = createAsyncThunk("user/deleteUser", async (name, thunkAPI) => {});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.token = "";
      state.user = {};
      state.isAuth = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, actions) => {
      const { token, username, firstname, lastname, email, picturePath } = actions.payload;
      state.user = { username, firstname, lastname, email, picturePath };
      state.token = token;
      state.isAuth = true;
    });
    builder.addCase(loginUser.rejected, (state, actions) => {
      state.user = {};
      state.token = "";
      state.isAuth = false;
    });
  },
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
