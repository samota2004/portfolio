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
    window.addEventListener("storage", checkLogin);

    return () => {
      window.removeEventListener("storage", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/");
  };

  return (
    <nav className="fixed w-full flex justify-between items-center px-8 py-5 bg-white shadow-sm z-50">

      <Link to="/" className="text-xl font-semibold tracking-wide">
        Priyanka Samota
      </Link>

      <div className="space-x-6 flex items-center text-sm">

        <a href="#about" className="hover:text-gold">About</a>

        <a href="#education" className="hover:text-gold">Education</a>

        <a href="#skills" className="hover:text-gold">Skills</a>

        <a href="#projects" className="hover:text-gold">Projects</a>

        <a href="#certifications" className="hover:text-gold">Certifications</a>

        <a href="#achievements" className="hover:text-gold">Achievements</a>

        <a href="#resume" className="hover:text-gold">Resume</a>

        <a href="#contact" className="hover:text-gold">Contact</a>

        {!isLoggedIn ? (
          <Link to="/admin-login" className="hover:text-gold">
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-black"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
