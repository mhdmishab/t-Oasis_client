import axios from "axios";
import { Url } from "../../apis/Axios";

const vendor_id = JSON.parse(localStorage.getItem("vendorToken")).vendorId;

console.log(vendor_id);
const addlounge=async(loungeData)=>{
    console.log("inside lounge service")
        await axios.post(Url+`/vendor/addlounge/${vendor_id}`,loungeData).then((response)=>{
        return response;
    }).catch((error)=>{
        return error;
    })
}





const LoungeService={
    addlounge
}

export default LoungeService;

