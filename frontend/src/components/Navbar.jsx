import { Link, useNavigate, useLocation } from "react-router";
import { useState } from "react";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/Login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDonateClick = () => {
    if (currentUser) {
      navigate("/AddDonation");
    } else {
      navigate("/Login", { state: { from: "/AddDonation" } });
    }
  };

  return (
    <nav className="bg-blue-200/90 backdrop-blur border-b border-blue-300 fixed top-0 w-full z-10 shadow-sm">
      
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link to="/">
          <span className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight cursor-pointer">
            Zero Waste Pantry
          </span>
        </Link>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 text-2xl"
        >
          ☰
        </button>

        {/* Menu */}
        <div
          className={`w-full md:flex md:w-auto ${
            isOpen ? "block mt-4" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8 bg-white md:bg-transparent p-4 md:p-0 rounded-lg md:rounded-none shadow md:shadow-none">

            {/* 🔥 HOMEPAGE ONLY */}
            {isHomePage ? (
              <>
                <li>
                  <Link
                    to="/Login"
                    className="text-gray-700 hover:text-blue-600 transition text-sm"
                  >
                    Login
                  </Link>
                </li>

                <li>
                  <button
                    onClick={handleDonateClick}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm"
                  >
                    Donate now
                  </button>
                </li>
              </>
            ) : (
              <>
                {!currentUser && (
                  <li>
                    <Link
                      to="/Login"
                      className="text-gray-700 hover:text-blue-600 transition text-sm"
                    >
                      Login
                    </Link>
                  </li>
                )}

                {currentUser && (
                  <>
                    <li className="text-gray-700 text-sm">
                      Hi,{" "}
                      <span className="font-medium">
                        {currentUser.firstName}
                      </span>
                    </li>

                    <li>
                      <button
                        onClick={handleLogout}
                        className="text-gray-700 hover:text-red-500 transition text-sm"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                )}

                <li>
                  <button
                    onClick={handleDonateClick}
                    className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm hover:bg-blue-700 transition shadow-sm"
                  >
                    Donate now
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;