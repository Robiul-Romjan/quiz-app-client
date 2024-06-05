import { useContext, useEffect, useState } from "react";
import Loader from "../../shared/Loader";
import { AuthContext } from "../../../providers/AuthProvider";

const Profile = () => {
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
      <div className="w-full h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
          Your Profile Information
        </h1>
        {error ? (
          <div className="w-full h-[90vh] flex items-center justify-center text-red-500 text-2xl">
            {error}
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              {user?.photoUrl ? (
                <img
                  className="rounded-full w-32 h-32 border-green-500 border-4 shadow-md"
                  src={user?.photoUrl}
                  alt="User Avatar"
                />
              ) : (
                <>
                  <div className="flex items-center justify-center rounded-full w-32 h-32 border-green-500 border-4 text-3xl font-semibold text-gray-800 shadow-md">
                    {currentUser?.name.slice(0, 1)}
                  </div>
                  <p className="mt-2 text-lg font-semibold text-gray-800 text-center">
                    <span className="font-normal">{currentUser?.role}</span>
                  </p>
                </>
              )}
            </div>
            <div className="md:ml-8 text-center md:text-left">
              <p className="mt-2 text-lg font-semibold text-gray-800">
                ID: <span className="font-normal">{currentUser?.id}</span>
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Name: <span className="font-normal">{currentUser?.name}</span>
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Email: <span className="font-normal">{currentUser?.email}</span>
              </p>
              <p className="mt-2 text-lg font-semibold text-gray-800">
                Department:{" "}
                <span className="font-normal">{currentUser?.department}</span>
              </p>
            </div>
          </div>
        )}
        <div className="text-right">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
