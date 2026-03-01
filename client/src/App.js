import ScrollToTop from "./ScrollToTop";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Education from "./components/Education";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Certifications from "./components/Certifications";
import Achievements from "./components/Achievements";
import Resume from "./components/Resume";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <div className = "pt-24">
      <About />
      <Education />
      <Skills />
      <Projects />
       <Certifications />
      <Achievements />
      <Resume />
      <Contact />
      <Footer />
      </div>
    </>
  );
}
function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin-login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;