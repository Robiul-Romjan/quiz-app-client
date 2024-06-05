import { useContext, useEffect, useState } from "react";
import QuizCard from "../shared/QuizCard";
import { AuthContext } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaClockRotateLeft } from "react-icons/fa6";
import Loader from "../shared/Loader";

const QuizPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [quizEnded, setQuizEnded] = useState(false);
  const [userSelections, setUserSelections] = useState([]);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/all-questions")
      .then((res) => res.json())
      .then((data) => setQuizzes(data))
      .catch((error) =>
        setError(`Something Went Wrong, ${error.message}. Try again latter`)
      )
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let interval;
    if (quizzes.length > 0 && !quizEnded) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            if (currentQuizIndex < quizzes.length - 1) {
              setCurrentQuizIndex((prevIndex) => prevIndex + 1);
              return 10;
            } else {
              setQuizEnded(true);
              clearInterval(interval);
              return 0;
            }
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizzes, quizEnded, currentQuizIndex]);

  const handleNextQuestion = () => {
    setSeconds(10);
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizEnded(true);
      saveResults();
      Swal.fire({
        title: "Quiz Completed!",
        text: "Thank you for participating.",
        icon: "success",
        confirmButtonText: "Show Results",
      });
      navigate("/dashboard/quiz-results");
    }
  };

  const handleScoreUpdate = (isCorrect, selectedOption) => {
    setUserSelections((prevSelections) => [
      ...prevSelections,
      {
        question: quizzes[currentQuizIndex].question,
        correctAnswer: quizzes[currentQuizIndex].answer,
        selectedAnswer: selectedOption,
        isCorrect: isCorrect,
      },
    ]);
    if (isCorrect) {
      setScore((prevScore) => prevScore + 5);
    }

    handleNextQuestion();
  };

  const saveResults = () => {
    const results = {
      email: user?.email,
      score,
      userSelections: userSelections,
      date: new Date().toISOString(),
    };

    fetch("http://localhost:5000/add-results", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(results),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Results saved successfully:", data);
      })
      .catch((error) => {
        console.error("Error saving results:", error);
      });
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <>
      {error ? (
        <div className="w-full h-[90vh] flex items-center justify-center text-red-500 text-2xl">
          {error}
        </div>
      ) : (
        <section className="md:w-9/12 w-[90%] md:flex-row flex-col mx-auto min-h-screen">
          {quizzes.length > 0 && (
            <>
              <div className="w-9/12 mx-auto mt-20 flex md:flex-row flex-col justify-between items-center">
                <div className="text-sm font-normal text-gray-600">
                  <span className="text-red-700">Attention!</span> You have 100
                  seconds to answer 10 questions.
                  <br />
                  Please keep an eye on the timer and make sure to answer all
                  questions before time runs out.
                </div>
                {/* Timer part Start */}
                <div className="flex items-center">
                  <p className="mr-2 text-xl text-gray-700">
                    <FaClockRotateLeft />
                  </p>
                  <div className="text-left">
                    <h1 className="text-red-600 text-xl text-center font-bold">
                      {seconds}
                      <sub className="text-xs ml-1">sec</sub>
                    </h1>
                    <p className="text-xs -mt-1 text-gray-700">Time Consumed</p>
                  </div>
                </div>
                {/* Timer part end */}
              </div>

              <QuizCard
                quiz={quizzes[currentQuizIndex]}
                index={currentQuizIndex + 1}
                handleScoreUpdate={handleScoreUpdate}
              />
            </>
          )}
        </section>
      )}
    </>
  );
};

export default QuizPage;
