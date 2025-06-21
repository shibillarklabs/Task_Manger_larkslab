import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";


// get users
export const getAllUsersAPI = async ()=>{
    return await commonAPI("get",`${SERVERURL}/users`)
}
// post user
export const postUsersAPI = async (userData:any)=>{
    return await commonAPI("post",`${SERVERURL}/users`,userData)
}
// update user
export const updateUserAPI = async (userId: string, updatedData: any)=>{
    return await commonAPI("put", `${SERVERURL}/users/${userId}`, updatedData)
}
// delete user
export const deleteUserAPI = async (userId: string)=>{
    return await commonAPI("delete", `${SERVERURL}/users/${userId}`);
}
// getprojects
export const getAllTasksAPI = async ()=>{
    return await commonAPI("get",`${SERVERURL}/tasks`);
}
// postprojects
export const postTaskAPI = async (taskData:any)=>{
    return await commonAPI("post",`${SERVERURL}/tasks`,taskData);
};
// editproject
export const updateTaskAPI =async (taskId: string, updatedData: any)=>{
    return await commonAPI('put',`${SERVERURL}/tasks/${taskId}`,updatedData);
}
// deleteproject
export const deleteTaskAPI = async(taskId: string)=>{
    return await commonAPI('delete',`${SERVERURL}/tasks/${taskId}`)
}