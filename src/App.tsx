import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Achievements from "./components/Achievements";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import ScrollProgress from "./components/ScrollProgress";
import SmoothScroll from "./components/SmoothScroll";
import AuroraBackground from "./components/AuroraBackground";

export default function App() {
  return (
    <SmoothScroll>
      <Loader />
      <ScrollProgress />
      <div className="relative min-h-screen bg-ink-950 text-slate-100 antialiased">
        <AuroraBackground />
        <Navbar />
        <main>
          <Hero />
          <About />
          <Skills />
          <Experience />
          <Achievements />
          <Projects />
          <Education />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
