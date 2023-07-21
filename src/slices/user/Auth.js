import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/user/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import { message } from "antd";
import axios from "../../apis/AxiosUser";
import { UserOtp, UserLogin, UserSignup, UserResendOtp } from "../../utils/endpoints/endpoints";

const user = JSON.parse(localStorage.getItem("userToken"));

export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axios.post(UserSignup, user);

      console.log("inside token area user register");
      console.log(response);

      const expirationTimeInMinutes = 1;
      const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;

      console.log(response.data.token);
      localStorage.setItem("otptoken", JSON.stringify({
        token: response.data.token,
        expiresAt: expirationTime
      }));

      message.success(response.data.message);


      return response;


    } catch (error) {

      console.log(error)
      message.error(error.response?.data.message);
      throw error;
      
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
      const expirationTime = otpObj.expiresAt;
      const otpData = { otp, otptoken };
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        console.log("otp expired");
        const message = 'OTP Expired';
        return thunkAPI.rejectWithValue({ message });
      }

      const response = await axios.post(UserOtp,otpData);

      console.log(response?.data.success);
      if (response.data.success) {
        console.log("inside otpverification auth.js user side")
        localStorage.removeItem("otptoken");

        localStorage.setItem("userToken", JSON.stringify({
          userId:response?.data?._id,
        token: response?.data?.token,
        expiresAt: expirationTime

        }));
        message.success(response.data.message);
        return response;
      }



    } catch (error) {

      message.error(error.response?.data.message)   
      throw error;
    }
  }
)

export const login = createAsyncThunk("auth/login",
  async (user, thunkAPI) => {
    try {

      const response = await axios.post(UserLogin, user)
      console.log("inside login try")

      console.log("inside login area user side ");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("userToken", JSON.stringify({
      userId:response?.data?._id,
      token: response?.data?.token,
      expiresAt: expirationTime
    }));
      
      message.success(response.data.message)
      return response;

    } catch (error) {
      console.log("inside login auth user catsh")
     
      message.error(error.response?.data.message);
      throw error;
    }


  });

export const resendotp = createAsyncThunk('auth/resendotp',
  async (thunkAPI) => {
    try {
      const otpToken = localStorage.getItem("otptoken");
      const otpObj = JSON.parse(otpToken);
      const otptoken = otpObj.token;
      const otpData = { otptoken }
      const response = await axios.post(UserResendOtp,otpData);
      console.log("inside resend try");
      console.log("inside  resendotp vendor side")
          console.log(response);
          const expirationTimeInMinutes = 1;
          const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
          
          console.log(response.data.token);
          localStorage.removeItem("otptoken");
          localStorage.setItem("otptoken", JSON.stringify({
            token: response.data.token,
            expiresAt: expirationTime
          }));

      message.success(response.data.message);
      
      return response;


    } catch (error) {
      console.log("inside RESEND auth catsh")
      message.error(error.response?.data.message);
      throw error;
      
    }
  }

)




const initialState = user ? { isLoggedIn: true, loading: false } : { isLoggedIn: false, user_id: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.user_id = null;
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
        // console.log(action.payload?.data?._id)
        // state.user_id=action.payload?.data?._id;
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
        // console.log(action.payload.data?._id)
        // state.user_id=action.payload.data?._id;
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