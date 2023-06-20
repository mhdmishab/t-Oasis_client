import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import axios from "axios";
import { Url } from "../../apis/Axios";
import { useSelector } from "react-redux";




export const addlounge = createAsyncThunk(
  "lounges/addlounge",

  async ({ data, id }, thunkAPI) => {
    try {
      console.log("lounge slice", id);

      const response = await axios.post(Url + `/vendor/addlounge/${id}`, data);
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
);

export const getlounge = createAsyncThunk(
  "lounges/getlounge",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(Url +`/vendor/get-lounge/${id}`);
      console.log(response);
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




const initialState = { vendor_id: null, loading: false,lounges:null};



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

      })
      .addCase(addlounge.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getlounge.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getlounge.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor_id = action.payload.data.vendor_id;
        state.lounges=action.payload.data.lounges;

      })
      .addCase(getlounge.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export default LoungeSlice.reducer;
