import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
// import axios from "axios";
// import { Url } from "../../apis/Axios";
import axios from "../../apis/AxiosVendor";
import { useSelector } from "react-redux";
import { message } from "antd";




export const addfacility = createAsyncThunk(
  "facility/addfacility",

  async ({ data,vendorId }, thunkAPI) => {
    try {
      console.log("facility slice", vendorId);

      const response = await axios.post(`/vendor/addfacility/${vendorId}`, data);
      message.success(response?.data.message);
      return response;


    } catch (error) {
        console.log(error)
        message.error(error.response?.data?.message);
        throw error;
     
      }
  }
);

export const getfacilities = createAsyncThunk(
  "facility/getfacilities",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/vendor/get-facilities/${id}`);
      console.log(response,"facilities");
      return response;

    } catch (error) {
      console.log(error)
      message.error(error.response?.data?.message);
      throw error;
   
    }

  }

)

export const  editfacility=createAsyncThunk(
    "facility/editfacility",
    async ({ data,vendorId,facilityId }, thunkAPI) => {
        try {
          console.log("facility slice", vendorId);
    
          const response = await axios.patch(`/vendor/edit-facility/${vendorId}/${facilityId}`, data);
          message.success(response?.data.message);
          return response;
    
    
        } catch (error) {
            console.log(error)
            message.error(error.response?.data?.message);
            throw error;
         
          }
      }
    
)

export const editfacilitystatus=createAsyncThunk(
    "facility/managestatus",
    async({vendorId,facilityId},thunkAPI)=>{
        try{
            const response=await axios.patch(`/vendor/block-unblock-facility/${vendorId}/${facilityId}`);
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




const initialState = { facilityId: null, loading: false ,facilities:null,vendor_id:null,facilitytypes:null};



const FacilitySlice = createSlice({
  name: "facility",
  initialState,
    reducers:{

        setFacilityId:(state,action)=>{
            state.facilityId=action.payload.id;
          },

        resetFacilitySlice:()=>initialState
  },
  extraReducers: (builder) => {

    builder
      .addCase(addfacility.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(addfacility.fulfilled, (state, action) => {
        state.loading = false;

      })
      .addCase(addfacility.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(getfacilities.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getfacilities.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor_id = action.payload.data.vendor_id;
        state.facilities=action.payload.data?.facilities;
        state.facilitytypes=action.payload.data.facilitytypes;
        

      })
      .addCase(getfacilities.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {resetFacilitySlice,setFacilityId}=FacilitySlice.actions;
export default FacilitySlice.reducer;