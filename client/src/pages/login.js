import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const LoginUser = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userData'))
    console.log(user)
    if (user) {
      if (user.TypeId == 1) {
        navigate('/studentDashboard')
      } else if (user.TypeId == 3) {
        navigate('/facultyDashboard')
      } else if (user.TypeId == 2) {
        navigate('/instituteDashboard')
      }
    }
  }, [])

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    type: 'Institute'
  })
  const { email, password, type } = formData

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // console.log(formData)
    let finalType = 0
    if (formData.type == 'Student') {
      finalType = 1
    } else if (formData.type == 'Institute') {
      finalType = 2
    } else if (formData.type == 'Faculty') {
      finalType = 3
    }
    const res = await fetch('/api/login/', {
      method: "POST",
      headers: {
        "Authorization": "",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ EmailId: email, Password: password, TypeId: finalType })
    })

    console.log({ email: email, password: password, type: finalType })

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

  // localStorage.setItem('userData', JSON.stringify(formData))
  // if (formData.type == 'Student') {
  //   navigate('/studentDashboard')
  // } else if (formData.type == 'Faculty') {
  //   navigate('/facultyDashboard')
  // } else if (formData.type == 'Institute') {
  //   navigate('/instituteDashboard')
  // }


  return <>
    <div className='flex gap-5 justify-center items-center my-2'>
      <h1 className='font-extrabold text-3xl text-red-700 '>Login User</h1>
    </div><form className='shadow-2xl rounded-md  m-8 p-4 bg-gradient-to-t from-gray-200 to-red-500' onSubmit={handleSubmit}>
      <div className='flex gap-6 justify-evenly my-2'>
        <select id="type" name="type" value={type} onChange={handleChange}>
          <option value="Institute">Institute</option>
          <option value="Faculty">Faculty</option>
          <option value="Student">Student</option>
        </select>
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="email" id="email" name="email" value={email} placeholder="Enter your email" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex gap-6 justify-evenly my-2'>
        <input type="password" id="password" name="password" value={password} placeholder="Enter password" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
      </div>
      <div className='flex justify-center items-center'>
        <button type="submit" className='p-2 text-white bg-red-700 
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
      </div>
    </form>
  </>
}

export default LoginUser