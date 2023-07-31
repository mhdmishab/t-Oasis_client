import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "../../apis/AxiosUser";



export const getfacilities = createAsyncThunk(
    "facilities/getfacilities",
    async (id,thunkAPI) => {
      try {
        const response = await axios.get(`/get-facilities/${id}`);
        console.log(response,"inside facility.js user");
        return response;
  
      } catch (error) {
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
      }
  
    }
  
  )

  export const bookFacility=createAsyncThunk(
    "facilities/bookfacilities",
    async({user_id,vendorId,loungeId,facilityId,bookedData})=>{
        try{
            console.log(vendorId,facilityId);
            const response=await axios.post(`/book-facility/${user_id}/${vendorId}/${loungeId}/${facilityId}`,bookedData);
            console.log(response,"booked response is here")
            return response;

        }catch(error){
            console.log(error);
            message.error(error.response?.data.message);
            throw error;
        }
    }
  )

  export const GetAvailableSlots=createAsyncThunk(
    "facilities/availableslots",
    async({date,vendorId,facilityId})=>{
        try{
            
            const response=await axios.get(`/get-slots/${date}/${vendorId}/${facilityId}`);
            console.log(response,"booked response is here")
            return response;

        }catch(error){
            console.log(error)
            message.error(error.response?.data.message);
            throw error;
        }
    }
  )

  export const BookingPayment=createAsyncThunk(
    "facilities/payment",
    async({facilityId,numberOfSlots})=>{
        try{
            console.log(numberOfSlots)
            const response=await axios.post(`/booking-payment/${facilityId}`,{numberOfSlots});
            console.log(response);
            return response;

        }catch(error){
            console.log(error)
            message.error(error.response?.data.message);
            throw error;
        }
    }
  )

  export const VerifyPayment=createAsyncThunk(
    "facilities/verifypayment",
    async({response})=>{
        try{
            console.log(response);
            const veriyPaymentData=await axios.post(`/verify-payment`,response);
            console.log(veriyPaymentData);

        }catch(error){
            console.log(error)
            // message.error(error.response?.data.message);
            throw error;
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