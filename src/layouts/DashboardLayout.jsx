import { useContext, useEffect, useState } from "react";
import { FaBars, FaBookmark, FaCheck, FaHome, FaUser, FaUtensils } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { ImProfile } from "react-icons/im";
import Loader from "../components/shared/Loader";

const DashboardLayout = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        const studentRole = data.find((student) => student?.email === user?.email);
        setCurrentUser(studentRole);
      })
      .catch((error) => setError(`Something went wrong, ${error.message}. Try again later`))
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col bg-white p-6">
        {/* Sidebar toggle button */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden fixed top-4 left-4 z-50"
        >
          <FaBars size={24} />
        </label>
        
        {/* Page content here */}
        {error ? (
          <div className="w-full h-[90vh] flex items-center justify-center text-red-500 text-2xl">
            {error}
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      
      <div className="drawer-side min-h-screen bg-gray-800 text-white">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="p-4 w-80 h-full">
          <div className="flex items-center gap-4 mb-8">
            <Link to="/" className="text-red-500">
              <FaHome size={30} />
            </Link>
            <h1 className="text-3xl font-bold text-green-500">Dashboard</h1>
          </div>

          <li className="mb-4">
            <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard">
              <ImProfile /> Profile
            </NavLink>
          </li>

          {currentUser?.role === "Admin" && (
            <div>
              <li className="mb-4">
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/manage-users">
                  <FaUser /> Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/manage-quiz">
                  <FaBars /> Manage Quiz
                </NavLink>
              </li>
            </div>
          )}

          {currentUser?.role === "Teacher" && (
            <div>
              <li className="mb-4">
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/students">
                  <FaUser /> All Students
                </NavLink>
              </li>
              <li className="mb-4">
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/add-question">
                  <FaUtensils /> Add Question
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/my-quizzes">
                  <FaCheck /> My Quizzes
                </NavLink>
              </li>
            </div>
          )}

          {currentUser?.role === "Student" && (
            <div>
              <li className="mb-4">
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/exams">
                  <FaBookmark /> Exams
                </NavLink>
              </li>
              <li>
                <NavLink className="flex items-center gap-2 px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors" to="/dashboard/quiz-results">
                  <FaBookmark /> Quiz Result & Summary
                </NavLink>
              </li>
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
