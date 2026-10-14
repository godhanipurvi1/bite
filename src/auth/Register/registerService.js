import {registerAPI} from "../../api/authApi";



export const registerUser = async(data)=>{


const response = await registerAPI(data);


return response.data;


};