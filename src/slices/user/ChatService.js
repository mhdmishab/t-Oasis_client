import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "../../apis/AxiosUser";


export const GetPrivateChatMessages=createAsyncThunk(
    "chat/getprivatechat",
    async({vendorId,userId,data})=>{
        try{

            const response=await axios.post(`/chat-sendmessage/${vendorId}/${userId}`,{data});
            console.log(response,"inside get private chat user");
            return response;

        }catch(error){
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
        }
    }
)

export const GetConversationMessages=createAsyncThunk(
    "chat/getconversation",
    async({vendorId,userId})=>{
        try{

            const response=await axios.get(`/chat-conversations/${vendorId}/${userId}`);
            console.log(response,"inside get private chat user");
            return response;

        }catch(error){
        console.log(error)
       
        message.error(error.response?.data.message);
        throw error;
        }
    }
)