import { Timeline } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify'
import { HiCalendar } from 'react-icons/hi';

// const dummy=[
//      {
//         title:'DBMS',
//         desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
//         date:'20 march 2023'
//      },
//      {
//         title:'Maths',
//         desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
//         date:'22 feb 2023'
//      },
//      {
//         title:'Apptitude',
//         desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
//         date:'05 may 2022'
//      }
// ]

const TimeLine = () => {
  const [dummy, setDummy] = useState([]);
  let user = JSON.parse(localStorage.getItem('userData'))
  let factid
  if (user === null) {
    factid = null;
    user = null;
  }
  else {
    factid = user.Id
  }
  const fetchLog = async () => {
    try {
      const res = await fetch('/api/testlog/'+factid.toString(), {
        method: "GET",
        headers: {
          "Authorization": "",
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        setDummy(data[0])
      }
    } catch (error) {
      toast.error("sorry,some unexpected error occured!")
      console.log(error)
    }
  }

  useEffect(() => {
    fetchLog();
  }, [])

  return (
    < Timeline >
      {
        dummy.toReversed().map((e) => {
          // console.log(e)
          return <Timeline.Item key={e.MarksScored}>
            <Timeline.Point icon={HiCalendar} />
            <Timeline.Content>
              <Timeline.Time>
                {e.Date}
              </Timeline.Time>
              <Timeline.Title>
                Course/Topic
              </Timeline.Title>
              <Timeline.Body>
                <p>
                  desc:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus commodi obcaecati facilis velit similique dolores, ipsam soluta eveniet, corporis necessitatibus illo at, iusto eum nobis porro tempore aliquam reprehenderit architecto veniam itaque. Enim, beatae sint assumenda culpa ratione delectus sed.',
                </p>
                <p>
                  Marks Scored:{e.MarksScored}
                  <br />
                  Out Of: {e.TotalMarks}
                </p>
                <p>
                  Percentage: {e.Percentage}
                </p>
                <p>
                  Average Difficulty: {e.AvgDiff}
                </p>
                <p>
                  Percentage: {e.Percentage}
                </p>
              </Timeline.Body>
            </Timeline.Content>
          </Timeline.Item>
        })
      }
    </Timeline >
  )
}

export default TimeLine

