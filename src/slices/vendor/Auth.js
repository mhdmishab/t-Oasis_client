import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../../services/vendor/AuthService";
import { setMessage } from "../Message";
import { toast } from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
    "auth/register",
    async (user, thunkAPI) => {
        try {
             const data=await authService.register(user);
               
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

export const otpVerification=createAsyncThunk(
    "auth/otpverification",
    async(otp,thunkAPI)=>{
        try{
            
            const otpToken=localStorage.getItem("otptoken");
            const otpObj=JSON.parse(otpToken);
            const otptoken=otpObj.token;
            const otpData={otp,otptoken};
            
            const response=await authService.otpverification(otpData);
            
                console.log(response.success);
                if(response.success){
                    localStorage.clear();
                    
                    localStorage.setItem("vendorToken", JSON.stringify({
                      token: response.token,
                      
                    }));
                    toast.success(response.message, {
                        position: toast.POSITION.BOTTOM_RIGHT,
                    });
                    return response;
                }
            


        }catch(error){
            
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
            return thunkAPI.rejectWithValue();
        }
    }
)

export const login=createAsyncThunk("auth/login",
          async(user,thunkAPI)=>{
            try{

              const data=await authService.login(user);
              console.log("inside login try")
              console.log(data);
              thunkAPI.dispatch(setMessage(data.message));
              return data;
            }catch(error){
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
              return thunkAPI.rejectWithValue();
            }
          

          })


const initialState=user?{isLoggedIn:true,user:user,loading:false}:{isLoggedIn:false,user:null,loading:false};

const authSlice = createSlice({
    name: "auth",
    initialState,
    extraReducers: {
      [register.pending]: (state, action) => {
        
        state.loading = true;
        
      },
      [register.fulfilled]: (state, action) => {
    
        state.loading = false;
        state.isLoggedIn = false;
      },
      [register.rejected]: (state, action) => {
     
        state.loading = false;
        state.isLoggedIn = false;
      },
      [otpVerification.pending]: (state, action) => {
  
        state.loading = true;
      },
      [otpVerification.fulfilled]: (state, action) => {
     
        state.loading = false;
        state.isLoggedIn = true;
      },
      [otpVerification.rejected]: (state, action) => {

        state.loading = false;
        state.isLoggedIn = false;
      },
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
    },
  });

const {reducer}=authSlice;
export default reducer;