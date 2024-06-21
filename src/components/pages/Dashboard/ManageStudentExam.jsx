import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ManageStudentExam = () => {
  const [studentsExams, setStudentExams] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/all-exam-results")
      .then((res) => res.json())
      .then((data) => setStudentExams(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Reset it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/reset-exam/${id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then(() => {
            Swal.fire("Reset!", "This exam has been reset.", "success");
          })
          .catch((error) => console.error("Error deleting question:", error));
      }
    });
  };

  return (
    <div className="w-[90%] mx-auto mt-12">
      <h2 className="text-3xl font-semibold text-center text-black mb-4">
        Manage Students Exams
      </h2>
      <div className="flex items-center justify-center gap-2 mb-6">
        <div className="h-1 w-36 bg-green-500"></div>
        <span className="text-red-500 font-semibold">Students Exams</span>
        <div className="h-1 w-36 bg-green-500"></div>
      </div>

      <div className="flex justify-center mb-6">
        <input
          type="search"
          className="border-2 border-gray-300 p-3 rounded w-1/2 focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Search by Id or Name"
          aria-label="Search"
          aria-describedby="button-addon1"
        />
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="min-w-full bg-white shadow-md rounded-lg border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                #
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Id
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Exam Name
              </th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-4 text-center text-red-600 font-semibold"
                >
                  Student Exam Not found
                </td>
              </tr>
            ) : (
              studentsExams.map((user, i) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-3 px-6 border-t border-gray-200">
                    {i + 1}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200">
                    {user?.id}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200">
                    {user?.name}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200">
                    {user?.examName}
                  </td>
                  <td className="py-3 px-6 border-t border-gray-200">
                    <button
                      onClick={() => handleDelete(user?._id)}
                      className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 transition-colors"
                    >
                      Reset Exam
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageStudentExam;
