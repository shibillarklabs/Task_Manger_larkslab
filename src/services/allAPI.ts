import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";


// all users
export const getAllUsersAPI = async ()=>{
    return await commonAPI("get",`${SERVERURL}/users`)
}