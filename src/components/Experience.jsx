import { FaBuilding } from "react-icons/fa";
import "../styles/Experience.css";
const experiences = [
  {
    company: "CTSS",
    role: "Software Intern",
    date: "2025 | (4 months)",
    description:
      "Built Node.js/Express APIs with JWT and rate limiting, modeled data in Supabase/Sequelize, and developed responsive React UIs backed by PostgreSQL.",
  },
  {
    company: "Sestek",
    role: "Full Stack Developer Intern",
    date: "2025 | (2 months)",
    description:
      "Developed a .NET-based queue management system, implemented EF Core/PostgreSQL persistence, and wrote Playwright UI tests to validate user flows.",
  },
  {
    company: "Samsun Metropolitan Municipality",
    role: "IT Intern",
    date: "2024 | (1 months)",
    description:
      "Created responsive web interfaces with HTML, CSS, and Bootstrap; cloned e-commerce pages pixel-perfect and implemented listing, detail, and cart features.",
  },
];

export default function Experience() {
  return (
    <ul className="experience-list" id="experience">
      <h2 className="experience-title">Experience</h2>
      {experiences.map((exp, i) => (
        <li key={i} className="experience-item">
          <FaBuilding className="experience-icon" />
          <div>
            <h4 className="experience-company">{exp.company}</h4>
            <p className="experience-role">
              {exp.role} | {exp.date}
            </p>
            <p className="experience-description">{exp.description}</p>
          </div>
          <div className="experience-separator"></div>
        </li>
      ))}
    </ul>
  );
}
