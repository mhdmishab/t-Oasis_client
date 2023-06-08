import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserVerification({children}){
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        if(!localStorage.getItem("userToken")){
            console.log(location.pathname);
            if (location.pathname !== "/register" && location.pathname !== "/otp")
            navigate('/login');
        }else{
            navigate('/')
        }
    },[navigate,location.pathname]);
    return children;
}