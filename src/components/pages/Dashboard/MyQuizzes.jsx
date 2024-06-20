import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../../providers/AuthProvider";

const MyQuizzes = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { user } = useContext(AuthContext);

  useEffect(() => {
    setLoading(true);
    if (user?.email) {
      fetch(`http://localhost:5000/my-quizzes?email=${user?.email}`)
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((error) => setError("Error fetching questions:", error))
        .finally(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/quiz/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            setQuestions(questions.filter((question) => question._id !== id));
            Swal.fire("Deleted!", "Your question has been deleted.", "success");
          })
          .catch((error) => console.error("Error deleting question:", error));
      }
    });
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    console.log(error);
  }

  return (
    <section className="md:w-9/12 w-[90%] mx-auto mt-12">
      <h2 className="text-2xl md:text-3xl font-semibold text-center text-black mb-4">
        Manage My Quizzes
      </h2>
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="h-1 w-36 bg-green-500"></div>
        <span className="text-red-500 font-semibold">Questions</span>
        <div className="h-1 w-36 bg-green-500"></div>
      </div>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {questions.map((question, index) => (
          <div key={question._id} className="border-t border-gray-200">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Question {index + 1}: {question.question}
              </h3>
              <div className="mt-2 max-w-xl text-sm text-gray-500">
                <p><strong>Options:</strong></p>
                <ul className="list-disc list-inside pl-5">
                  {question.options.map((option, i) => (
                    <li key={i}>{option}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-5 sm:flex sm:justify-between">
                <button
                  // onClick={() => handleUpdate(question._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(question._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MyQuizzes;
