import { useContext, useEffect, useState } from "react";
import {
  FaBars,
  FaBookmark,
  FaCheck,
  FaHome,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
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
        const studentRole = data.find(
          (student) => student?.email === user?.email
        );
        setCurrentUser(studentRole);
      })
      .catch((error) =>
        setError(`Something Went Wrong, ${error.message}. Try again latter`)
      )
      .finally(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  // console.log(error)

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex bg-white">
        {/* Page content here */}
        {error ? (
          <div className="w-full h-[90vh] flex items-center justify-center text-red-500 text-2xl">
            {error}
          </div>
        ) : (
          <Outlet />
        )}

        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="p-4 w-80 h-full bg-gray-700 text-white">
          <div className="flex items-center gap-5">
            <Link to="/">
              <FaHome className="mb-12" color="red" size={30} />
            </Link>
            <h1 className="text-3xl text-green-600 font-semibold border-b-2 border-white mb-12">
              Dashboard
            </h1>
          </div>

          <li className="bg-gray-900 hover:bg-black rounded mb-4">
            <NavLink
              className="nav-link flex items-center gap-2 ms-6"
              to="/dashboard"
            >
              <ImProfile /> Profile
            </NavLink>
          </li>

          {currentUser?.role === "Admin" && (
            <div>
              <li className="bg-gray-900 hover:bg-black rounded mb-4">
                <NavLink
                  className="nav-link flex items-center gap-2 justify-center"
                  to="/dashboard/manage-users"
                >
                  <FaUser /> Manage Users
                </NavLink>
              </li>
              <li className="bg-gray-900 hover:bg-black rounded">
                <NavLink
                  className="nav-link flex items-center gap-2 justify-center"
                  to="/dashboard/manage-quiz"
                >
                  <FaBars /> Manage Quiz
                </NavLink>
              </li>
            </div>
          )}

          {currentUser?.role === "Teacher" && (
            <div>
              <li className="bg-gray-900 hover:bg-black rounded mb-4">
                <NavLink
                  className="nav-link flex items-center gap-2 justify-center"
                  to="/dashboard/add-question"
                >
                  <FaUtensils />
                  Add Question
                </NavLink>
              </li>
              <li className="bg-gray-900 hover:bg-black rounded">
                <NavLink
                  className="nav-link flex items-center gap-2 justify-center"
                  to="/dashboard/my-quizzes"
                >
                  <FaCheck /> My Quizzes
                </NavLink>
              </li>
            </div>
          )}

          {currentUser?.role === "Student" && (
            <div>
              <li className="bg-gray-900 hover:bg-black rounded mb-4">
                <NavLink
                  className="nav-link flex items-center gap-2 justify-center"
                  to="/dashboard/quiz-results"
                >
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
