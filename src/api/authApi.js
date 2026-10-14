import axios from "axios";


// Backend API URL

const API = axios.create({

baseURL:"http://localhost:5000/api/auth",

headers:{

"Content-Type":"application/json"

}

});




// Login API

export const loginAPI = (data)=>{

return API.post(
"/login",
data
);

};




// Register API

export const registerAPI = (data)=>{

return API.post(
"/register",
data
);

};




// Save token automatically

API.interceptors.response.use(

(response)=>{


if(response.data.token){


localStorage.setItem(

"token",

response.data.token

);


}


return response;


},


(error)=>{


return Promise.reject(error);


}

);



export default API;