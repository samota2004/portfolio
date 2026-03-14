function About() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <section
      id="about"
      className="bg-cream px-6 md:px-24 py-20 md:py-32 flex flex-col md:flex-row items-center justify-between gap-16"
    >

      {/* Left Content */}
      <div className="max-w-xl">

        <p className="text-gold tracking-[3px] mb-4 text-xs uppercase">
          Fullstack Developer · Available for Work
        </p>

        <h2 className="text-3xl md:text-6xl leading-tight">
          Driven by{" "}
          <span className="text-gold italic">
            Code & Curiosity
          </span>
        </h2>

        <p className="mt-6 md:mt-8 text-gray-600 text-base md:text-lg leading-relaxed">
          I am a Computer Science student at VIT-AP University (2023–2027),
          originally from Sikar, Rajasthan. Coming from a small city with
          big aspirations, I am driven by discipline, curiosity, and the
          ambition to build impactful technology.
        </p>

        <p className="mt-4 md:mt-6 text-gray-600 text-base md:text-lg leading-relaxed">
          Through academics and real-world training experiences, I have
          developed a strong problem-solving mindset and a deep interest
          in creating scalable and efficient systems.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-6">

          <button
            onClick={() => scrollToSection("projects")}
            className="bg-black text-white px-6 md:px-8 py-3 tracking-wide hover:bg-gold hover:text-black transition duration-300"
          >
            VIEW MY WORK
          </button>

          <button
            onClick={() => scrollToSection("contact")}
            className="flex items-center gap-2 text-black tracking-wide hover:text-gold transition duration-300"
          >
            LET'S TALK
            <span className="transition-transform hover:translate-x-1">
              →
            </span>
          </button>

        </div>

        {/* Stats Box */}
        <div className="mt-10 bg-white shadow-lg p-6 md:p-8 flex justify-between w-full md:w-[400px]">

          <div>
            <h3 className="text-2xl md:text-3xl font-serif">3+</h3>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Projects Completed
            </p>
          </div>

          <div>
            <h3 className="text-2xl md:text-3xl font-serif">2</h3>
            <p className="text-xs md:text-sm text-gray-500 uppercase">
              Internships & Training
            </p>
          </div>

        </div>

      </div>

      {/* Right Photo */}
      <div className="relative">

        {/* Gold Background */}
        <div className="absolute -right-4 -bottom-4 md:-right-6 md:-bottom-6 w-[260px] md:w-[350px] h-[340px] md:h-[450px] bg-gold"></div>

        {/* Image */}
        <div className="relative w-[260px] md:w-[350px] h-[340px] md:h-[450px] bg-black overflow-hidden">

          <img
            src="/priyanka.jpeg"
            alt="Priyanka Samota"
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />

        </div>

        {/* Tag */}
        <div className="absolute -bottom-4 left-6 md:left-10 bg-gold px-4 md:px-6 py-2 text-xs md:text-sm">
          FullStack Developer
        </div>

      </div>

    </section>
  );
}

export default About;
