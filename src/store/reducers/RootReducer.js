

import { combineReducers } from '@reduxjs/toolkit';
import UserAuthReducer from '../../slices/user/Auth';
import VendorAuthReducer from '../../slices/vendor/Auth'
import AdminAuthReducer from '../../slices/admin/Auth'
import messageReducer from "../../slices/Message";
import VendorLoungeReducer from "../../slices/vendor/Lounges";
import AdminLoungeReducer from "../../slices/admin/Lounges"
import VendorFacilityReducer from "../../slices/vendor/Facility";
import UserLoungeReducer from "../../slices/user/Lounges";
import UserFacilityReducer from "../../slices/user/Facility";

const RootReducer=combineReducers({
   
    userauth:UserAuthReducer,
    loungeuser:UserLoungeReducer,
    facilityuser:UserFacilityReducer,
    vendorauth:VendorAuthReducer,
    loungevendor:VendorLoungeReducer,
    facilityvendor:VendorFacilityReducer,
    adminauth:AdminAuthReducer,
    loungeadmin:AdminLoungeReducer,
    message:messageReducer

})

export default RootReducer;