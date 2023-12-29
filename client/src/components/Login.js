import React from 'react'
import { FcGoogle } from "react-icons/fc";


const Login = () => {
  return (
    <form className='flex flex-col items-center justify-center h-[70vh] gap-4'>
        <h1 className='text-2xl'>Welcome Back</h1>
        <div className='w-2/5'>
        <label>Email</label> <br/>
        <input type="text" placeholder='Enter your email' className='border border-black p-2 rounded-md w-full' />
        </div>

        <div className='w-2/5'>
        <label>Password</label><br/>
        <input type="text" placeholder='Enter your password' className='border border-black p-2 rounded-md w-full' />
        </div>
        <button className='bg-[#bf5656] w-2/5 px-4 py-2 mt-1 rounded-md'>Login</button>
        <button className='bg-black text-white w-2/5 px-4 py-2 mt-1 rounded-md flex items-center justify-center gap-2'><span><FcGoogle size={25} /></span>Login with google</button>

    </form>
  )
}

export default Login