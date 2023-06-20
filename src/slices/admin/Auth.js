import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/admin/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";

const admin = JSON.parse(localStorage.getItem("adminToken"));

export const login = createAsyncThunk(
    "auth/login",
    async (user, thunkAPI)=>{
        try {
            const data = await AuthService.login(user);
            thunkAPI.dispatch(setMessage(data.message));
            return data;
        } catch(error) {
            console.log("inside login auth catsh")
            console.log(error)
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            thunkAPI.dispatch(setMessage(error.data.message));

            toast.error(error.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
            });
            return thunkAPI.rejectWithValue();
        }
    }
)





const initialState = admin? { isLoggedInAdmin: true, user: admin, loading: false } : { isLoggedInAdmin: false, user: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogoutAdmin: (state) => {
      localStorage.removeItem("adminToken");
      state.isLoggedInAdmin = false;
      state.user = {};
      state.loading = false;
    }

  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInAdmin = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInAdmin = false;
      });
  },
  
});


export const { LogoutAdmin } = authSlice.actions;
export default authSlice.reducer;
