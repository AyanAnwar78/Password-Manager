import React from 'react'
import logo from "../assets/logo.svg"
function Footer() {
  return (
        <footer className='bg-black flex justify-between px-24 h-18'>
          <img src={logo} className="h-16 w-16 pt-2" />
          <div className='flex gap-4'>
            <span className=' py-4 text-white text-xl'>Created by Ayan</span>
          </div>
        </footer>
  )
}

export default Footer