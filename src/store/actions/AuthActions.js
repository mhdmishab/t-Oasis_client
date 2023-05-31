import axios from "axios";
import { Url } from "../../apis/Axios";
import { toast } from "react-toastify";





export const Signup=(user)=>{

    return (dispatch)=>{
        axios
        .post(`${Url}/signup`,user)
        .then((otpToken)=>{
            console.log("inside token area")
            console.log(otpToken);


            localStorage.setItem("token",otpToken.data);

            dispatch({
                type:"OTP_TOKEN",
                token:otpToken.data,
            })
            
        })
        .catch((error)=>{
            console.log("error detected")
            console.log(error.response.data.message); 

            toast.error(error.response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
        })
    }
}
export const otpVerification=(otpData)=>{

    return (dispatch)=>{
        axios
        .post(`${Url}/verifyotp`,otpData)
        .then((response)=>{
            console.log("inside response area")
            console.log(response.data.message);

            if(response.data.success){
            localStorage.removeItem("token");
            localStorage.setItem("token",response.data.token);
            }

            dispatch({
                type:"OTP_VERIFY",
                token:response.data.token,
            })
            
        })
        .catch((error)=>{
            console.log("error detected")
            console.log(error.response.data.message); 

            toast.error(error.response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
        })
    }
}

export const Login=(user)=>{
    return (dispatch)=>{
        axios
        .post(`${Url}/login`,user)
        .then((response)=>{
            console.log("inside token area")
            console.log(response.data.message);


            localStorage.setItem("token",response.data.token);

            dispatch({
                type:"SIGN_UP",
                token:response.data.token,
            })
            
        })
        .catch((error)=>{
            console.log("error detected")
            console.log(error.response.data.message); 

            toast.error(error.response?.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
              });
        })
    }
}
