import {loginAPI} from "../../api/authApi";



export const loginUser = async(data)=>{


const response = await loginAPI(data);


return response.data;


};