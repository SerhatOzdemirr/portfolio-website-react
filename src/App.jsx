import "./App.css";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Particles from "./components/Particles"; 
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
function App() {
  return (
    <div className="App">
      <Particles />

      <div className="content">
        <Navbar />
        <About name="Serhat Özdemir" title="Full-Stack Web Developer" />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </div>
  );
}


export default App;
