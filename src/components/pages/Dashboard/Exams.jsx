import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";

const Exams = () => {
  const { user } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const startQuiz = (path) => {
    Swal.fire({
      title: "Are you ready?",
      text: "Once you click start, the quiz will begin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Start",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate(path);
      }
    });
  };

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/my-results?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => setResults(data))
      .finally(() => setLoading(false));
  }, [user.email]);

  const isExamCompleted = (examName) => {
    return results.some((result) => result.examName === examName);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-12 mb-8">
      <h2 className="text-3xl font-semibold text-center text-black mb-8">
        Available Exams
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { name: "CSE", img: "/cse.jpeg", path: "/quiz/CSE" },
          { name: "EEE", img: "/eee.jpeg", path: "/quiz/EEE" },
          { name: "Textile", img: "/textile.jpeg", path: "/quiz/Textile" },
          { name: "BBA", img: "/bba.jpeg", path: "/quiz/BBA" },
        ].map((exam) => (
          <div key={exam.name} className="relative shadow-lg rounded-lg overflow-hidden">
            <img className="w-full h-48 object-cover" src={exam.img} alt={exam.name} />
            <div className="p-4 flex flex-col justify-between h-36">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{exam.name}</h3>
                <div className="flex justify-between text-gray-600">
                  <span>Quiz: 10</span>
                  <span>Mark: 50</span>
                </div>
              </div>
              <button
                className={`mt-4 py-2 px-4 rounded-lg text-white font-semibold ${isExamCompleted(exam.name) ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600 transition"}`}
                onClick={() => startQuiz(exam.path)}
                disabled={isExamCompleted(exam.name)}
              >
                {isExamCompleted(exam.name) ? "Completed" : "Start Quiz"}
              </button>
            </div>
            {isExamCompleted(exam.name) && (
              <div className="absolute top-0 right-0 bg-green-500 text-white py-1 px-2 rounded-bl-lg">
                Completed
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
