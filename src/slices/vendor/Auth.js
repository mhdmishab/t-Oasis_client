import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/vendor/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";

const vendor = JSON.parse(localStorage.getItem("vendorToken"));

export const register = createAsyncThunk(
  "auth/register",
  async (vendor, thunkAPI) => {
    try {
      const data = await authService.register(vendor);

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
      const expirationTime = otpObj.expiresAt;
      const otpData = { otp, otptoken };
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        console.log("otp expired");
        const message = 'OTP Expired';
        return thunkAPI.rejectWithValue({ message });
      };

      const response = await authService.otpverification(otpData);

      console.log(response.success);
      if (response.success) {
        localStorage.removeItem("otptoken");


        console.log("inside auth.js otpverification vendor side")
        localStorage.setItem("vendorToken", JSON.stringify({
          token: response.token,
          vendorId:response._id

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
      return thunkAPI.rejectWithValue({ message });
    }
  }
)

export const login = createAsyncThunk("auth/login",
  async (vendor, thunkAPI) => {
    try {

      const data = await authService.login(vendor);
      console.log("inside login try")
      console.log(data);
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
      return thunkAPI.rejectWithValue({ message });
    }
  })



export const resendotp = createAsyncThunk('auth/resendotp',
  async (thunkAPI) => {
    try {
      const otpToken = localStorage.getItem("otptoken");
      const otpObj = JSON.parse(otpToken);
      const otptoken = otpObj.token;
      const otpData = { otptoken }
      const data = await authService.resendotp(otpData);
      console.log("inside resend try")

      thunkAPI.dispatch(setMessage(data.message));
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return data;


    } catch (error) {
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
      return thunkAPI.rejectWithValue({ message });
    }
  }

)


const initialState = vendor? { isLoggedInVendor: true, loading: false } : { isLoggedInVendor: false, vendor: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("vendorToken");
      state.isLoggedInVendor = false;
      state.vendor = {};
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