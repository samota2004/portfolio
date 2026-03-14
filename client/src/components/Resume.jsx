import { useState, useEffect } from "react";

function Resume() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    const checkAdmin = () => {
      setIsAdmin(localStorage.getItem("isAdmin") === "true");
    };

    checkAdmin();
    window.addEventListener("storage", checkAdmin);

    return () => {
      window.removeEventListener("storage", checkAdmin);
    };
  }, []);

  useEffect(() => {
    const saved = localStorage.getItem("resume");
    if (saved) {
      setResume(saved);
    }
  }, []);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem("resume", reader.result);
      setResume(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    localStorage.removeItem("resume");
    setResume(null);
  };

  function Resume() {
  return (
    <section
      id="resume"
      className="bg-white px-6 md:px-24 py-20 md:py-32 text-center"
    >
      <h2 className="text-3xl md:text-5xl font-serif mb-6">
        Download My <span className="text-gold italic">Resume</span>
      </h2>

      <p className="text-gray-600 mb-10">
        Get a detailed overview of my skills, projects, and experience.
      </p>

      <a
        href="/Priyanka_Samota_Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gold text-black px-8 py-4 hover:bg-[#C4A24F] transition"
      >
        DOWNLOAD RESUME ↓
      </a>
    </section>
  );
}

export default Resume;
