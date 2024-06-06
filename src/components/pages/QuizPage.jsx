import { useContext, useEffect, useState, useCallback } from "react";
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
  const [selectedOption, setSelectedOption] = useState(null);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/all-questions?num=5")
      .then((res) => res.json())
      .then((data) => {
        setQuizzes(data);
        setError(""); // Clear any previous errors
      })
      .catch((error) =>
        setError(`Something Went Wrong, ${error.message}. Try again later`)
      )
      .finally(() => setLoading(false));
  }, []);

  const handleScoreUpdate = useCallback(
    (isCorrect, selectedOption) => {
      const updatedSelections = [
        ...userSelections,
        {
          question: quizzes[currentQuizIndex]?.question,
          correctAnswer: quizzes[currentQuizIndex]?.answer,
          selectedAnswer: selectedOption,
          isCorrect: isCorrect,
        },
      ];

      setUserSelections(updatedSelections);

      if (isCorrect) {
        setScore((prevScore) => prevScore + 5);
      }
    },
    [quizzes, currentQuizIndex, userSelections]
  );

  const handleNextQuestion = useCallback(() => {
    if (selectedOption === null) {
      handleScoreUpdate(false, "You did not select any option");
    } else {
      handleScoreUpdate(
        selectedOption === quizzes[currentQuizIndex]?.answer,
        selectedOption
      );
    }

    setSeconds(10);
    setSelectedOption(null);
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex((prevIndex) => prevIndex + 1);
    } else {
      setQuizEnded(true);
    }
  }, [currentQuizIndex, quizzes, selectedOption, handleScoreUpdate]);

  const saveResults = useCallback(
    (selections) => {
      const results = {
        email: user?.email,
        score,
        userSelections: selections,
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
          if (data.insertedId) {
            Swal.fire({
              title: "Quiz Completed!",
              text: "Thank you for participating.",
              icon: "success",
              confirmButtonText: "Show Results",
            });
            navigate("/dashboard/quiz-results");
          }
        })
        .catch((error) => {
          console.error("Error saving results:", error);
        });
    },
    [navigate, score, user?.email]
  );

  useEffect(() => {
    if (userSelections.length > 0 && userSelections.length === quizzes.length) {
      saveResults(userSelections);
    }
  }, [userSelections, quizzes.length, saveResults]);

  useEffect(() => {
    let interval;
    if (quizzes.length > 0 && !quizEnded) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 1) {
            handleNextQuestion();
            return 10;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizzes.length, quizEnded, currentQuizIndex, handleNextQuestion]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
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
        <div className="w-full flex items-center justify-center text-red-500 text-2xl">
          {error}
        </div>
      ) : (
        <section className="md:w-9/12 mt-6 md:mt-0 w-[90%] min-h-[80vh] mx-auto flex justify-center items-center">
          <div className="w-full">
            {quizzes.length > 0 && (
              <>
                <div className="w-9/12 mx-auto flex md:flex-row flex-col justify-between items-center">
                  <div className="text-[18px] font-normal text-gray-700">
                    <span className="text-red-700 font-bold">Attention!</span>{" "}
                    You have 100 seconds to answer 10 questions.
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
                        <sub className="text-lg ml-1">sec</sub>
                      </h1>
                      <p className="text-[16px] -mt-1 text-gray-700">
                        Time Remaining
                      </p>
                    </div>
                  </div>
                  {/* Timer part end */}
                </div>

                <div className="m-3 py-3 px-4 shadow-sm rounded mt-12">
                  <div className="flex items-center">
                    <div className="h-8 w-8 bg-green-400 rounded-full flex justify-center items-center text-green-800 mr-3">
                      {currentQuizIndex + 1}
                    </div>
                    <p className="text-gray-800 text-lg font-semibold">
                      {quizzes[currentQuizIndex]?.question}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    {quizzes[currentQuizIndex]?.options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(option)}
                        className={`border text-lg rounded text-black p-2 cursor-pointer hover:bg-green-200 transition-all ${
                          selectedOption === option ? "bg-green-100" : ""
                        }`}
                      >
                        <p className="text-[16px] mb-1">{option}</p>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 flex justify-center">
                    <button
                      onClick={handleNextQuestion}
                      disabled={selectedOption === null}
                      className={`bg-blue-500 w-full text-white px-4 py-2 rounded ${
                        selectedOption === null
                          ? "opacity-50 cursor-not-allowed"
                          : "hover:bg-blue-700"
                      }`}
                    >
                      Next Quiz
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
};

export default QuizPage;
