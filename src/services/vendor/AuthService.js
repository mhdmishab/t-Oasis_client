import axios from "axios";
import { Url } from "../../apis/Axios";
import { VendorLogin, VendorSignup } from "../../utils/endpoints/endpoints";
import jwtDecode from "jwt-decode";


const register = (user) => {
    return new Promise((resolve, reject) => {
      axios.post(Url +VendorSignup, user)
        .then((response) => {
          console.log("inside token area");
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
    return new Promise((resolve,reject)=>{
      console.log(otpData);
        axios.post(Url+"/vendor/verifyotp",otpData).then((response)=>{
            console.log(response.data);
            resolve(response.data) ;
        }).catch((error)=>{
            reject(error) ;
        })
    })
}

// const resendotp=(otpData)=>{
//   return new Promise((resolve,reject)=>{
//     console.log(otpData);
//       axios.post(Url+"/vendor/verifyotp",otpData).then((response)=>{
//           console.log(response+"inside authservices otp");
//           resolve(response);
//       }).catch((error)=>{
//           reject(error);
//       })
//   })
// }

const login=(user)=>{
  return new Promise((resolve,reject)=>{
    axios.post(Url +VendorLogin, user)
    .then((response) => {
      console.log("inside token area");
      console.log(response);

    const expirationTimeInMinutes = 60;
    const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
    
  
    localStorage.setItem("vendorToken", JSON.stringify({
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


const authService = {
    register,otpverification,login
   
  };
  
  export default authService;

