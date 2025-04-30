import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { UsersData } from "../ExampleData";

export const registerUser = createAsyncThunk("user/registerUser", async(userData) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/registerUser`, {
      name: userData.name,
      email: userData.email,
      password: userData.password
    });
    console.log(response);
    const user = response.user; 
    const msg = response.msg;   
    return { user, msg };
  } catch (error) {
    console.log(error.message);
  }
});
///login
export const login = createAsyncThunk(
  "users/login",
  async (userData,{rejectWithValue}) => {
    try {
     
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          email: userData.email,
          password: userData.password,
        }
      );
      const user = response.data.user;
      const msg = response.data.msg;
      return { user, msg };
    } catch (error) {
      //const msg = 'Invalid credentials';
      const msg = error.response.data.msg;
      return rejectWithValue({ msg });
    }
  }
);

export const logout = createAsyncThunk(
  "users/logout",
  async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/logout`);
      const msg = response.data.msg
      console.log(msg)
      return { msg }
    }
    catch (err) { }
  })

const initialState = {
  user: null,
  status: null,
  msg: null,
  isLogin: false,
};

export const userSlice = createSlice({
  name: "users", // name of the state
  initialState,  // initial value of the state
  reducers: {},  // Handling synchronous Operations
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "success"; 
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(registerUser.rejected, (state) => {
        state.status = "rejected"; 
        state.msg = "Unexpected error occurred";
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLogin = true;
        state.user = action.payload.user;
        state.msg = action.payload.msg;
      })
      .addCase(login.rejected, (state,action) => {
        state.isError = true;
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLogin = false;
        state.user = null;
        state.msg = action.payload.msg;          
      })
      .addCase(logout.rejected, (state) => {
        state.isError = true
      });

      
  }, // Handling asynchronous Operations
});

export default userSlice.reducer;
