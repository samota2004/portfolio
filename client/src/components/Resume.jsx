import { useState, useEffect } from "react";

function Resume() {
  const [isAdmin, setIsAdmin] = useState(false);

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
  const [resume, setResume] = useState(null);

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

  return (
    <section className="bg-white px-24 py-32 text-center">
      <h2 className="text-5xl font-serif mb-8">
        Download My <span className="text-gold italic">Resume</span>
      </h2>

      <p className="text-gray-600 mb-12">
        Get a detailed overview of my skills, projects, and experience.
      </p>

      {/* Download Button (Visible to Everyone if resume exists) */}
      {resume && (
        <a
          href={resume}
          download="Priyanka_Samota_Resume.pdf"
          className="bg-gold text-black px-10 py-4 tracking-wide hover:bg-[#C4A24F] transition"
        >
          DOWNLOAD RESUME ↓
        </a>
      )}

      {/* Admin Controls */}
      {isAdmin && (
        <div className="mt-10 space-x-4">
          <label className="bg-black text-white px-6 py-2 cursor-pointer">
            Upload
            <input
              type="file"
              accept="application/pdf"
              onChange={handleUpload}
              className="hidden"
            />
          </label>

          {resume && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-6 py-2"
            >
              Delete
            </button>
          )}
        </div>
      )}
    </section>
  );
}

export default Resume;