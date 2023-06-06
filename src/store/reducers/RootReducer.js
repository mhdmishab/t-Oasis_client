import { combineReducers } from "redux";

import authReducer from "../../slices/vendor/Auth";
import messageReducer from "../../slices/Message";

const RootReducer=combineReducers({
   
    authe:authReducer,
    message:messageReducer

})

export default RootReducer;