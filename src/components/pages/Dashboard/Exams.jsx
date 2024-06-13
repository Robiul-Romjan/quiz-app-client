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
      title: "Are you Ready?",
      text: "After click start quiz will be start!",
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
    setLoading(true)
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
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-[90%] mx-auto mt-12 mb-8">
      <div className="grid grid-cols-2 gap-8 w-full">
        {[
          { name: "CSE", img: "/cse.jpeg", path: "/quiz/CSE" },
          { name: "EEE", img: "/eee.jpeg", path: "/quiz/EEE" },
          { name: "Textile", img: "/textile.jpeg", path: "/quiz/Textile" },
          { name: "BBA", img: "/bba.jpeg", path: "/quiz/BBA" },
        ].map((exam) => (
          <div key={exam.name} className="h-[300px] border-2 border-green-600 flex flex-col">
            <img className="w-full h-[200px]" src={exam.img} alt={exam.name} />
            <div className="flex flex-col items-baseline flex-grow">
              <div className="w-full px-4">
                <h1 className="text-xl font-semibold text-black">{exam.name}</h1>
                <div className="flex justify-between">
                  <p>Quiz: 10</p>
                  <p>Mark: 50</p>
                </div>
              </div>
              <button
                className="bg-green-500 text-white w-full p-2 font-semibold mt-auto disabled:bg-gray-400"
                onClick={() => startQuiz(exam.path)}
                disabled={isExamCompleted(exam.name)}
              >
                {isExamCompleted(exam.name) ? "Completed" : "Start Quiz"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exams;
