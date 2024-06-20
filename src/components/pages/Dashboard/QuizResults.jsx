import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Loader from "../../shared/Loader";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const QuizResults = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/my-results?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((error) => console.log(error.message))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <section className="md:w-10/12 w-[90%] mb-8 md:flex-row flex-col mx-auto">
      <div className="w-full mx-auto mt-12 text-center">
        <h1 className="text-3xl font-bold text-black">Quiz Completed!</h1>
        <p className="text-lg mt-4 text-gray-600">
          Thank you for participating.
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-blue-700 border-b-2 border-green-500 inline-block">Summary</h2>
          <div className="mt-6 space-y-8">
            {results?.map((exam) => (
              <div key={exam._id} className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Exam Name: {exam?.examName}</h3>
                <p className="text-gray-600 mb-4">Given Date: {formatDate(exam?.date)}</p>
                <div className="space-y-4">
                  {exam?.userSelections.map((selection, i) => (
                    <div key={i} className="p-4 bg-gray-100 rounded-lg">
                      <p className="font-medium text-gray-700">Question: {selection?.question}</p>
                      <p className="text-green-600">Correct Answer: {selection?.correctAnswer}</p>
                      <p className="text-blue-600">Your Answer: {selection?.selectedAnswer}</p>
                      <p className="flex items-center">
                        {selection?.isCorrect ? (
                          <FaCheckCircle className="text-green-500 mr-2" />
                        ) : (
                          <FaTimesCircle className="text-red-500 mr-2" />
                        )}
                        {selection?.isCorrect ? "Correct" : "Wrong"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
