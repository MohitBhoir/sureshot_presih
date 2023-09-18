import React, { useState, useEffect } from 'react'
const qbank = require('./qbank.json');

const Test = () => {
  const testInfo = JSON.parse(localStorage.getItem('testInfo'))
  const user = JSON.parse(localStorage.getItem('userData'))
  const [questions, setQuestions] = useState(qbank.quest)
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scoredMarks, setScoredMarks] = useState(0);
  const [totalMarks, setTotalMarks] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [recentQuestions, setRecentQuestions] = useState([]);
  const [timer, setTimer] = useState(0);
  const [qCount, setQCount] = useState(1);
  let timerInterval;

  useEffect(() => {
    const questionsWithAttemptedFlag = questions.map((question) => ({
      ...question,
      isAttempted: false,
    }));
    setQuestions(questionsWithAttemptedFlag)
  }, [])

  useEffect(() => {
    // Start the timer automatically when the current question changes
    if (currentQuestion < questions.length) {
      setTimer(questions[currentQuestion].timeLimit);
      timerInterval = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer > 0) {
            return prevTimer - 1;
          } else {
            // Time's up for the current question, move to the next one automatically
            handleAnswerSelect('');
            clearInterval(timerInterval);
            return prevTimer;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval); // Cleanup the interval when component unmounts
  }, [currentQuestion]);

  const getNextQuestionIndex = (userAnswers, questions, currDiff) => {
    const t1 = 0.4; // Adjust as needed
    const t2 = 0.7; // Adjust as needed

    // Calculate the sum of product of obtained time points and marks
    const sumProductObtained = userAnswers.reduce((total, recentQ) => {
      const question = questions.find((q) => q.id === recentQ.questionId);
      if (question && question.isAttempted) {
        const maxTime = question.timeLimit;
        const timeTaken = recentQ.timeTaken;
        const onePt = maxTime / 10;
        let timePoints = 10 - Math.round(timeTaken / onePt)
        if (timePoints === 0 && question.isCorrect)
          timePoints = 1
        const marks = recentQ.marks;
        total += timePoints * marks;
      }
      return total;
    }, 0);
    console.log("sumProductObtained: ", sumProductObtained)


    // Calculate the sum of product of maximum time points and marks
    const sumProductMax = userAnswers.reduce((total, recentQ) => {
      const question = questions.find((q) => q.id === recentQ.questionId);
      if (question && question.isAttempted) {
        const maxTimePoints = 10;
        const marks = recentQ.marks;
        total += maxTimePoints * marks;
      }
      return total;
    }, 0);
    console.log("sumProductMax: ", sumProductMax)

    // Calculate avgTimePointsRatio only if sumProductMax is not 0
    const avgTimePointsRatio = (sumProductMax === 0) ? 0 : sumProductObtained / sumProductMax;
    console.log("ratio: ", avgTimePointsRatio)

    // Find the next question difficulty level based on the ratio
    let nextDifficulty;
    if (avgTimePointsRatio < t1) {
      nextDifficulty = Math.max(1, currDiff - 1); // Minimum difficulty is 1
    } else if (avgTimePointsRatio > t2) {
      nextDifficulty = Math.min(10, currDiff + 1); // Maximum difficulty is 10
    } else {
      nextDifficulty = currDiff; // Same difficulty level
    }

    // Search for unattempted questions in decreasing difficulty levels
    let foundIndex = -1;
    while (nextDifficulty >= 1) {
      const unattemptedQuestions = questions.filter((question) => {
        return !question.isAttempted && question.difficulty === nextDifficulty;
      });

      if (unattemptedQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * unattemptedQuestions.length);
        foundIndex = questions.indexOf(unattemptedQuestions[randomIndex]);
        break;
      }

      nextDifficulty = nextDifficulty - 1;
      console.log("checking for: ", nextDifficulty)
    }

    while (foundIndex != -1 && nextDifficulty <= 10) {
      const unattemptedQuestions = questions.filter((question) => {
        return !question.isAttempted && question.difficulty === nextDifficulty;
      });

      if (unattemptedQuestions.length > 0) {
        const randomIndex = Math.floor(Math.random() * unattemptedQuestions.length);
        foundIndex = questions.indexOf(unattemptedQuestions[randomIndex]);
        break;
      }

      nextDifficulty++;
      console.log("checking for: ", nextDifficulty)
    }
    return foundIndex;
  };

  const handleAnswerSelect = (selectedAnswer) => {
    setQCount(qCount + 1);
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion].isAttempted = true;
    setQuestions(updatedQuestions);

    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;
    console.log("IsCorrect: ", isCorrect)

    let tempp = scoredMarks + ((isCorrect) ? questions[currentQuestion].marks : 0);
    setScoredMarks(tempp);
    console.log("ScoredMarks: ", tempp)

    tempp = totalMarks + questions[currentQuestion].marks;
    setTotalMarks(tempp);
    console.log("TotalMarks: ", tempp)
    const temp_ans = [
      {
        questionId: questions[currentQuestion].id,
        isCorrect,
        timeTaken: isCorrect ? questions[currentQuestion].timeLimit - timer : 0,
        quesTime: questions[currentQuestion].timeLimit,
        marks: isCorrect ? questions[currentQuestion].marks : 0,
      },
      ...userAnswers
    ]
    setUserAnswers(temp_ans);

    let timee = isCorrect ? questions[currentQuestion].timeLimit - timer : 0
    if (timee == 0 && isCorrect)
      timee = 1
    const temp = [
      {
        questionId: questions[currentQuestion].id,
        isCorrect,
        timeTaken: timee,
        quesTime: questions[currentQuestion].timeLimit,
        marks: isCorrect ? questions[currentQuestion].marks : 0,
      },
      ...recentQuestions,
    ];

    if (temp.length > 3) {
      temp.pop();
    }

    setRecentQuestions(temp);

    if (currentQuestion < questions.length) {
      if (qCount < 3) {
        setCurrentQuestion(currentQuestion + 1);
        console.log("diff: ", questions[currentQuestion + 1].difficulty)
      } else {
        const next = getNextQuestionIndex(temp, questions, questions[currentQuestion].difficulty);
        console.log("next diff: ", questions[next].difficulty)
        setCurrentQuestion(next);
      }
    }
    else if (qCount >= 15) {
      clearInterval(timerInterval);
    }
    else {
      clearInterval(timerInterval);
    }
  };


  useEffect(() => {
    if (currentQuestion === questions.length - 1 && timer === 0) {
      clearInterval(timerInterval);
    } else if (qCount >= 15 || currentQuestion === questions.length) {
      // All questions are answered, stop the timer


      //post data
      // /testlog
      // {
      //   studentid,
      //   courseid,
      //   marksscored,
      //   totalmarks,
      //   avgdiff
      // }


      clearInterval(timerInterval);
    }
  }, [currentQuestion, timer, userAnswers]);

  return <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Test</h1>
      {(qCount < 15 && currentQuestion < questions.length) ? (
        <div>
          <p>Question {qCount}:</p>
          <p>{questions[currentQuestion].question}</p>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleAnswerSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
          <p className="mt-4">Time left: {timer} seconds</p>
        </div>
      ) : (
        <p>
          You Scored {scoredMarks} out of {totalMarks}
        </p>
      )}
    </div>
  </>
}

export default Test