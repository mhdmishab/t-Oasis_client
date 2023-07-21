import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import axios from "../../apis/AxiosAdmin";
import { message } from "antd";

const admin = JSON.parse(localStorage.getItem("adminToken"));

export const login = createAsyncThunk(
    "auth/login",
    async (admin, thunkAPI)=>{
        try {
            const response = await axios.post("/admin/login", admin);
            if(response.data.success){
            
              const expirationTimeInMinutes = 60;
              const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
              
              
              
              localStorage.setItem("adminToken", JSON.stringify({
                  token: response.data.token,
                  expiresAt: expirationTime
              }));
            }
            console.log("inside admin slice");
            thunkAPI.dispatch(setMessage(response.data.message));
            return response;
        }catch (error) {
          console.log(error)
          message.error(error.response?.data?.message);
          throw error;
       
        }
    }
)





const initialState = admin? { isLoggedInAdmin: true, admin: admin, loading: false } : { isLoggedInAdmin: false, admin: null, loading: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    LogoutAdmin: (state) => {
      localStorage.removeItem("adminToken");
      state.isLoggedInAdmin = false;
      state.admin = {};
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
