import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import { message } from "antd";
// import axios from "axios";
// import { Url } from "../../apis/Axios";
import axios from "../../apis/AxiosAdmin";
import { useSelector } from "react-redux";

export const addnewfacility = createAsyncThunk(
    "newfacilitys/getnewfacility",
    async ({facilitytypeName},thunkAPI) => {
      try {
        const response = await axios.post(`/admin/add-newfacility`,facilitytypeName);
        console.log(response,"inside newfacility.js admin");
        return response
  
      } catch (error) {
        console.log(error)
        message.error(error.response?.data?.message);
        throw error;
     
      }
  
    }
  
  )


export const getnewfacility = createAsyncThunk(
    "newfacilitys/getnewfacility",
    async (thunkAPI) => {
      try {
        const response = await axios.get(`/admin/get-newfacility`);
        console.log(response,"inside newfacility.js admin");
        return response
  
      } catch (error) {
        console.log(error)
        message.error(error.response?.data?.message);
        throw error;
     
      }
  
    }
  
  )

  export const managestatusfacility=createAsyncThunk(
    "newfacilitys/reject",
    async(Id,thunkAPI)=>{
        try{
            const response=await axios.patch(`/admin/facility-status/${Id}`);
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

  
  
  
  
  
  const initialState = { loading: false,newfacilitys: null,newfacilityid:null};
  
  
  
  const FacilitySlice = createSlice({
    name: "facility",
    initialState,
    reducers: {
      resetFacilitySliceAdmin:()=>initialState
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getnewfacility.pending, (state, action) => {
          state.loading = true;
        })
        .addCase(getnewfacility.fulfilled, (state, action) => {
          state.loading = false;
          state.newfacilitys=action.payload.data.newfacilitys;
        })
        .addCase(getnewfacility.rejected, (state, action) => {
          state.loading = false;
        });
    },
  });
  

  export const {resetFacilitySliceAdmin}=FacilitySlice.actions;
  export default FacilitySlice.reducer;