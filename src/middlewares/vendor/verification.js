import { getNextKeyDef } from "@testing-library/user-event/dist/keyboard/getNextKeyDef";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VendorVerification({children}){
    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        if(!localStorage.getItem("vendorToken")){
            console.log(location.pathname);
            if (location.pathname !== "/manager/register" && location.pathname !== "/manager/otp")
            navigate('/manager/login');
        }else{
            navigate(location.pathname);
            
        }
    },[navigate,location.pathname]);
    return children;
}


