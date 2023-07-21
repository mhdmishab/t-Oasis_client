import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import { message } from "antd";
// import axios from "axios";
// import { Url } from "../../apis/Axios";
import axios from "../../apis/AxiosAdmin";
import { useSelector } from "react-redux";

export const getlounge = createAsyncThunk(
    "lounges/getlounge",
    async (thunkAPI) => {
      try {
        const response = await axios.get(`/admin/get-lounge`);
        console.log(response,"inside lounge.js admin");
        return response
  
      } catch (error) {
        console.log(error)
        message.error(error.response?.data?.message);
        throw error;
     
      }
  
    }
  
  )

  export const rejectLounge=createAsyncThunk(
    "lounges/reject",
    async(loungeId,thunkAPI)=>{
        try{
            const response=await axios.patch(`/admin/reject-lounge/${loungeId}`);
            console.log(response);
            message.error(response?.data.message);
            return response;
        }catch (error) {
          console.log(error)
          message.error(error.response?.data?.message);
          throw error;
       
        }
    }
  )

  export const approveLounge=createAsyncThunk(
    "lounges/approve",
    async(loungeId,thunkAPI)=>{
        try{
            const response=await axios.patch(`/admin/approve-lounge/${loungeId}`);
            console.log(response);
            message.success(response?.data.message);
            return response;
        }catch (error) {
          console.log(error)
          message.error(error.response?.data?.message);
          throw error;
       
        }
    }
  )
  
  
  
  
  const initialState = { loading: false,lounges: null,loungeid:null};
  
  
  
  const LoungeSlice = createSlice({
    name: "lounges",
    initialState,
    reducers: {
      resetLoungeSliceAdmin:()=>initialState
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getlounge.pending, (state, action) => {
          state.loading = true;
          state.loungeid=null;
        })
        .addCase(getlounge.fulfilled, (state, action) => {
          state.loading = false;
          state.lounges=action.payload.data.lounges;
          
        })
        .addCase(getlounge.rejected, (state, action) => {
          state.loading = false;
        });
    },
  });
  

  export const {resetLoungeSliceAdmin}=LoungeSlice.actions;
  export default LoungeSlice.reducer;