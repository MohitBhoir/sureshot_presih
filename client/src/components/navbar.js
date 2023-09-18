import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt,FaSignOutAlt,FaUser,FaHome,FaBuilding} from 'react-icons/fa'

const Navbar = () => {
  const user=JSON.parse(localStorage.getItem('userData'))
  // const [data,setData]=useState(userAdmin)
  // const [sData,setSData]=useState(userUser)
  const logout=()=>{
     localStorage.clear()
     window.location.reload()
        setTimeout(()=>{
            window.stop()
        },40)
  }
  return <>
  <nav className='flex bg-yellow-500  justify-between items-center p-3'>
    <div>
        {user?<h1 className='font-extrabold text-black text-3xl font-sans'>
          {`Hey ${user.type}`}</h1>:<></>}
        <h1 className='font-extrabold text-red-800 text-3xl font-sans'>AICTE</h1>
    </div>
    <ul className='flex justify-evenly gap-5'>
    
      <Link to="/"><li className='text-red-800   text-xl  cursor-pointer'><FaHome 
      className='hover:text-white hover:bg-red-800 p-2 
      rounded-md duration-200' size={40} />Home</li></Link>

    {/* {user?<Link to="/adDash" className='text-red-800   text-xl  cursor-pointer'><FaBuilding 
    className='hover:text-white hover:bg-red-800 p-2 
    rounded-md duration-200' size={40} />Admin</Link>:<></>} */}
    {
      user?

      <Link to="/login" className='text-red-800   text-xl  cursor-pointer'><FaSignOutAlt
      className='hover:text-white hover:bg-red-800 p-2 
      rounded-md duration-200' size={40} onClick={logout} />Logout</Link>

      :
      
      <>
          <Link to="/login"className='text-red-800   text-xl  cursor-pointer'><FaSignInAlt 
          className='hover:text-white hover:bg-red-800 p-2 
          rounded-md duration-200' size={40} />Login</Link>
          <Link to="/register"><li className='text-red-800 
          transition-all text-xl  cursor-pointer'><FaUser size={40} 
          className='hover:text-white hover:bg-red-800 p-2 
          rounded-md duration-200'/>Register</li></Link>
      </>
    }
    </ul>
  </nav>
</>
}

export default Navbar