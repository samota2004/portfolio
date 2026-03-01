function Footer() {
  return (
    <footer className="bg-[#0E0E0E] text-gray-400 px-24 py-10 border-t border-gray-800">
      <div className="flex justify-between items-center">

        {/* Left Logo */}
        <h1 className="text-white font-serif text-xl">
          Priyanka Samota
        </h1>

        {/* Center Text */}
        <p className="text-sm">
          © 2026 — Designed & Built with ♥
        </p>

        {/* Right Social Links */}
        <div className="flex gap-8 text-sm">
          <a href="/" className="hover:text-gold transition">
            GitHub
          </a>
          <a href="/" className="hover:text-gold transition">
            LinkedIn
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;