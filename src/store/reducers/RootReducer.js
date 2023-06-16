import { combineReducers } from "redux";

import UserAuthReducer from '../../slices/user/Auth';
import VendorAuthReducer from '../../slices/vendor/Auth'
import AdminAuthReducer from '../../slices/admin/Auth'
import messageReducer from "../../slices/Message";
import LoungeReducer from "../../slices/vendor/Lounges"

const RootReducer=combineReducers({
   
    userauth:UserAuthReducer,
    vendorauth:VendorAuthReducer,
    adminauth:AdminAuthReducer,
    loungevendor:LoungeReducer,
    message:messageReducer

})

export default RootReducer;