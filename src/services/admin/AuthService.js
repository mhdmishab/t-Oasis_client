// import axios from "axios";
// import { Url } from "../../apis/Axios";
import axios from "../../apis/AxiosAdmin";



const login=(user)=>{
    return new Promise((resolve,reject)=>{
      axios.post("/admin/login", user)
      .then((response) => {
        console.log("inside token area");
        console.log(response);
        if(response.data.success){
            
            const expirationTimeInMinutes = 60;
            const expirationTime = new Date().getTime() + expirationTimeInMinutes * 60 * 1000;
            
            
            
            localStorage.setItem("adminToken", JSON.stringify({
                token: response.data.token,
                expiresAt: expirationTime
            }));
            resolve(response.data); 
        }else{
            return reject(response);
        }
      })
      .catch((error) => {
        reject(error); 
      });
    })
  }




  
const AuthService = {
    login
   
  };
  
  export default AuthService;