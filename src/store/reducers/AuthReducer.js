import jwtDecode from "jwt-decode"


const initialState={
    token:localStorage.getItem("token"),
    name:null,
    email:null,
    _id:null
}

const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SIGN_UP":
            const user=jwtDecode(action.token);
            return{
                ...initialState,
                token:action.token,
                name:user.name,
                email:user.email,
                _id:user._id
            }
        default:
            return state;
    }
}

export default AuthReducer;