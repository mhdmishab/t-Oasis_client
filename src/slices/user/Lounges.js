import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import axios from "axios";
import { Url } from "../../apis/Axios";
import { useSelector } from "react-redux";

export const getlounges = createAsyncThunk(
    "lounges/getlounges",
    async (thunkAPI) => {
      try {
        const response = await axios.get(Url +`/get-lounges`);
        console.log(response,"inside lounge.js user");
        return response;
  
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


  
  
  
  
  const initialState = { loading: false,lounges: null,loungeId:null};
  
  
  
  const LoungeSlice = createSlice({
    name: "lounges",
    initialState,
    reducers: {
      resetLoungeSliceUser:()=>initialState,

      setLoungeId:(state,action)=>{
        state.loungeId=action.payload.id;
      },
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getlounges.pending, (state, action) => {
          state.loading = true;
        
        })
        .addCase(getlounges.fulfilled, (state, action) => {
          state.loading = false;
          state.lounges=action.payload.data.lounges;
        })
        .addCase(getlounges.rejected, (state, action) => {
          state.loading = false;
        });
    },
  });
  

  export const {resetLoungeSliceUser,setLoungeId}=LoungeSlice.actions;
  export default LoungeSlice.reducer;