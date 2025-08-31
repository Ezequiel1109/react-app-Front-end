import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { login, register } from "../services/UserService";


export const addRegister = createAsyncThunk("user/addRegister", async (userData, { rejectWithValue }) => {
  try{
    const response = await register(userData);
    return response.data;
  }catch(error){
    return rejectWithValue(error.response.data.message);
  }
});

export const addLogin = createAsyncThunk("user/addLogin", async (credentials, { rejectWithValue }) => {
  try{
    const response = await login(credentials);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const authSlice = createSlice({
  name: "user",
  initialState: {
    isAuth: false,
    user: null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    status: "idle",
  },
  reducers: {
    logout: (state) =>{
      state.isAuth = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    setAuth: (state, action) =>{
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addRegister.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(addRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })
      .addCase(addLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuth = true;
        state.token = action.payload.token;
        state.user = action.payload.user || null;
    
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(addLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Error al iniciar sesión";
      });
  },
});
export default authSlice.reducer;

