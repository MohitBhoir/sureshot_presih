import React from 'react'
import Courses from './courses'
import Accordian from '../components/accordian'
import TimeLine from '../components/timeline'


const StudentDash = () => {
  return <>
      <section className='p-3'>
            <h1 className='font-bold text-3xl text-red-800 text-center my-5'>Courses registered</h1>
             <Accordian/>
      </section>
      <div className='flex  justify-center'><Courses/></div>
      <h1 className='my-10 font-bold text-red-800 text-3xl p-4'>History</h1>
      <div className='flex justify-center mt-10 p-4'>
         <TimeLine/>
      </div>
  </>
}

export default StudentDash