import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import apiServices from "../apiServices";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  async function handleGoogleLoginSuccess(tokenResponse) {
    const accessToken = tokenResponse.access_token;
    const response = await apiServices.httpPost("/user/signin", {
      googleAccessToken: accessToken,
    });

    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    }
  }
  const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

  const onChangeHander = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const response = await apiServices.httpPost("/user/signin", {
      ...formData,
    });
    if (response.success) {
      localStorage.setItem("token", response.token);
      navigate("/dashboard");
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col items-center justify-center h-[70vh] gap-4"
    >
      <h1 className="text-2xl">Welcome Back</h1>
      <div className="w-2/5">
        <label htmlFor="email">Email</label> <br />
        <input
          onChange={onChangeHander}
          name="email"
          type="text"
          placeholder="Enter your email"
          className="border border-black p-2 rounded-md w-full"
        />
      </div>

      <div className="w-2/5">
        <label htmlFor="password">Password</label>
        <br />
        <input
          onChange={onChangeHander}
          name="password"
          type="text"
          placeholder="Enter your password"
          className="border border-black p-2 rounded-md w-full"
        />
      </div>
      <button className="bg-[#bf5656] w-2/5 px-4 py-2 mt-1 rounded-md">
        Login
      </button>
      <div
        onClick={() => login()}
        className="cursor-pointer bg-black text-white w-2/5 px-4 py-2 mt-1 rounded-md flex items-center justify-center gap-2"
      >
        <span>
          <FcGoogle size={25} />
        </span>
        Login with google
      </div>
    </form>
  );
};

export default Login;
