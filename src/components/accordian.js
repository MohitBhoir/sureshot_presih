import { Accordion } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';

const dummy=[
     {
        id:1,
        title:'DBMS',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.'
     },
     {
        id:2,
        title:'Maths',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.'
     },
     {
        id:3,
        title:'Apptitude',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.'
     }
]

const Accordian=()=>{
  const navigate=useNavigate()
  const handleClick=(id,title)=>{
       localStorage.setItem('testInfo',JSON.stringify({id:id,title:title}))
       navigate("/testWindow")
  }
  return (
    <Accordion>
      {
          dummy.map((e)=>{
             const {title,desc,id}=e
              return <Accordion.Panel key={id}>
        <Accordion.Title className='text-red-700'>
           {title}
        </Accordion.Title>
        <Accordion.Content>
          <p className="mb-2 text-gray-600 dark:text-gray-400">
            <p>
              {desc}
            </p>
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            <button
              className="bg-yellow-500 text-white p-2 rounded-md"
              onClick={()=>handleClick(id,title)}
            >Give test
            </button>
          </p>
        </Accordion.Content>
      </Accordion.Panel>
          })
      }
    </Accordion>
  )
}




export default Accordian