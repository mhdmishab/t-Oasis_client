import { createSlice } from "@reduxjs/toolkit";

const initialState={};
const messageSlice=createSlice({
    name:"message",
    initialState,
    reducers:{
        setMessage:(state,action)=>{
            return {message:action.payload};
        },
        clearmessage:()=>{
            return {message:""};
        }
    }
})

const {reducer,actions}=messageSlice;

export const {setMessage,clearmessage}=actions;
export default reducer;
