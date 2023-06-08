import { combineReducers } from "redux";

import UserAuthReducer from '../../slices/user/Auth';
import VendorAuthReducer from '../../slices/vendor/Auth'
import AdminAuthReducer from '../../slices/admin/Auth'
import messageReducer from "../../slices/Message";

const RootReducer=combineReducers({
   
    userauth:UserAuthReducer,
    vendorauth:VendorAuthReducer,
    adminauth:AdminAuthReducer,
    message:messageReducer

})

export default RootReducer;