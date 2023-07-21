

import { combineReducers } from '@reduxjs/toolkit';
import UserAuthReducer from '../../slices/user/Auth';
import VendorAuthReducer from '../../slices/vendor/Auth'
import AdminAuthReducer from '../../slices/admin/Auth'
import messageReducer from "../../slices/Message";
import VendorLoungeReducer from "../../slices/vendor/Lounges";
import AdminLoungeReducer from "../../slices/admin/Lounges"
import VendorFacilityReducer from "../../slices/vendor/Facility";
import AdminFacilityReducer from "../../slices/admin/Facility"
import VendorBookingReducer from "../../slices/vendor/Bookings"
import UserLoungeReducer from "../../slices/user/Lounges";
import UserFacilityReducer from "../../slices/user/Facility";

const RootReducer=combineReducers({
   
    userauth:UserAuthReducer,
    loungeuser:UserLoungeReducer,
    facilityuser:UserFacilityReducer,
    vendorauth:VendorAuthReducer,
    loungevendor:VendorLoungeReducer,
    facilityvendor:VendorFacilityReducer,
    bookingvendor:VendorBookingReducer,
    adminauth:AdminAuthReducer,
    loungeadmin:AdminLoungeReducer,
    facilityadmin:AdminFacilityReducer,
    message:messageReducer

})

export default RootReducer;