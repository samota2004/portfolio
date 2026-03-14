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
        download="Priyanka_Samota_Resume.pdf"
        className="bg-gold text-black px-8 py-4 hover:bg-[#C4A24F] transition"
      >
        DOWNLOAD RESUME ↓
      </a>
    </section>
  );
}

export default Resume;
