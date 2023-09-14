import React,{useState} from 'react'
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom'


const Courses = () => {
  const [showModal,setShowModal]=useState(false)
  const [selectedOption, setSelectedOption] = useState('');
  const [str,setStr]=useState('')

  const options = ["SQL", "DBMS", "DSA", "Logical reasoning"]; // Replace with your options

  const handleOptionChange = (e) => {
        setSelectedOption(e.target.value)
        setStr(str+e.target.value)
  };

  const navigate=useNavigate()

  const handleSubmit=async(e)=>{
        e.preventDefault();
        console.log(str);
    //     try{
    //         const res=await fetch('/api/events',{
    //         method:"POST",
    //         headers:{
    //             "Authorization":`Bearer ${userAdmin.token}`,
    //             "Content-Type":"application/json"
    //         },
    //         body:JSON.stringify({title:title,description:description,link:link,name:name,date:date})
    //       })
    //       const data=await res.json()
    //       if(res.ok){
    //           toast.success("event added successfully")
    //           localStorage.removeItem('e')
    //           navigate("/feed")
    //       }else{
    //           toast.error('user not authorized')
    //           navigate('/adDash')
    //       }
    //    }catch(error){
    //         toast.error("sorry,some unexpected error occured!")
    //         console.log(error)
    //         navigate("/adDash")
    //    }
  }


  return <>
     <button
        className="bg-yellow-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Register for courses
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
                <h1 className='font-bold text-2xl text-center text-red-700 mt-5'>Select courses</h1>
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
                  <form className='m-8 p-4' onSubmit={handleSubmit}>
                    <div className='flex gap-6 justify-evenly'>
                        {options.map((option,index) => (
                        <label key={option}>
                          <input
                            type="radio"
                            value={index}
                            checked={selectedOption === index.toString()}
                            onChange={handleOptionChange}
                            className='cursor-pointer'
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                    <div className='flex justify-center items-center'>
                    <button type="submit" className='p-2 text-white bg-yellow-600 
                    hover:text-black hover:bg-emerald-400
                    duration-100 rounded-md hover:p-3 mt-7'>Submit</button>
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

export default Courses


