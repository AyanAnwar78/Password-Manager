import React from 'react'
import logo from "../assets/logo.svg"
function Navbar() {
  return (
    <nav className='bg-black text-white flex justify-between px-24'>
      <img src={logo} className="h-18 w-18" />
      <div className='flex gap-6'>
        <span className=' py-4 text-xl'>Home</span>
        <span className=' py-4 text-xl'>Contact</span>
        <span className=' py-4 text-xl'>Login</span>
      </div>
    </nav>
  )
}

export default Navbar