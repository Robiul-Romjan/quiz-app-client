import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";

const ManageQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/all-questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((error) => setError("Error fetching questions:", error))
      .finally(() => setLoading(false));
  }, []);

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
      <h2 className="text-2xl md:text-2xl font-semibold text-center text-black">
        Manage All Questions
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-36 bg-green-500"></div>
        <span className="text-red-500 font-semibold">Questions</span>
        <div className="h-1 w-36 bg-green-500"></div>
      </div>
      <div className="mt-8">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-white divide-y divide-gray-500">
            {questions.map((question, index) => (
              <div key={question._id}>
                <div className="px-6 whitespace-nowrap text-black mt-4">
                  <h2 className="font-semibold">
                    {" "}
                    <span className="text-green-500">
                      Question {index + 1}
                    </span>{" "}
                    : {question?.question}
                  </h2>
                  <ul>
                    <span className="font-semibold">Options:</span>
                    {question.options.map((option, i) => (
                      <li className="ms-8" key={i}>
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="px-6 mb-4 whitespace-nowrap">
                  <button
                    // onClick={() => handleUpdate(question._id)}
                    className="text-blue-600 hover:text-blue-900 mr-4 font-semibold"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(question._id)}
                    className="text-red-600 hover:text-red-900 font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageQuiz;
