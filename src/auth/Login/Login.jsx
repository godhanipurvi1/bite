import "./Login.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaApple
} from "react-icons/fa";

import { loginUser } from "./loginService";


export default function Login(){

  const navigate = useNavigate();

  const [showPassword,setShowPassword] = useState(false);

  const [loading,setLoading] = useState(false);

  const [error,setError] = useState("");


  const [form,setForm] = useState({

    email:"",
    password:""

  });



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


      const data = await loginUser(form);


      console.log(
        "Login Success",
        data
      );


      navigate("/");


    }
    catch(error){


      setError(

        error.response?.data?.message ||

        "Invalid email or password"

      );


    }
    finally{

      setLoading(false);

    }

  };



  return (

    <div className="loginPage">


      <div className="loginCard">


        <div className="brand">


          <h1>
            BiteVerse
          </h1>


          <p>
            Food delivery made simple
          </p>


        </div>



        <h2>
          Welcome Back
        </h2>


        <p className="subtitle">
          Login to continue
        </p>



        <form onSubmit={handleSubmit}>


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

              onClick={()=>setShowPassword(!showPassword)}

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



          <button

            className="loginBtn"

            type="submit"

          >


            {

              loading

              ?

              "Logging..."

              :

              "Login"

            }


          </button>


        </form>




        <div className="divider">


          <span></span>

          OR

          <span></span>


        </div>




        <div className="social">


          <button type="button">

            <FaGoogle/>

          </button>


          <button type="button">

            <FaFacebookF/>

          </button>



          <button type="button">

            <FaApple/>

          </button>



        </div>




        <p className="registerText">


          Don't have an account?


          <Link to="/register">

            Register

          </Link>


        </p>



      </div>


    </div>

  );

}