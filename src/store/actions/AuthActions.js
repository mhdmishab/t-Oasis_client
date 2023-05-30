import axios from "axios";
import { Url } from "../../apis/Axios";
import { toast } from "react-toastify";





export const Signup=(user)=>{

    return (dispatch)=>{
        axios
        .post(`${Url}/signup`,user)
        .then((token)=>{
            console.log(token);

            if(token.status === 400){
                console.log("400 inside");
            }

            localStorage.setItem("token",token.data);

            dispatch({
                type:"SIGN_UP",
                token:token.data,
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