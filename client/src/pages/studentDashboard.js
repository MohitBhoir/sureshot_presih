import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Courses from './courses'
import Accordian from '../components/accordian'
import TimeLine from '../components/timeline'
import Graph from '../components/graph'


const StudentDash = () => {
  const navigate = useNavigate();


  let user = JSON.parse(localStorage.getItem('userData'))
  let factid
  if (user === null) {
    factid = null;
    user = null;
  }
  else {
    factid = user.Id
  }

  useEffect(() => {
    if (user !== null) {
      if (user.TypeId == 3) {
        navigate('/facultyDashboard')
      } else if (user.TypeId == 2) {
        navigate('/instituteDashboard')
      }
    }
    else {
      navigate('/')
    }
  }, [])

  return <>
    <section className='p-3'>
      <h1 className='font-bold text-3xl text-red-800 text-center my-5'>Courses registered</h1>
      <Accordian />
    </section>
    <section className='p-3'>
    </section>
    <div className='flex  justify-center'><Courses /></div>
    <h1 className='my-10 font-bold text-red-800 text-3xl p-4'>History</h1>
    <Graph />
    <div className='flex justify-center mt-10 p-4'>
      <TimeLine />
    </div>
  </>
}

export default StudentDash