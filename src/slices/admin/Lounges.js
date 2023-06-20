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
  
  
  
  
  const initialState = { loading: false,lounges:null};
  
  
  
  const LoungeSlice = createSlice({
    name: "lounges",
    initialState,
    reducers: {
  
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getlounge.pending, (state, action) => {
          state.loading = true;
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
  
  export default LoungeSlice.reducer;