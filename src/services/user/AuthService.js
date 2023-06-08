import axios from "axios";
import { Url } from "../../apis/Axios";
import { UserOtp, UserLogin, UserSignup, UserResendOtp } from "../../utils/endpoints/endpoints";



const register = (user) => {
    return new Promise((resolve, reject) => {
      axios.post(Url +UserSignup, user)
        .then((response) => {
          console.log("inside token area");
          console.log(response);

        const expirationTimeInMinutes = 1;
        const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
        
        console.log(response.data.token);
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
    return new Promise((resolve,reject)=>{
      console.log(otpData);
        axios.post(Url+UserOtp,otpData).then((response)=>{
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
      axios.post(Url+UserResendOtp,otpData).then((response)=>{
        console.log("inside services resendotp")
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
    axios.post(Url +UserLogin, user)
    .then((response) => {
      console.log("inside token area");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("userToken", JSON.stringify({
      token: response.data.token,
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