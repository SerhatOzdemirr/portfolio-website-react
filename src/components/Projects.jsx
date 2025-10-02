import Carousel from "./Carousel";
import "../styles/Projects.css";
import {
  FiLayers,
  FiCode,
  FiFileText,
  FiCircle,
  FiLayout,
} from "react-icons/fi";
import { li, link } from "motion/react-client";
// BankNumerator için
const BANKNUMERATOR_ITEMS = [
  {
    title: "BankNumerator App",
    link: "github.com/SerhatOzdemirr/bank-queue-management",
    description:
      "Queue management system with ticketing, assignment, and counters.",
    id: 1,
    icon: <FiLayers className="carousel-icon" />,
  },
  {
    title: "Tech Stack",
    description: ".NET 9 Web API, EF Core, PostgreSQL, Angular 20.",
    id: 2,
    icon: <FiCode className="carousel-icon" />,
  },
  {
    title: "Features",
    description: "Role-based auth with JWT, responsive UI, service counters.",
    id: 3,
    icon: <FiFileText className="carousel-icon" />,
  },
  {
    title: "Testing",
    description: "Automated UI tests with Playwright to validate user flows.",
    id: 4,
    icon: <FiCircle className="carousel-icon" />,
  },
];

// E-Commerce Clone için
const ECOMMERCE_ITEMS = [
  {
    title: "Hepsiburada Clone",
    description:
      "Pixel-perfect clone of Hepsiburada with product listing and cart.",
    link: "github.com/SerhatOzdemirr/HepsiburadaUI_Internship",
    id: 1,
    icon: <FiLayout className="carousel-icon" />,
  },
  {
    title: "Frontend",
    description: "Built using HTML, CSS, JS, and Bootstrap for responsiveness.",
    id: 2,
    icon: <FiCode className="carousel-icon" />,
  },
  {
    title: "Pages",
    description:
      "Includes home, product detail, and cart pages with real-like flow.",
    id: 3,
    icon: <FiFileText className="carousel-icon" />,
  },
  {
    title: "Challenges",
    description:
      "Focus on pixel-perfect design and cross-device compatibility.",
    id: 4,
    icon: <FiCircle className="carousel-icon" />,
  },
];

// Automation Tests için
const TEST_ITEMS = [
  {
    title: "BankNumerator Tests",
    description:
      "Playwright UI automation suite for validating user behaviors.",
    link: "github.com/SerhatOzdemirr/bank-queue-management",
    id: 1,
    icon: <FiLayers className="carousel-icon" />,
  },
  {
    title: "Scopes",
    description: "Covers login, ticket assignment, admin service management.",
    id: 2,
    icon: <FiCode className="carousel-icon" />,
  },
  {
    title: "Benefits",
    description: "Ensures reliability, regression prevention, and speed in QA.",
    id: 3,
    icon: <FiFileText className="carousel-icon" />,
  },
];

// UI Experiments için
const UI_ITEMS = [
  {
    title: "E-Commerce UI",
    description: "Creative UI components and experiments with Bootstrap 5.",
    id: 1,
    link: "github.com/SerhatOzdemirr/E-CommerceUI",
    icon: <FiLayout className="carousel-icon" />,
  },
  {
    title: "Styling",
    description: "Custom SCSS, responsive layouts, CSS Grid & Flexbox.",
    id: 2,
    icon: <FiCode className="carousel-icon" />,
  },
  {
    title: "Animations",
    description: "Motion-based transitions and micro-interactions.",
    id: 3,
    icon: <FiFileText className="carousel-icon" />,
  },
  {
    title: "Outcome",
    description: "Reusable design patterns for modern web projects.",
    id: 4,
    icon: <FiCircle className="carousel-icon" />,
  },
];
function Projects() {
  return (
    <div className="projects-container" id="projects">
      <h2>My Projects</h2>
      <div className="project-items">
        <div className="project-item">
          <Carousel items={BANKNUMERATOR_ITEMS} baseWidth={320} />
        </div>
        <div className="project-item">
          <Carousel items={ECOMMERCE_ITEMS} baseWidth={320} />
        </div>{" "}
        <div className="project-item">
          <Carousel items={TEST_ITEMS} baseWidth={320} />
        </div>{" "}
        <div className="project-item">
          <Carousel items={UI_ITEMS} baseWidth={320} />
        </div>
      </div>
    </div>
  );
}

export default Projects;
