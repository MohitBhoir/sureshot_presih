import admin from '../animation/admin.json'
import Lottie from 'lottie-react'
import student from '../animation/student.json'
import teacher from '../animation/teacher.json'
import {useNavigate} from 'react-router-dom'

const Register = () => {
  const navigate=useNavigate()
  return <>
       <h1 className='text-center font-bold text-blue-900 text-3xl font-sans mt-3'>who are you?</h1>
         <div className='flex justify-around'>
            <div>
            <Lottie animationData={admin} className='w-[500px] h-[500px]'/>
            <button onClick={()=>{
                navigate('/registerInstitute')
          }} className='text-3xl text-emerald-600 font-bold ml-[20%] hover:text-white hover:bg-emerald-600 p-2 rounded-sm'>Institute</button>
        </div>
        <div>
            <Lottie animationData={teacher} className='w-[500px] h-[500px]'/>
            <button onClick={()=>{
                navigate('/registerFaculty')
            }} className='text-3xl text-amber-800 font-bold ml-[20%] hover:text-white hover:bg-amber-800 p-2 rounded-sm'>Faculty</button>
        </div>
        <div>
            <Lottie animationData={student} className='w-[500px] h-[500px]'/>
            <button onClick={()=>{
                navigate('/registerStudent')
            }} className='text-3xl text-blue-700
            font-bold ml-[20%] hover:text-white hover:bg-blue-700 p-2 rounded-sm'>
              student</button>
        </div>
         </div>
  </>
}

export default Register