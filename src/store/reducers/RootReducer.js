

import { combineReducers } from '@reduxjs/toolkit';
import UserAuthReducer from '../../slices/user/Auth';
import VendorAuthReducer from '../../slices/vendor/Auth'
import AdminAuthReducer from '../../slices/admin/Auth'
import messageReducer from "../../slices/Message";
import VendorLoungeReducer from "../../slices/vendor/Lounges"
import AdminLoungeReducer from "../../slices/admin/Lounges"

const RootReducer=combineReducers({
   
    userauth:UserAuthReducer,
    vendorauth:VendorAuthReducer,
    adminauth:AdminAuthReducer,
    loungevendor:VendorLoungeReducer,
    loungeadmin:AdminLoungeReducer,
    message:messageReducer

})

export default RootReducer;