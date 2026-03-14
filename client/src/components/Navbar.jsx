import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
    <nav className="fixed w-full bg-white shadow-sm z-50">

      <div className="flex justify-between items-center px-6 md:px-8 py-5">

        {/* Logo */}
        <Link to="/" className="text-xl font-semibold tracking-wide">
          Priyanka Samota
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center text-sm">

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

        {/* Hamburger Icon */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#C6A14A] text-black flex flex-col items-center gap-6 py-10 text-lg">

          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#certifications" onClick={() => setMenuOpen(false)}>Certifications</a>
          <a href="#achievements" onClick={() => setMenuOpen(false)}>Achievements</a>
          <a href="#resume" onClick={() => setMenuOpen(false)}>Resume</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>

          {!isLoggedIn ? (
            <Link to="/admin-login" onClick={() => setMenuOpen(false)}>
              Login
            </Link>
          ) : (
            <button onClick={handleLogout}>
              Logout
            </button>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
