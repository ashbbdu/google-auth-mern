import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios"
import apiServices from "../apiServices";

const Register = () => {
const [googleToken , setGoogleToken] = useState("")
    const handleGoogleLoginSuccess = async (tokenResponse) => {
        const accessToken = tokenResponse.access_token;
        setGoogleToken(accessToken);
        // localStorage.setItem("token" , accessToken)
        const postData = await apiServices.httpPost("/user/create-user" , {
            googleAccessToken : accessToken
        })
        console.log(postData);
    }

    const handleLogin = useGoogleLogin({onSuccess: handleGoogleLoginSuccess});


  return (
    <div className="mt-10">
      <form className="flex flex-col items-center justify-center h-[70vh] gap-4">
        <h1 className="text-2xl">Create your account</h1>

        <div className="w-2/5">
          <label>First Name</label> <br />
          <input
            type="text"
            placeholder="Enter your first name"
            className="border border-black p-2 rounded-md w-full"
          />
        </div>

        <div className="w-2/5">
          <label>Last Name</label> <br />
          <input
            type="text"
            placeholder="Enter your last name"
            className="border border-black p-2 rounded-md w-full"
          />
        </div>


        <div className="w-2/5">
          <label>Email</label> <br />
          <input
            type="text"
            placeholder="Enter your email"
            className="border border-black p-2 rounded-md w-full"
          />
        </div>

        <div className="w-2/5">
          <label>Password</label>
          <br />
          <input
            type="text"
            placeholder="Enter your password"
            className="border border-black p-2 rounded-md w-full"
          />
        </div>

        <div className="w-2/5">
          <label>Confirm Password</label>
          <br />
          <input
            type="text"
            placeholder="Enter your password"
            className="border border-black p-2 rounded-md w-full"
          />
        </div>
        <button className="bg-[#bf5656] w-2/5 px-4 py-2 mt-1 rounded-md">
          Register
        </button>
        <div onClick={() =>  handleLogin()} className="bg-black text-white w-2/5 px-4 py-2 mt-1 rounded-md flex items-center justify-center gap-2">
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
