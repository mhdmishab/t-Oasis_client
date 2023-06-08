import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../../services/admin/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("admintoken"));

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





const initialState = user ? { isLoggedIn: true, user: user, loading: false } : { isLoggedIn: false, user: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.loading = false;
    }

  },
  extraReducers: {
    [login.pending]: (state, action) => {

      state.loading = true;

    },
    [login.fulfilled]: (state, action) => {

      state.loading = false;
      state.isLoggedIn = true;
    },
    [login.rejected]: (state, action) => {

        state.loading = false;
        state.isLoggedIn = false;
      },
}
});


export const { logout } = authSlice.actions;
export default authSlice.reducer;
