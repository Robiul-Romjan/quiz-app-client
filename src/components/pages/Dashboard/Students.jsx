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
        <table className="min-w-full bg-white border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b border-gray-200">#</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Id</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Name</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Email</th>
              <th className="py-3 px-6 text-left text-sm font-medium text-gray-700 border-b border-gray-200">Department</th>
            </tr>
          </thead>
          <tbody>
            {error ? (
              <tr>
                <td colSpan="5" className="py-4 text-center text-red-600 font-semibold">
                  Student Not found
                </td>
              </tr>
            ) : (
              users.map((user, i) => (
                <tr key={user._id} className="hover:bg-gray-100 transition-colors">
                  <td className="py-3 px-6 border-b border-gray-200">{i + 1}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{user?.id}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{user?.name}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{user?.email}</td>
                  <td className="py-3 px-6 border-b border-gray-200">{user?.department}</td>
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
