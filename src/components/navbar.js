import React,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {FaSignInAlt,FaSignOutAlt,FaUser,FaHome,FaBuilding} from 'react-icons/fa'

const Navbar = () => {
  const userAdmin=JSON.parse(localStorage.getItem('userAdmin'))
  const userUser=JSON.parse(localStorage.getItem('userUser'))
  const [data,setData]=useState(userAdmin)
  const [sData,setSData]=useState(userUser)
  const logout=()=>{
     localStorage.clear()
     window.location.reload()
        setTimeout(()=>{
            window.stop()
        },40)
  }
  return <>
  <nav className='flex bg-yellow-500  justify-between items-center p-3 rounded-bl-full'>
    <div>
        {userUser?<h1 className='font-extrabold text-black text-3xl font-sans'>
          {`Hey ${userUser.name}`}</h1>:<></>}
        <h1 className='font-extrabold text-red-800 text-3xl font-sans'>AICTE</h1>
    </div>
    <ul className='flex justify-evenly gap-5'>
    {
       (userUser || userAdmin)?<Link to="/feed"><li className='text-red-800   text-xl  cursor-pointer'><FaHome 
        className='hover:text-white hover:bg-red-800 p-2 
        rounded-md duration-200' size={40} />Feed</li></Link>
      
      :

      <Link to="/"><li className='text-red-800   text-xl  cursor-pointer'><FaHome 
      className='hover:text-white hover:bg-red-800 p-2 
      rounded-md duration-200' size={40} />Home</li></Link>

    }

    {userAdmin?<Link to="/adDash" className='text-red-800   text-xl  cursor-pointer'><FaBuilding 
    className='hover:text-white hover:bg-red-800 p-2 
    rounded-md duration-200' size={40} />Admin</Link>:<></>}
    {
      data || sData?

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