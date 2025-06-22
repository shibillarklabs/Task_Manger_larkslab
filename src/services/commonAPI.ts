import type { AxiosRequestConfig, AxiosResponse } from "axios";
import axios from "axios";


const commonAPI = async (
    httpMethod : "get" | "post" | "put" | "delete" | "patch",
    url:string,
    reqBody?:any
): Promise<AxiosResponse | unknown> => { 
    const reqConfig : AxiosRequestConfig = {
        method : httpMethod,
        url,
        data:reqBody,
    };
    try{
        const res = await axios(reqConfig);
        return res;
    }catch(err){
        return err;
    }
};

export default commonAPI;