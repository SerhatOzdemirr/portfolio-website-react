import "../styles/About.css";
import AboutDescription from "./AboutDescription";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
function About(props) {
  return (
    <div className="about-container" id="about">
      <div className="about-left">
        <h2>{props.name}</h2>
        <p>{props.title}</p>
        <div className="social-group">
          <FaLinkedin
            className="social-icon"
            title="LinkedIn"
            onClick={() =>
              window.open(
                "https://www.linkedin.com/in/serhat-%C3%B6zdemir-a6a4462b0/",
                "_blank"
              )
            }
          />
          <FaGithub
            className="social-icon"
            title="GitHub"
            onClick={() =>
              window.open("https://github.com/SerhatOzdemirr", "_blank")
            }
          />
        </div>
      </div>
      <div className="about-right">
        <AboutDescription />
      </div>
    </div>
  );
}

export default About;
