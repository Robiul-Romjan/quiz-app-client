import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const Students = () => {
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  useEffect(() => {
    const fetchUsers = async () => {
      setError("");
      try {
        let url = "http://localhost:5000/searchUser";
        if (debouncedSearchQuery) {
          const queryParam = isNaN(debouncedSearchQuery)
            ? `name=${debouncedSearchQuery}`
            : `id=${debouncedSearchQuery}`;
          url += `?${queryParam}`;
        }
        const response = await fetch(url);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "Error fetching users");
        }
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, [debouncedSearchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.trim());
  };

  return (
    <div className="w-[90%] mx-auto mt-12">
      <h2 className="text-2xl md:text-2xl font-semibold text-center text-black">
        All Students
      </h2>
      <div className="flex items-center justify-center gap-2">
        <div className="h-1 w-36 bg-green-500"></div>
        <span className="text-red-500 font-semibold">Manage Students</span>
        <div className="h-1 w-36 bg-green-500"></div>
      </div>

      <div className="flex justify-center mt-6">
        <input
          type="search"
          className="border-2 border-gray-400 p-2 rounded w-1/2"
          placeholder="Search by Id or Name"
          aria-label="Search"
          aria-describedby="button-addon1"
          onChange={handleSearchChange}
        />
      </div>

      <div className="overflow-x-auto mt-8">
        <table className="table text-black">
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
            {error ? (
              <tr>
                <td colSpan="5" className="text-center mt-8 font-bold">
                  {error}
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user._id}>
                  <th>{i + 1}</th>
                  <td>{user?.id}</td>
                  <td>{user?.name}</td>
                  <td>{user?.email}</td>
                  <td>{user?.department}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
