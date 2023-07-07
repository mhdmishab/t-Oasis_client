import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "../../apis/AxiosVendor";


export const GetBookings=createAsyncThunk(
    "bookings/getbookings",
    async({id,currentPage})=>{
        try{
            const response=await  axios.get(`/vendor/get-bookings/${id}/${currentPage}`);
            console.log(response);
            return response;

        }catch(error){
            console.log(error);
        }
    }
)


const initialState = {  loading: false ,bookings:null,vendor_id:null};



const BookingSlice = createSlice({
  name: "bookings",
  initialState,
    reducers:{

        // setFacilityId:(state,action)=>{
        //     state.facilityId=action.payload.id;
        //   },

        resetBookingSlice:()=>initialState
  },
  extraReducers: (builder) => {

    builder
   
      .addCase(GetBookings.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(GetBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.vendor_id = action.payload.data.vendor_id;
        state.bookings=action.payload.data?.bookings;
        

      })
      .addCase(GetBookings.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {resetBookingSlice}=BookingSlice.actions;
export default BookingSlice.reducer;