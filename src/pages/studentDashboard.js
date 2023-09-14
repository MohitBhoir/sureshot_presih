import React from 'react'
import Courses from './courses'

const StudentDash = () => {
  return <>
      <section>
            <h1 className='font-bold text-3xl text-red-700 text-center my-5'>Courses registered</h1>
            <div className='text-center text-2xl text-yellow-600 my-3'>
                 <h3>DBMS</h3>
                 <h3>Maths</h3>
                 <h3>Aptitude</h3>
            </div>
            <Courses/>
      </section>
  </>
}

export default StudentDash