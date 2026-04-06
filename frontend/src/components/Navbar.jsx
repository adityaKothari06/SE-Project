import { Link, useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div>
      <nav className="bg-blue-100 w-full border-b border-gray-300 fixed top-0 z-10">
        <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto py-4 px-4">
          {/* Logo */}
          <span className="text-xl font-semibold text-gray-800 whitespace-nowrap">
            The Zero Waste Pantry
          </span>

          {/* Hamburger Button (mobile only) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 text-2xl"
          >
            ☰
          </button>

          {/* Menu */}
          <div
            className={`w-full md:flex md:w-auto md:order-1 ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <ul
              className="font-medium flex flex-col p-4 mt-4 border border-gray-200 rounded-lg bg-white 
              md:flex-row md:space-x-8 md:p-0 md:mt-0 md:border-0 md:bg-blue-100"
            >
              {!currentUser && (
                <li>
                  <Link
                    to="/Login"
                    className="block py-2 px-2 bg-blue-600 md:bg-transparent text-blue-700"
                  >
                    Login
                  </Link>
                </li>
              )}

              {currentUser && (
                <>
                  <li>
                    <span className="block py-2 px-2 text-gray-800">
                      Hi, {currentUser.phoneNumber}
                    </span>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="block py-2 px-2 text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700 cursor-pointer"
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}

              <li>
                <Link
                  to="/FoodList"
                  className="block py-2 px-2 text-gray-800 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-700"
                >
                  Available Food
                </Link>
              </li>

              <li>
                <Link
                  to="/Profile"
                  className="block py-2 px-2 text-gray-800 hover:text-blue-700"
                >
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;