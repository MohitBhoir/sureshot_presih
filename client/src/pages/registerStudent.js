import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const RegisterStudent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contact: '',
    password: '',
    password2: '',
  })
  const navigate = useNavigate()

  const { name, email, contact, password, password2 } = formData

  const loginUser = async (email, password) => {
    const res = await fetch('/api/login/', {
      method: "POST",
      headers: {
        "Authorization": "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EmailId: email, Password: password, TypeId: 1 })
    })

    const data = await res.json()
    if (res.ok) {
      toast.success("login successfully")
      localStorage.setItem('userData', JSON.stringify(data[0][0]))
      window.location.reload()
      navigate("/")
      setTimeout(() => {
        window.stop()
      }, 100)
    } else {
      if (data.msg === "invalid credentials") {
        toast.error("invalid credentials!")
      } else {
        toast.error("sorry,some unexpected error occured!")
      }
      navigate("/")
    }
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (contact.length > 10) {
      toast.error('invalid contact number')
    } else if (password !== password2) {
      toast.error('password does not match')
    } else {
      const res = await fetch("/api/student", {
        method: "POST",
        headers: {
          "Authorization": "",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ Name: name, EmailId: email, Password: password, MobileNo: contact })
      })
      const data = await res.json()
      if (res.ok) {
        toast.success("register successfully")
        // navigate("/")
        loginUser(email, password)
      } else {
        if (data.msg === "user already exist") {
          toast.error("user already exist!")
        } else {
          toast.error("sorry,some unexpected error occured!")
        }
      }
    }
  }




  return <>
    <div className='flex gap-5 justify-center items-center'>
      <p>don't have an account?</p>
      <h1 className='font-extrabold text-3xl text-red-700 '>Register</h1>
    </div>
    <form className='shadow-2xl rounded-md  m-8 p-4  
bg-gradient-to-t from-gray-200 to-red-500' onSubmit={handleSubmit}>
      <div className='flex gap-6 justify-evenly my-2'>
        <h2 className='text-red-700 font-bold text-2xl'>student</h2>
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="text" id="name" name="name" value={name} placeholder="Enter your name"
          className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="email" id="email" name="email" value={email} placeholder="Enter your email" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="text" id="contact" name="contact" value={contact} placeholder="Enter your contact" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="password" id="password" name="password" value={password} placeholder="Enter password" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="password" id="password2" name="password2" value={password2} placeholder="confirm password" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex justify-center items-center'>
        <button type="submit" className='p-2 text-white bg-red-700
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
      </div>
    </form>
  </>
}

export default RegisterStudent