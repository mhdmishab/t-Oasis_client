import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import LoungeService from "../../services/vendor/LoungeService";

const vendor = JSON.parse(localStorage.getItem("vendorToken"));


export const addlounge= createAsyncThunk(
    "lounges/addlounge",

    async(loungeData,thunkAPI)=>{
    try{
        const response= LoungeService.addlounge(loungeData);
        thunkAPI.dispatch(setMessage(response.message));
        return response;
    }catch(error){
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




const initialState = vendor ? { isLoggedIn: true, vendor: vendor, loading: false } : { isLoggedIn: false, vendor: null, loading: false };



const LoungeSlice = createSlice({
  name: "lounges",
  initialState,
  reducers: {


  },
  extraReducers: (builder) => {
    builder
      .addCase(addlounge.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addlounge.fulfilled, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      })
      .addCase(addlounge.rejected, (state, action) => {
        state.loading = false;
        state.isLoggedIn = true;
      });
  },
});

export default LoungeSlice.reducer;
