import React,{useEffect, useState} from 'react'
import { Accordion } from 'flowbite-react';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// const dummy=[
//      {
//         id:1,
//         title:'DBMS',
//         desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.'
//      },
//      {
//         id:2,
//         title:'Maths',
//         desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.'
//      }
// ]
const InstituteDashBoard = () => {
  const [showModal,setShowModal]=useState(false)
  const [data,setData]=useState(null)
  const [formData,setFormData]=useState({
    title:'',
    description:'',
  })
const {title,description}=formData

  const handleChange=(e)=>{
    setFormData((prevState)=>({
       ...prevState,
       [e.target.name]:e.target.value,
    }))
  }
 
  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch('/api/course',{
            method:"POST",
            headers:{
                "Authorization":"",
                "Content-Type":"application/json"
            },
            body:JSON.stringify({Course_Name:title,Course_Code:description})
          })
          const data=await res.json()
          if(res.ok){
              toast.success("Course added successfully")
              navigate("/instituteDashboard")
          }else{
              toast.error('user not authorized')
            //   navigate('/adDash')
          }
       }catch(error){
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
            // navigate("/adDash")
       }
  }

  const fetchCourses=async()=>{
       try{
            const res=await fetch('/api/courses',{
            method:"GET",
            headers:{
                "Authorization":"",
                "Content-Type":"application/json"
            }
          })
          const data=await res.json()
          if(res.ok){
              setData(data)
          }
       }catch(error){
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
       }
  }
  useEffect(()=>{
       fetchCourses()
  },[])

  return <>
     <h1 className='text-2xl font-bold text-red-800 p-3'>All Courses</h1>
     <Accordion>
      {
          data?data[0].map((e)=>{
             const {Course_Id,Course_Name,Course_Code}=e
              return <Accordion.Panel key={Course_Id}>
        <Accordion.Title className='text-red-700'>
           {Course_Name}
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <p>
              {Course_Code}
            </p>
          </p>
        </Accordion.Content>
      </Accordion.Panel>
          }):<></>
      }
    </Accordion>
     <button
        className="bg-yellow-500 text-white active:bg-blue-600 
        font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 mt-5 ml-3"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Add course
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <h1 className='font-bold text-2xl text-center text-red-700 mt-5'>Add course</h1>
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className='shadow-2xl rounded-md  m-8 p-4' onSubmit={handleSubmit}>
                    <div className='flex gap-6 justify-evenly my-2'>
                    <input type="title" id="title" name="title" value={title} placeholder="Enter title" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex gap-6 justify-evenly my-2'>
                    <input type="description" id="description" name="description" value={description} placeholder="Enter description" className='p-4 border-black border-2 rounded-md' onChange={handleChange}/>
                    </div>
                    <div className='flex justify-center items-center'>
                    <button type="submit" className='p-2 text-white bg-emerald-600 
                    hover:text-black hover:bg-slate-400
                    duration-100 rounded-md hover:p-3'>Submit</button>
                    </div>
                </form>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
</>
}

export default InstituteDashBoard


