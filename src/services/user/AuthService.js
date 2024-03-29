// import axios from "axios";
// import { Url } from "../../apis/Axios";
import axios from "../../apis/AxiosUser";
import { UserOtp, UserLogin, UserSignup, UserResendOtp } from "../../utils/endpoints/endpoints";



const register = (user) => {
    return new Promise((resolve, reject) => {
      axios.post(UserSignup, user)
        .then((response) => {
          console.log("inside token area user register");
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
  console.log("otp verification services user side");
    return new Promise((resolve,reject)=>{
      console.log("inside otp verification user side")
      console.log(otpData);
        axios.post(UserOtp,otpData).then((response)=>{
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
      axios.post(UserResendOtp,otpData).then((response)=>{
        console.log("inside services resendotp userside")
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
    axios.post(UserLogin, user)
    .then((response) => {
      console.log("inside login area user side ");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("userToken", JSON.stringify({
      userId:response?.data?._id,
      token: response?.data?.token,
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