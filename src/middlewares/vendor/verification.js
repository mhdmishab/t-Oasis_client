
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VendorVerification({children}){

    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const token=localStorage.getItem("vendorToken");
        
        if(!token){
            console.log(location.pathname);
            console.log("vendor login check 1");
            if (location.pathname !== "/manager/register" && location.pathname !== "/manager/otp")
                navigate('/manager/login');
        }else{
            // navigate(location.pathname);
                console.log("vendor login check 2");
                navigate("/manager/dashboard");
            
        }
    },[]);
    return children;
}


