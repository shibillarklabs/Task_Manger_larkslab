import type { AxiosResponse } from "axios";
import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

type User={
    id:string;
    name:string;
    email:string;
    role:string;
};

// login user
export const loginUserAPI = async(email: string, role: string)=>{
    const response = await commonAPI("get",`${SERVERURL}/users`)as AxiosResponse<User[]>;
    const users = response.data;

    const matchedUser = users.find(
        (user)=>
            user.email.toLowerCase()=== email.toLowerCase()&&
        user.role.toLowerCase()=== role.toLowerCase()
    );
    if(!matchedUser){
        throw new Error('Invalid Email or Role');
    }
    return matchedUser;
}


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
// assign task to develoepr
export const assignTaskToDeveloperAPI = async (taskId: string, developerId: string)=>{
    return await commonAPI("patch",`${SERVERURL}/tasks/${taskId}`,{
        assigneeId: developerId,
    })
}

// developer edit status
export const updateTaskStatusAPI = async (taskId: string, status:string)=>{
    return await commonAPI("patch", `${SERVERURL}/tasks/${taskId}`, { status })
}

// get all comments
export const getAllCommentAPI = async ()=>{
    return await commonAPI("get", `${SERVERURL}/comments`)
}

// post a new comment
export const postCommentAPI = async (commentData: {taskId: string, userId: string, message: string, timestamp: string})=>{
    return await commonAPI("post", `${SERVERURL}/comments`, commentData)
}

// deletecomment
export const deleteCommentAPI = async (commentId : string)=>{
    return await commonAPI("delete", `${SERVERURL}/comments/${commentId}`)
}

// editcomment
export const updateCommentAPI = async (commentId: string, updatedData: {message: string; timestamp: string})=>{
    return await commonAPI("patch",`${SERVERURL}/comments/${commentId}`,updatedData)
}