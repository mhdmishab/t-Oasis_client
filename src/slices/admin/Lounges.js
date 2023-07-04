import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import axios from "axios";
import { Url } from "../../apis/Axios";
import { useSelector } from "react-redux";

export const getlounge = createAsyncThunk(
    "lounges/getlounge",
    async (thunkAPI) => {
      try {
        const response = await axios.get(Url +`/admin/get-lounge`);
        console.log(response,"inside lounge.js admin");
        return response
  
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
  
  )

  export const rejectLounge=createAsyncThunk(
    "lounges/reject",
    async(loungeId,thunkAPI)=>{
        try{
            const response=await axios.patch(Url+`/admin/reject-lounge/${loungeId}`);
            console.log(response);
            toast.error(response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            return response;
        }catch(error){
            console.log(error);
            toast.error(error.response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });

        }
    }
  )

  export const approveLounge=createAsyncThunk(
    "lounges/approve",
    async(loungeId,thunkAPI)=>{
        try{
            const response=await axios.patch(Url+`/admin/approve-lounge/${loungeId}`);
            console.log(response);
            toast.success(response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
            return response;
        }catch(error){
            console.log(error);
            toast.error(error.response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });

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