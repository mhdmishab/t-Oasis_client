import jwtDecode from "jwt-decode"


const initialState={
    token:localStorage.getItem("token"),
    name:null,
    email:null,
    password:null,
    otp:null,
    _id:null
}

const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case "OTP_VERIFY":
        case "SIGN_UP":
            const user=jwtDecode(action.token);
            return{
                ...initialState,
                token:action.token,
                name:user.name,
                email:user.email,
                _id:user._id
            }
            case "OTP_TOKEN":
            const otptoken=jwtDecode(action.token);
            return{
                ...initialState,
                token:action.token,
                name:otptoken.name,
                email:otptoken.email,
                password:otptoken.password,
                otp:otptoken.OTP,
            }
            
            
           
        
        default:
            return state;
    }
}

export default AuthReducer;