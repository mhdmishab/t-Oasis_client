
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminVerification({children}){

    const navigate=useNavigate();
    const location=useLocation();

    useEffect(()=>{
        const token=localStorage.getItem("adminToken");
        
        if(!token){
            
                navigate('/admin/login');
        }else{
 
                navigate("/admin/dashboard");
            
        }
    },[]);
    return children;
}