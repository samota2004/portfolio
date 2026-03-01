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
      className="bg-cream px-24 py-32 flex items-center justify-between"
    >
      {/* Left Content */}
      <div className="max-w-xl">
        <p className="text-gold tracking-[3px] mb-4 text-xs uppercase">
          Fullstack Developer · Available for Work
        </p>

        <h2 className="text-6xl leading-tight">
          Driven by{" "}
          <span className="text-gold italic">
            Code & Curiosity
          </span>
        </h2>

        <p className="mt-8 text-gray-600 text-lg leading-relaxed">
          I am a Computer Science student at VIT-AP University (2023–2027), 
          originally from Sikar, Rajasthan. Coming from a small city with 
          big aspirations, I am driven by discipline, curiosity, and the 
          ambition to build impactful technology.
        </p>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed">
          Through academics and real-world training experiences, I have 
          developed a strong problem-solving mindset and a deep interest 
          in creating scalable and efficient systems. I continuously push 
          myself to learn, adapt, and grow, aiming to become a software 
          engineer who delivers value through innovation and thoughtful design.
        </p>

        {/* Buttons Added */}
        <div className="mt-8 flex items-center gap-8">
          
          {/* VIEW MY WORK */}
          <button
            onClick={() => scrollToSection("projects")}
            className="bg-black text-white px-8 py-3 tracking-wide hover:bg-gold hover:text-black transition duration-300"
          >
            VIEW MY WORK
          </button>

          {/* LET'S TALK */}
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
        <div className="mt-12 bg-white shadow-lg p-8 flex justify-between w-[400px]">
          <div>
            <h3 className="text-3xl font-serif">3+</h3>
            <p className="text-sm text-gray-500 uppercase">
              Projects Completed
            </p>
          </div>

          <div>
            <h3 className="text-3xl font-serif">2</h3>
            <p className="text-sm text-gray-500 uppercase">
              Internships & Training
            </p>
          </div>
        </div>
      </div>

      {/* Right Layered Photo Card */}
      <div className="relative">

        {/* Gold Background Layer */}
        <div className="absolute -right-6 -bottom-6 w-[350px] h-[450px] bg-gold"></div>

        {/* Photo Card */}
        <div className="relative w-[350px] h-[450px] bg-black overflow-hidden">
          <img
            src="/priyanka.jpeg"
            alt="Priyanka Samota"
            className="w-full h-full object-cover transition duration-500 hover:scale-105"
          />
        </div>

        {/* Tag */}
        <div className="absolute -bottom-4 left-10 bg-gold px-6 py-2 text-sm">
          FullStack Developer
        </div>

      </div>
    </section>
  );
}

export default About;