import { Button, Timeline } from 'flowbite-react';
import {HiCalendar } from 'react-icons/hi';

const dummy=[
     {
        title:'DBMS',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
        date:'20 march 2023'
     },
     {
        title:'Maths',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
        date:'22 feb 2023'
     },
     {
        title:'Apptitude',
        desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
        date:'05 may 2022'
     }
]

const TimeLine=()=>{
  return (
    <Timeline>
        {
             dummy.map((e)=>{
                  const {title,desc,date}=e
                  return <Timeline.Item key={title}>
                            <Timeline.Point icon={HiCalendar}/>
                            <Timeline.Content>
                            <Timeline.Time>
                                {date}
                            </Timeline.Time>
                            <Timeline.Title>
                                {title}
                            </Timeline.Title>
                            <Timeline.Body>
                                <p>
                                  {desc}
                                </p>
                            </Timeline.Body>
                            </Timeline.Content>
                        </Timeline.Item>
             })
        }
    </Timeline>
  )
}

export default TimeLine

