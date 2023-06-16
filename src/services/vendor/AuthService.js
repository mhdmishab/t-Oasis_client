import axios from "axios";
import { Url } from "../../apis/Axios";
import { VendorLogin, VendorOtp, VendorResendOtp, VendorSignup } from "../../utils/endpoints/endpoints";



const register = (user) => {
    return new Promise((resolve, reject) => {
      axios.post(Url +VendorSignup, user)
        .then((response) => {
          console.log("inside register vendor side");
          console.log(response);

        const expirationTimeInMinutes = 1;
        const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
        
      
        localStorage.setItem("otptoken", JSON.stringify({
          
          token: response.data.token,
          expiresAt: expirationTime
        }));
          resolve(response); 
        })
        .catch((error) => {
          reject(error); 
        });
    });
  };

const otpverification=(otpData)=>{
  console.log("otp verification services vendor side");
    return new Promise((resolve,reject)=>{
      console.log(otpData);
        axios.post(Url+VendorOtp,otpData).then((response)=>{
            console.log(response.data);
            resolve(response.data) ;
        }).catch((error)=>{
            reject(error) ;
        })
    })
}

const resendotp=(otpData)=>{
  return new Promise((resolve,reject)=>{
    console.log(otpData);
      axios.post(Url+VendorResendOtp,otpData).then((response)=>{
        console.log("inside services resendotp vendor side")
          console.log(response);
          const expirationTimeInMinutes = 1;
          const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
          
          console.log(response.data.token);
          localStorage.removeItem("otptoken");
          localStorage.setItem("otptoken", JSON.stringify({
            token: response.data.token,
            expiresAt: expirationTime
          }));
          resolve(response.data);
      }).catch((error)=>{
          reject(error);
      })
  })
}

const login=(user)=>{
  return new Promise((resolve,reject)=>{
    axios.post(Url +VendorLogin, user)
    .then((response) => {
      console.log("inside login vendor");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("vendorToken", JSON.stringify({
      token: response.data.token,
      vendorId:response.data._id,
      expiresAt: expirationTime
    }));
      resolve(response); 
    })
    .catch((error) => {
      reject(error); 
    });
  })
}


const AuthService = {
    register,otpverification,login,resendotp
   
  };
  
  export default AuthService;




