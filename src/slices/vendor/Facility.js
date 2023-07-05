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

  async ({ data, loungeId,vendorId }, thunkAPI) => {
    try {
      console.log("facility slice", loungeId,vendorId);

      const response = await axios.post(`/vendor/addfacility/${loungeId}/${vendorId}`, data);
      message.success(response?.data.message);
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

      message.error(error.response?.data.message);
      return thunkAPI.rejectWithValue();
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
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(error.response.data.message));

      message.error(error.response?.data.message);
      return thunkAPI.rejectWithValue();
    }

  }

)




const initialState = { facilityId: null, loading: false ,facilities:null};



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
        // state.vendor_id = action.payload.data.vendor_id;
        state.facilities=action.payload.data?.facilities;
        

      })
      .addCase(getfacilities.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {resetFacilitySlice,setFacilityId}=FacilitySlice.actions;
export default FacilitySlice.reducer;