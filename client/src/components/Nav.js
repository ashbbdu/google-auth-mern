import React from 'react'
import { Link } from 'react-router-dom'

const Nav = () => {
  return (
    <div className='flex items-center justify-between px-6 py-4 bg-black text-white'>
        <div>
            <div>
                <h2>Google Auth</h2>
            </div>
        </div>
        <div>
        <ul className='flex items-center justify-between px-6 gap-6'>
            <li><Link>About</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Signup</Link></li>
        </ul>
        </div>
    </div>
  )
}

export default Nav