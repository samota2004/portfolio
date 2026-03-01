import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkLogin();

    // 🔥 Listen for storage changes (important)
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");

    setIsLoggedIn(false);

    // 🔥 force all components to re-check auth
    window.dispatchEvent(new Event("storage"));

    navigate("/");
  };

  return (
    <nav className="fixed w-full flex justify-between items-center px-8 py-5 bg-white shadow-sm z-50">
      <h1 className="text-xl font-semibold tracking-wide">
        Priyanka Samota
      </h1>

      <div className="space-x-8 flex items-center">
        <a href="#about" className="hover:text-gold transition">
          About
        </a>
        <a href="#skills" className="hover:text-gold transition">
          Skills
        </a>
        <a href="#projects" className="hover:text-gold transition">
          Projects
        </a>
        <a href="#contact" className="hover:text-gold transition">
          Contact
        </a>

        {!isLoggedIn ? (
          <Link
            to="/admin-login"
            className="hover:text-gold transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-black transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;