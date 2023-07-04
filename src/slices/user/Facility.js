import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setMessage } from "../Message";
import { toast } from "react-toastify";
import axios from "axios";
import { Url } from "../../apis/Axios";
import { useSelector } from "react-redux";

export const getfacilities = createAsyncThunk(
    "facilities/getfacilities",
    async (id,thunkAPI) => {
      try {
        const response = await axios.get(Url +`/get-facilities/${id}`);
        console.log(response,"inside facility.js user");
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

  export const bookFacility=createAsyncThunk(
    "facilities/bookfacilities",
    async({user_id,loungeId,facilityId,bookedData})=>{
        try{
            console.log(loungeId,facilityId);
            const response=await axios.post(Url+`/book-facility/${user_id}/${loungeId}/${facilityId}`,bookedData);
            console.log(response,"booked response is here")
            return response;

        }catch(error){
            console.log(error);
        }
    }
  )

  export const GetAvailableSlots=createAsyncThunk(
    "facilities/availableslots",
    async({date,loungeId,facilityId})=>{
        try{
            
            const response=await axios.get(Url+`/get-slots/${date}/${loungeId}/${facilityId}`);
            console.log(response,"booked response is here")
            return response;

        }catch(error){
            console.log(error);
        }
    }
  )


  
  
  
  
  const initialState = { loading: false,facilities: null,facilityId:null,bookedSlots:null};
  
  
  
  const FacilitySlice = createSlice({
    name: "facilities",
    initialState,
    reducers: {
      resetFacilitySliceUser:()=>initialState,

      setFacilityId:(state,action)=>{
        state.facilityId=action.payload.id;
      },
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getfacilities.pending, (state, action) => {
          state.loading = true;
        
        })
        .addCase(getfacilities.fulfilled, (state, action) => {
          state.loading = false;
          console.log(action.payload)
          state.facilities=action.payload.data?.facilities;
        })
        .addCase(getfacilities.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(GetAvailableSlots.pending, (state, action) => {
            state.loading = false;
          })
          .addCase(GetAvailableSlots.fulfilled, (state, action) => {
            state.loading = false;
            console.log(action.payload);
            state.bookedSlots=action.payload.data?.bookedSlots
          })
          .addCase(GetAvailableSlots.rejected, (state, action) => {
            state.loading = false;
          })
    },
  });
  

  export const {resetFacilitySliceUser,setFacilityId}=FacilitySlice.actions;
  export default FacilitySlice.reducer;