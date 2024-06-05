import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Loader from "../../shared/Loader";

const ManageUsers = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    setLoading(true);
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleMakeTeacher = (id) => {
    fetch(`http://localhost:5000/users/teacher/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "This user is now instructor",
            showConfirmButton: false,
            timer: 2000,
          });
          fetchUsers();
        }
      });
  };
  const handleMakeAdmin = (id) => {
    fetch(`http://localhost:5000/users/admin/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Now this user is admin",
            showConfirmButton: false,
            timer: 2000,
          });
          fetchUsers();
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

  console.log(error)

  return (
    <div className="w-[90%] mx-auto mt-12">
      <h2 className="text-2xl md:text-2xl font-semibold text-center text-black">
        Manage All Users
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-36 bg-green-500"></div>
        <span className="text-red-500 font-semibold">Manage Users</span>
        <div className="h-1 w-36 bg-green-500"></div>
      </div>

      {
        <div className="overflow-x-auto mt-8">
          <table className="table text-black">
            {/* head */}
            <thead>
              <tr className="text-gray-500 font-semibold text-sm">
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action 1</th>
                <th>Action 2</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.role}</td>
                  <td>
                    <button
                      onClick={() => handleMakeTeacher(user._id)}
                      className={`text-white font-semibold p-2 rounded ${user.role == "Teacher" ? "bg-gray-300" : "bg-blue-400"}`}
                      disabled={user.role == "Teacher"}
                    >
                    Teacher
                    </button>
                  </td>
                  <td>
                    <button
                      onClick={() => handleMakeAdmin(user._id)}
                      className={`text-white font-semibold p-2 rounded ${user.role == "Admin" ? "bg-gray-300" : "bg-red-400"}`}
                      disabled={user.role == "Admin"}
                    >
                      Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
    </div>
  );
};

export default ManageUsers;
