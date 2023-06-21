import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/user/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("userToken"));

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const data = await authService.register(user);

      thunkAPI.dispatch(setMessage(data.message));

      return data;


    } catch (error) {

      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(error.response.data.message));

      toast.error(error.response?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return thunkAPI.rejectWithValue();

    }
  }
);

export const otpVerification = createAsyncThunk(
  "auth/otpverification",
  async (otp, thunkAPI) => {
    try {

      const otpToken = localStorage.getItem("otptoken");
      const otpObj = JSON.parse(otpToken);
      const otptoken = otpObj.token;
      const expirationTime=otpObj.expiresAt;
      const otpData = { otp, otptoken };
      const currentTime=Date.now();
      
      if(expirationTime < currentTime) {
        console.log("otp expired");
        const message = 'OTP Expired';
      return thunkAPI.rejectWithValue({ message });
      }

      const response = await authService.otpverification(otpData);

      console.log(response.success);
      if (response.success) {
        console.log("inside otpverification auth.js user side")
        localStorage.removeItem("otptoken");

        localStorage.setItem("userToken", JSON.stringify({
          token: response.token,

        }));
        toast.success(response.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        return response;
      }



    } catch (error) {

      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));

      toast.error(error.response?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return thunkAPI.rejectWithValue({message});
    }
  }
)

export const login = createAsyncThunk("auth/login",
  async (user, thunkAPI) => {
    try {

      const data = await authService.login(user);
      console.log("inside login try")
      
      thunkAPI.dispatch(setMessage(data.message));
      return data;
    } catch (error) {
      console.log("inside login auth catsh")
      console.log(error)
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(error.response.data.message));

      toast.error(error.response?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return error;
    }


  });

export const resendotp=createAsyncThunk('auth/resendotp',
 async(thunkAPI)=>{
      try{
      const otpToken = localStorage.getItem("otptoken");
      const otpObj = JSON.parse(otpToken);
      const otptoken = otpObj.token;
      const otpData = {otptoken}
      const data = await authService.resendotp(otpData);
      console.log("inside resend try")

      // thunkAPI.dispatch(setMessage(data.message));
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return data;


      }catch(error){
        console.log("inside RESEND auth catsh")
     
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(error.response.data.message));

      toast.error(error.response?.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return thunkAPI.rejectWithValue({message});
    }
      }
 
)



const initialState = user? { isLoggedIn: true, user: user, loading: false } : { isLoggedIn: false, user: null, loading: false };

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
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(otpVerification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(resendotp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resendotp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      })
      .addCase(resendotp.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = false;
      });
  },
  
});



export const { logout } = authSlice.actions;
export default authSlice.reducer;