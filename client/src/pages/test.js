import React,{useState,useEffect} from 'react'


const questions = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
    difficulty: 1,
    timeLimit: 20, // 1 minute
    marks: 3,
  },
  {
    id: 2,
    question: 'What is the capital of France?',
    options: ['London', 'Madrid', 'Berlin', 'Paris'],
    correctAnswer: 'Paris',
    difficulty: 2,
    timeLimit: 30, // 1.5 minutes
    marks: 5,
  },
  {
    id: 3,
    question: 'What is the largest planet in our solar system?',
    options: ['Earth', 'Jupiter', 'Mars', 'Venus'],
    correctAnswer: 'Jupiter',
    difficulty: 3,
    timeLimit: 40, // 2 minutes
    marks: 7,
  },
  // Add more questions here
];


const Test = () => {
  const testInfo=JSON.parse(localStorage.getItem('testInfo'))
  const user=JSON.parse(localStorage.getItem('userData'))

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(0); // Initialize timer to 0 seconds
  let timerInterval; // Declare the timerInterval variable

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

  const handleAnswerSelect = (selectedAnswer) => {
    // Check if the selected answer is correct
    const isCorrect = questions[currentQuestion].correctAnswer === selectedAnswer;

    // Store the user's answer, correctness, time taken, and marks
    setUserAnswers([
      ...userAnswers,
      {
        questionId: questions[currentQuestion].id,
        isCorrect,
        timeTaken: questions[currentQuestion].timeLimit - timer,
        marks: isCorrect ? questions[currentQuestion].marks : 0,
        difficulty:questions[currentQuestion].difficulty,
        totalTime:questions[currentQuestion].timeLimit
      },
    ]);

    // Move to the next question
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // All questions are answered, stop the test and print results
      clearInterval(timerInterval);
      console.log('Test Completed!');
    }
  };

  useEffect(() => {
    // Check if all questions are answered or if timer for the last question exhausts
    if (currentQuestion === questions.length - 1 && timer === 0) {
      clearInterval(timerInterval);
      console.log('Test Completed!');
      console.log(userAnswers);
    } else if (currentQuestion === questions.length) {
      // All questions are answered, stop the timer
      clearInterval(timerInterval);
    }
  }, [currentQuestion, timer, userAnswers]);
  return <>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Online Test</h1>
      {currentQuestion < questions.length ? (
        <div>
          <p>Question {currentQuestion + 1}:</p>
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
            Test Completed!
            {
                console.log(userAnswers)
            }
        </p>
      )}
    </div>
 </>
}

export default Test



