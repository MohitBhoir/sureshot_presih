import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

const RegisterCourse = () => {
    let user = JSON.parse(localStorage.getItem('userData'))
    let factid
    if (user === null) {
        factid = null;
        user = null;
    }
    else {
        factid = user.Id
    }

    const [showModal, setShowModal] = useState(false)
    const [selectedOption, setSelectedOption] = useState([])
    const [data, setData] = useState(null)
    const [facData, setFacData] = useState(null)
    const [courseData, setCourseData] = useState(null)
    const [str, setStr] = useState('')

    useEffect(() => {
        fetchCourses()
        fetchFacultyCourses();
    }, [])

    const fetchCourses = async () => {
        try {
            const res = await fetch('/api/courses', {
                method: "GET",
                headers: {
                    "Authorization": "",
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            if (res.ok) {
                setData(data)
                console.log(data)
            }
        } catch (error) {
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
        }
    }

    const fetchFacultyCourses = async () => {
        console.log('/api/faculty/' + factid.toString() + '/course')
        try {
            const res = await fetch('/api/faculty/' + factid.toString() + '/course', {
                method: "GET",
                headers: {
                    "Authorization": "",
                    "Content-Type": "application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            if (res.ok) {
                setFacData(data)
                console.log(facData)
            }
        } catch (error) {
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
        }
    }

    const handleOptionChange = (e) => {
        selectedOption.push(e.target.value);
        setStr(str + e.target.value + ",")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/faculty/course', {
                method: "POST",
                headers: {
                    "Authorization": ``,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ Fac_Id: factid, CourseIdsString: str.slice(0, str.length - 1) })
            })
            console.log(str.slice(0, str.length - 1))
            const data = await res.json()
            if (res.ok) {
                toast.success("Course registered successfully")
                fetchFacultyCourses()
            } else {
                toast.error('user not authorized')
            }
        } catch (error) {
            toast.error("sorry,some unexpected error occured!")
            console.log(error)
        }
    }

    return (
        <>
            <button
                className="bg-yellow-500 text-white active:bg-blue-600 
        font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none  ease-linear transition-all duration-150 mt-5"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Register for courses
            </button>
            {
                showModal ? (
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
                                            <div className='grid grid-cols-3 gap-3'>
                                                {data ? data[0].map((option, index) => (
                                                    <label key={option.Course_Id}>
                                                        <input
                                                            type="radio"
                                                            value={option.Course_Id}
                                                            checked={selectedOption.includes(option.Course_Id.toString())}
                                                            onChange={handleOptionChange}
                                                            className='cursor-pointer'
                                                        />
                                                        {option.Course_Name}
                                                    </label>
                                                )) : <></>}
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
                ) : null
            }
        </>)
}

export default RegisterCourse