import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../apis/AxiosVendor";
import { message, notification } from "antd";




export const addlounge = createAsyncThunk(
  "lounges/addlounge",

  async ({ data, id }, thunkAPI) => {
    try {
      console.log("lounge slice", id);

      const response = await axios.post(`/vendor/addlounge/${id}`, data);
      return response;


    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message);
      throw error;
   
    }
  }
);

export const getlounge = createAsyncThunk(
  "lounges/getlounge",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/vendor/get-lounge/${id}`);
      console.log(response);
      return response

    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message);
      throw error;
   
    }

  }

)

export const editlounge=createAsyncThunk(
  "lounges/editlounge",
  async ({ data, vendorId,loungeId }, thunkAPI) => {
    try {
      console.log("lounge slice", vendorId,loungeId);

      const response = await axios.patch(`/vendor/edit-lounge/${vendorId}/${loungeId}`, data);
      message.success(response?.data.message);
      return response;


    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message);
      throw error;
   
    }
  }
)

export const editloungestatus=createAsyncThunk(
  "lounges/managestatus",

  async({vendorId,loungeId},thunkAPI)=>{
    try{
        const response=await axios.patch(`/vendor/block-unblock-lounge/${vendorId}/${loungeId}`);
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

export const GetDashboard=createAsyncThunk(
  'lounge/dashboard',
  async({id})=>{
    try{
      console.log(id);
      const response= await axios.get(`/vendor/get-dashboard/${id}`);
     
      console.log(response,"vendor dashbpard");
      return response;

    }catch(error){

          console.log(error);

          message.error(error.response?.data.message);
          throw error;

    }
  }
)




const initialState = { vendor_id: null, loading: false,lounges:null ,loungeId:null,chartData:null};



const LoungeSlice = createSlice({
  name: "lounges",
  initialState,
  reducers: {
    
    setLoungeId:(state,action)=>{
      state.loungeId=action.payload.id;
    },
    resetLoungeSlice:()=>initialState
    

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
      })
      .addCase(GetDashboard.pending, (state, action) => {
        state.loading = true;
      
      })
      .addCase(GetDashboard.fulfilled, (state, action) => {
        state.loading = false;
        state.chartData=action.payload.data;
      })
      .addCase(GetDashboard.rejected, (state, action) => {
        state.loading = false;
      })
  },
});

export const {setLoungeId,resetLoungeSlice}=LoungeSlice.actions;
export default LoungeSlice.reducer;
