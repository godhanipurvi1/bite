import "./Register.css";

import {useState} from "react";
import {Link,useNavigate} from "react-router-dom";

import {
FaUser,
FaEnvelope,
FaLock,
FaEye,
FaEyeSlash,
FaPhone
} from "react-icons/fa";


import {registerUser} from "./registerService";


export default function Register(){


const navigate = useNavigate();


const [showPassword,setShowPassword]=useState(false);


const [form,setForm]=useState({

name:"",
email:"",
phone:"",
password:""

});


const [loading,setLoading]=useState(false);

const [error,setError]=useState("");



const handleChange=(e)=>{


setForm({

...form,

[e.target.name]:e.target.value

});


};



const handleSubmit=async(e)=>{


e.preventDefault();


setError("");


try{


setLoading(true);


const response = await registerUser(form);


console.log(
"Registration Success",
response
);



navigate("/");


}

catch(err){


setError(

err.response?.data?.message ||
"Registration failed"

);


}

finally{


setLoading(false);


}


};



return(

<div className="registerPage">


<div className="registerCard">


<h1>
BiteVerse
</h1>


<h2>
Create Account
</h2>


<p className="subtitle">
Join BiteVerse today
</p>



<form onSubmit={handleSubmit}>


<div className="inputBox">

<FaUser/>

<input

type="text"

name="name"

placeholder="Full Name"

value={form.name}

onChange={handleChange}

required

/>

</div>




<div className="inputBox">

<FaEnvelope/>

<input

type="email"

name="email"

placeholder="Email Address"

value={form.email}

onChange={handleChange}

required

/>

</div>




<div className="inputBox">

<FaPhone/>

<input

type="text"

name="phone"

placeholder="Phone Number"

value={form.phone}

onChange={handleChange}

required

/>

</div>




<div className="inputBox">


<FaLock/>


<input


type={
showPassword
?
"text"
:
"password"
}


name="password"


placeholder="Password"


value={form.password}


onChange={handleChange}


required


/>



<span
onClick={
()=>setShowPassword(!showPassword)
}
>


{

showPassword

?

<FaEyeSlash/>

:

<FaEye/>

}


</span>


</div>



{
error &&
<p className="error">
{error}
</p>
}



<button className="registerBtn">


{

loading

?

"Creating..."

:

"Register"

}


</button>


</form>



<p className="loginText">


Already have an account?


<Link to="/">

Login

</Link>


</p>



</div>


</div>


)


}