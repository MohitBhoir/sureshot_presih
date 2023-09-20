import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  LineChart,
  ResponsiveContainer,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';

const Graph = () => {
  let user = JSON.parse(localStorage.getItem('userData'))
  let factid
  if (user === null) {
    factid = null;
    user = null;
  }
  else {
    factid = user.Id
  }

  let pd = [
    {
      "Test_Id": 3,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 46.15384615384615,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 4,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 46.15384615384615,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 5,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 50,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 76.92307692307692,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 6,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 50,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 76.92307692307692,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 7,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 46.15384615384615,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 8,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 46.15384615384615,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 9,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 35,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 53.84615384615385,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 10,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 35,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 53.84615384615385,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 11,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 35,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 53.84615384615385,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 12,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 35,
      "TotalMarks": 65,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 53.84615384615385,
      "AvgDiff": 4.2
    },
    {
      "Test_Id": 13,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 90,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 33.333333333333336,
      "AvgDiff": 5.6
    },
    {
      "Test_Id": 14,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 30,
      "TotalMarks": 90,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 33.333333333333336,
      "AvgDiff": 5.6
    },
    {
      "Test_Id": 15,
      "Student_Id": 5,
      "Course_Id": 1,
      "MarksScored": 125,
      "TotalMarks": 440,
      "Date": "2023-09-19T00:00:00.000Z",
      "Percentage": 28.40909090909091,
      "AvgDiff": 7.266666666666667
    }
  ]

  const [pdata, setpdata] = useState(pd)

  const fetchLog = async () => {
    try {
      const res = await fetch('/api/testlog/' + factid.toString(), {
        method: "GET",
        headers: {
          "Authorization": "",
          "Content-Type": "application/json"
        }
      })
      const data = await res.json()
      if (res.ok) {
        setpdata(data[0])
      }
    } catch (error) {
      toast.error("sorry,some unexpected error occured!")
      console.log(error)
    }
  }

  useEffect(() => {
    // fetchLog();
  }, [])

  pdata.map((f) => {
    f["Date"] = (parseInt(f.Date.slice(8, 10))).toString() + "/" + (parseInt(f.Date.slice(5, 7))).toString();
  })
  console.log(pdata)
  return (
    <div className='graph-head'>
      <h1 className="text-heading">
        Performance Graph
      </h1>
      <div>
        <ResponsiveContainer width="50%" aspect={3}>
          <LineChart data={pdata} width={50} height={30}>
            <Line type="monotone" dataKey="AvgDiff" stroke="#8884d8" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Percentage" stroke="#82ca9d" activeDot={{ r: 8 }} />
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="Date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

      </div>

    </div>
  );
}

export default Graph
