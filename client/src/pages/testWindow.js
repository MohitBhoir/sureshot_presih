import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card } from 'flowbite-react';

const TestWindow = () => {
  const testInfo=JSON.parse(localStorage.getItem('testInfo'))
  const user=JSON.parse(localStorage.getItem('userData'))

  const navigate=useNavigate()

  const handleClick=()=>{
        navigate('/test')
  }
  return <>
      <Card className="max-w-sm m-4">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>
           {testInfo.title}
        </p>
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        <p>
           duration: 60 min
        </p>
      </p>
      <Button className='bg-yellow-500 w-max hover:bg-red-500' 
      onClick={handleClick}>
          start Test
      </Button>
    </Card>
  </>
}

export default TestWindow