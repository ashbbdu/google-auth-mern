import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import apiServices from "../apiServices";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const [formData , setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : ""
    })

    const navigate = useNavigate()
    const handleGoogleLoginSuccess = async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        const postData = await apiServices.httpPost("/user/create-user" , {
            googleAccessToken : accessToken
        })
        if(postData.success) {
            navigate("/login")
        }
    }

    const handleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});

    const onChangeHander = (event) => {
        const { name , value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]:  value
            }
        })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
        const details = await apiServices.httpPost("/user/create-user" , {
            ...formData
        })
        if(details.success) {
            navigate("/login")
        }       

    }


  return (
    <div className="mt-10">
      <form onSubmit={submitHandler} className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <h1 className="text-2xl">Create your account</h1>

        <div className="w-2/5">
          <label htmlFor="firstName">First Name</label> <br />
          <input
            name="firstName"
            type="text"
            placeholder="Enter your first name"
            className="border border-black p-2 rounded-md w-full"
            onChange={onChangeHander}
          />
        </div>

        <div className="w-2/5">
          <label htmlFor="firstName">Last Name</label> <br />
          <input
            name="lastName"
            type="text"
            placeholder="Enter your last name"
            className="border border-black p-2 rounded-md w-full"
             onChange={onChangeHander}
          />
        </div>


        <div className="w-2/5">
          <label htmlFor="email">Email</label> <br />
          <input
            name="email"
            type="text"
            placeholder="Enter your email"
            className="border border-black p-2 rounded-md w-full"
             onChange={onChangeHander}
          />
        </div>

        <div className="w-2/5">
          <label htmlFor="password">Password</label>
          <br />
          <input
            name="password"
            type="text"
            placeholder="Enter your password"
            className="border border-black p-2 rounded-md w-full"
             onChange={onChangeHander}
          />
        </div>

        <div className="w-2/5">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br />
          <input
            name="confirmPassword"
            type="text"
            placeholder="Enter your password"
            className="border border-black p-2 rounded-md w-full"
             onChange={onChangeHander}
          />
        </div>
        <button className="bg-[#bf5656] w-2/5 px-4 py-2 mt-1 rounded-md">
          Register
        </button>
        <div onClick={() =>  handleLogin()} className="cursor-pointer bg-black text-white w-2/5 px-4 py-2 mt-1 rounded-md flex items-center justify-center gap-2">
          <span>
            <FcGoogle size={25} />
          </span>
          Register with google
        </div>
      </form>
    </div>
  );
};

export default Register;
