import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const AddQBank = () => {
    let user = JSON.parse(localStorage.getItem('userData'))
    let factid
    if (user === null) {
        factid = null;
        user = null;
    }
    else {
        factid = user.Id
    }

    const [formData, setFormData] = useState({
        Question: '',
        Marks: 0,
        Difficulty: 0,
        Course_Id: 0,
        Answer: '',
        isCorrect: '',
        Answer2: '',
        isCorrect2: '',
        Answer3: '',
        isCorrect3: '',
        Answer4: '',
        isCorrect4: '',
        TimeLimit: 0
    })
    const navigate = useNavigate()

    const {
        Question,
        Marks, Difficulty,
        Course_Id, Answer,
        isCorrect, Answer2,
        isCorrect2, Answer3,
        isCorrect3, Answer4,
        isCorrect4, TimeLimit
    } = formData

    const handleChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(
            {
                Question,
                Marks, Difficulty,
                Course_Id, Answer,
                isCorrect, Answer2,
                isCorrect2, Answer3,
                isCorrect3, Answer4,
                isCorrect4, TimeLimit
            }
        )
        const res = await fetch("/api/question", {
            method: "POST",
            headers: {
                "Authorization": "",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Question,
                Marks, Difficulty,
                Course_Id, Answer,
                isCorrect, Answer2,
                isCorrect2, Answer3,
                isCorrect3, Answer4,
                isCorrect4, TimeLimit
            })
        })
        const data = await res.json()
        if (res.ok) {
            toast.success("register successfully")
        } else {
            if (data.msg === "user already exist") {
                toast.error("user already exist!")
            } else {
                toast.error("sorry,some unexpected error occured!")
            }
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
                Add Question Bank
            </button>
            {
                showModal ? (
                    <>
                        <div className='flex gap-5 justify-center items-center'>
                        </div>
                        <form className='shadow-2xl rounded-md  m-8 p-4  
bg-gradient-to-t from-gray-200 to-red-500' onSubmit={handleSubmit}>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <h2 className='text-red-700 font-bold text-2xl'>Add Questions</h2>
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="Question" name="Question" value={Question} placeholder="Enter the Question"
                                    className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="number" id="Marks" name="Marks" value={Marks} placeholder="Enter Marks for the question" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="number" id="Difficulty" name="Difficulty" value={Difficulty} placeholder="Enter difficulty" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="number" id="Course_Id" name="Course_Id" value={Course_Id} placeholder="Enter Course Id" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="Answer" name="Answer" value={Answer} placeholder="Enter Option 1" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="isCorrect" name="isCorrect" value={isCorrect} placeholder="Enter true or false" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="Answer2" name="Answer2" value={Answer2} placeholder="Enter Option 2" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="isCorrect2" name="isCorrect2" value={isCorrect2} placeholder="Enter true or false" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="Answer3" name="Answer3" value={Answer3} placeholder="Enter Option 3" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="isCorrect3" name="isCorrect3" value={isCorrect3} placeholder="Enter true or false" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="Answer4" name="Answer4" value={Answer4} placeholder="Enter Option 4" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="text" id="isCorrect4" name="isCorrect4" value={isCorrect4} placeholder="Enter true or false" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex gap-6 justify-evenly my-2'>
                                <input type="number" id="TimeLimit" name="TimeLimit" value={TimeLimit} placeholder="Enter TimeLimit" className='p-4 border-black border-2 rounded-md' onChange={handleChange} />
                            </div>
                            <div className='flex justify-center items-center'>
                                <button type="submit" className='p-2 text-white bg-red-700
           hover:text-black hover:bg-slate-400
          duration-100 rounded-md hover:p-3'>Submit</button>
                            </div>
                        </form>
                    </>
                ) : null
            }
        </>)
}

export default AddQBank;