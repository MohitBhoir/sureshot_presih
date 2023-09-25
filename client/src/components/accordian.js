import { Accordion } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'


const Accordian = () => {

  let user = JSON.parse(localStorage.getItem('userData'))
  let factid
  if (user === null) {
    factid = null;
    user = null;
  }
  else {
    factid = user.Id
  }

  const [courseData, setCourseData] = useState(null)
  const navigate = useNavigate()
  const handleClick = (id, title) => {
    localStorage.setItem('testInfo', JSON.stringify({ id: id, title: title }))
    navigate("/testWindow")
  }
  const fetchStudentCourses = async () => {
    try {
      const res = await fetch('/api/student/' + factid.toString() + '/course', {
        method: "GET",
        headers: {
          "Authorization": "",
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        setCourseData(data)
      }
    } catch (error) {
      toast.error("sorry,some unexpected error occured!")
      console.log(error)
    }
  }
  useEffect(() => {
    fetchStudentCourses()
  }, [])
  return (
    <Accordion>
      {
        courseData ? courseData[0].map((e) => {
          const { Course_Name, Course_Id, Course_Code } = e
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
              <p className="text-gray-600 dark:text-gray-400">
                <button
                  className="bg-yellow-500 text-white p-2 rounded-md"
                  onClick={() => handleClick(Course_Id, Course_Name)}
                >Give test
                </button>
              </p>
            </Accordion.Content>
          </Accordion.Panel>
        })
          : <></>}
    </Accordion>
  )
}




export default Accordian