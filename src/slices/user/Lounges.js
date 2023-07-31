import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "../../apis/AxiosUser";


export const getlounges = createAsyncThunk(
    "lounges/getlounges",
    async (thunkAPI) => {
      try {
        const response = await axios.get(`/get-lounges`);
        console.log(response,"inside lounge.js user");
        return response;
  
      } catch (error) {
        console.log(error)
    
        message.error(error.response?.data.message);
        throw error;
      }
  
    }
  
  )

  export const getuserprofile=createAsyncThunk(
    'auth/profile',
    async(id)=>{
      try{
        console.log(id,"user profile lounge.js");
        const response= await axios.get(`/user-profile/${id}`);
        console.log(response,"user profile response is here");
        return response;
  
  
      }catch(error){
  
        console.log(error);
  
        message.error(error.response?.data.message);
        throw error;
  
      }
    }
  )


export const UploadUserImage=createAsyncThunk(
    'auth/uploadImage',
    async({user_id,data})=>{
        try{
        console.log(user_id);
        const response= await axios.patch(`/upload-image/${user_id}`,data);
        message.success(response?.data.message);
        console.log(response,"user Image response is here");
        return response;
  

        }catch(error){
            console.log(error);
  
            message.error(error.response?.data.message);
            throw error;
        }
    }
)

export const CancelBooking=createAsyncThunk(
    'auth/cancelbooking',
    async({user_id,bookId})=>{
        try{
        console.log(user_id);
        const response= await axios.patch(`/cancel-booking/${user_id}/${bookId}`);
        message.success(response?.data.message);
        console.log(response,"user cancel booking");
        return response;
        }catch(error){
            console.log(error);
  
            message.error(error.response?.data.message);
            throw error;

        }
    }
)

export const AddReview=createAsyncThunk(
  'auth/addreview',
  async({bookId,data})=>{
      try{
      console.log(bookId,data);
      const response= await axios.post(`/add-review/${bookId}`,data);
      message.success(response?.data.message);
      console.log(response,"add review response");
      return response;
      }catch(error){
          console.log(error);

          message.error(error.response?.data.message);
          throw error;

      }
  }
)

export const AddComplaint=createAsyncThunk(
  'auth/addcomplaint',
  async({bookId,complaint})=>{
      try{
      console.log(bookId,complaint);
      const response= await axios.post(`/add-complaint/${bookId}`,complaint);
      message.success(response?.data.message);
      console.log(response,"add review response");
      return response;
      }catch(error){
          console.log(error);

          message.error(error.response?.data.message);
          throw error;

      }
  }
)


  
  const initialState = { loading: false,lounges: null,vendorId:null,loungeId:null,user:null,bookings:null,chartData:null};
  
  
  
  const LoungeSlice = createSlice({
    name: "lounges",
    initialState,
    reducers: {
      resetLoungeSliceUser:()=>initialState,

      setVendorId:(state,action)=>{
        state.vendorId=action.payload.id;
      },
      setLoungeId:(state,action)=>{
        state.loungeId=action.payload.id;
      },
  
    },
    extraReducers: (builder) => {
  
      builder
        .addCase(getlounges.pending, (state, action) => {
          state.loading = true;
        
        })
        .addCase(getlounges.fulfilled, (state, action) => {
          state.loading = false;
          state.lounges=action.payload.data.lounges;
        })
        .addCase(getlounges.rejected, (state, action) => {
          state.loading = false;
        })
        .addCase(getuserprofile.pending, (state, action) => {
            state.loading = true;
          
          })
          .addCase(getuserprofile.fulfilled, (state, action) => {
            state.loading = false;
            state.user=action.payload.data.user;
            state.bookings=action.payload.data.bookings;
          })
          .addCase(getuserprofile.rejected, (state, action) => {
            state.loading = false;
          })
          
          
    },
  });
  

  export const {resetLoungeSliceUser,setVendorId,setLoungeId}=LoungeSlice.actions;
  export default LoungeSlice.reducer;