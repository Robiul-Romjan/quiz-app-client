import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut();
  };

  return (
    <div className="h-16 flex items-center shadow-lg">
      <nav className="flex justify-between items-center md:w-5/6 w-full px-5 md:px-0 mx-auto">
        <div className="text-zinc-800 font-bold uppercase">
          <Link to="/">
            <h1 className="text-2xl">
              Question <span className="text-green-700">Bank</span>
            </h1>
            <p className="text-[14px] font-normal capitalize -mt-1">
              Assurance questions bank 2024
            </p>
          </Link>
        </div>

        {user ? (
          <div>
            <Link
              className="text-black font-semibold me-8"
              to="/dashboard"
            >
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-400 font-semibold text-sm px-5 py-1 rounded text-white "
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            className="bg-green-600 font-semibold text-sm px-5 py-1 rounded text-white "
            to="/login"
          >
            Login
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
