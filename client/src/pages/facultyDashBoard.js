import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Accordion } from 'flowbite-react';
import RegisterCourse from '../components/registercourse'
import AddQBank from '../components/addqbank'


const FacultyDashBoard = () => {

  let user = JSON.parse(localStorage.getItem('userData'))
  let factid
  if (user === null) {
    factid = null;
    user = null;
  }
  else {
    factid = user.Id
  }
  const [facData, setFacData] = useState(null)

  // const options = ["SQL", "DBMS", "DSA", "Logical reasoning","React","Maths","Operating system","Machine learning","Computer Networks","Verbal reasoning"]; // Replace with your options
  useEffect(() => {
    console.log("user", user)
    if (user != null) {
      if (user.TypeId == 1) {
        navigate('/studentDashboard')
      } else if (user.TypeId == 2) {
        navigate('/instituteDashboard')
      }
    }
    else
      navigate('/')
  }, [])

  const navigate = useNavigate()

  return <>
    <h1 className='text-2xl font-bold text-red-800 p-3'>Courses Registered</h1>
    <Accordion>
      {
        facData ? facData[0].map((e) => {
          const { Course_Id, Course_Name, Course_Code } = e
          return <Accordion.Panel key={Course_Id}>
            <Accordion.Title className='text-red-700'>
              {Course_Name}
            </Accordion.Title>
          </Accordion.Panel>
        }) : <></>
      }
    </Accordion>
    <RegisterCourse />
    <AddQBank />
  </>
}

export default FacultyDashBoard


