import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/vendor/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import { message } from "antd";
import axios from "../../apis/AxiosVendor";
import { VendorLogin, VendorOtp, VendorResendOtp, VendorSignup } from "../../utils/endpoints/endpoints";

const vendor = JSON.parse(localStorage.getItem("vendorToken"));


export const register = createAsyncThunk(
  "auth/register",
  async (vendor, thunkAPI) => {
    try {
      const response = await axios.post(VendorSignup, vendor);

      console.log("inside register vendor side");
          console.log(response);

        const expirationTimeInMinutes = 1;
        const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
        
      
        localStorage.setItem("otptoken", JSON.stringify({
          
          token: response.data.token,
          expiresAt: expirationTime
        }));

      message.success(response.data.message)

      return response;


    } catch (error) {

      console.log(error)
    
      message.error(error.response.data.message);

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
        message.error(message);
      };

      const response = await axios.post(VendorOtp,otpData);

      console.log(response.data.success);
      if (response.data.success) {
        localStorage.removeItem("otptoken");


        console.log("inside auth.js otpverification vendor side")
        localStorage.setItem("vendorToken", JSON.stringify({
          token: response.configdata.token,
          vendorId:response.data._id

        }));
        message.success(response.data.message)
        return response;
      }
    } catch (error) {

      message.error(error.response?.data.message);
      
    }
  }
)

export const login = createAsyncThunk("auth/login",
  async (vendor, thunkAPI) => {
    try {

      const response = await axios.post(VendorLogin, vendor);
      console.log("inside login try")
      console.log("inside login vendor");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("vendorToken", JSON.stringify({
      token: response.data.token,
      vendorId:response.data._id,
      expiresAt: expirationTime
    }));
      
      message.success(response.data.message);
      return response;
    } catch (error) {
      console.log("inside login auth vendor catsh")
      console.log(error)
      
      message.error(error.response?.data.message);
    }
  })



export const resendotp = createAsyncThunk('auth/resendotp',
  async (thunkAPI) => {
    try {
      const otpToken = localStorage.getItem("otptoken");
      const otpObj = JSON.parse(otpToken);
      const otptoken = otpObj.token;
      const otpData = { otptoken }
      const response = await axios.post(VendorResendOtp,otpData);
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
      
    }
  }

)


const initialState = vendor? { isLoggedInVendor: true, loading: false } : { isLoggedInVendor: false, vendor_id: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("vendorToken");
      state.isLoggedInVendor = false;
      state.vendor_id = null;
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
        state.isLoggedInVendor = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
        
      })
      .addCase(otpVerification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = true;
        state.vendor_id=action.payload.data._id;
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(login.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = true;
        console.log("inside vendor login fullfilled reducer")
        console.log(action.payload?.data?._id)
        state.vendor_id=action.payload.data._id;
        

      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
        console.log(action.payload);
      })
      .addCase(resendotp.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(resendotp.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
      })
      .addCase(resendotp.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedInVendor = false;
      });
  },
  
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;