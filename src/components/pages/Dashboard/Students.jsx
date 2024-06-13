import { useEffect, useState } from "react";
import Loader from "../../shared/Loader";

const Students = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:5000/users/students")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return <div className="w-[90%] mx-auto mt-12">
  <h2 className="text-2xl md:text-2xl font-semibold text-center text-black">
    All Students
  </h2>
  <div className="flex items-center justify-center gap-2">
    <div className="h-1 w-36 bg-green-500"></div>
    <span className="text-red-500 font-semibold">Manage Students</span>
    <div className="h-1 w-36 bg-green-500"></div>
  </div>

  {
    <div className="overflow-x-auto mt-8">
      <table className="table text-black">
        {/* head */}
        <thead>
          <tr className="text-gray-500 font-semibold text-sm">
            <th>#</th>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <tr key={user._id}>
              <th>{i + 1}</th>
              <td>{user?.id}</td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.department}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  }
</div>;
};

export default Students;
