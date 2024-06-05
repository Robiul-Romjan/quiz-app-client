import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import Loader from "../../shared/Loader"

const QuizResults = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      fetch(`http://localhost:5000/my-results?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          // Assuming each result has a `date` field to sort by
          console.log(data);
          if (data && data.length > 0) {
            const sortedResults = data.sort(
              (a, b) => new Date(b.date) - new Date(a.date)
            );
            setResults(sortedResults[0]); // Set only the most recent result
          }
        });
      setLoading(false);
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
    <section className="md:w-10/12 w-[90%] md:flex-row flex-col mx-auto">
      <div className="w-9/12 mx-auto mt-12 text-center">
        <h1 className="text-2xl font-bold text-black">Quiz Completed!</h1>
        <p className="text-lg mt-4 text-gray-500">
          Thank you for participating.
        </p>
        <p className="text-lg mt-4 text-black">
          Your Score: <span className="text-green-600">{results?.score}</span>
        </p>
        <p className="text-lg mt-4 text-black">
          Participent Date:{" "}
          <span className="text-red-400">{formatDate(results?.date)}</span>
        </p>
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-blue-600">Summary</h2>
          <ul className="text-left mt-2 text-black">
            {results?.userSelections?.map((selection, index) => (
              <li key={index} className="mt-2">
                <p className="text-gray-800">{selection.question}</p>
                <p>
                  <span className="font-semibold">Your Answer:</span>{" "}
                  {selection.selectedAnswer}
                </p>
                <p>
                  <span className="font-semibold">Correct Answer:</span>{" "}
                  {selection.correctAnswer}
                </p>
                <p>
                  <span
                    className={`font-semibold ${
                      selection.isCorrect ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {selection.isCorrect ? "Correct" : "Incorrect"}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default QuizResults;
