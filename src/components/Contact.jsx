import { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiExternalLink,
  FiCopy,
  FiCheck,
} from "react-icons/fi";
import "../styles/Contact.css";

export default function Contact() {
  const EMAIL = "ozdemirserhat385@gmail.com";
  const PHONE_DISPLAY = "+90 531 651 08 55";
  const PHONE_TEL = "+905316510855";
  // TODO: put your real LinkedIn URL
  const LINKEDIN_URL = "https://www.linkedin.com/in/serhat-ozdemir";

  const [copied, setCopied] = useState("");

  const copy = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(key);
      setTimeout(() => setCopied(""), 1200);
    } catch (_) {}
  };

  return (
    <section className="contact-section" aria-label="Contact section">
      <div className="contact-container">
        <header className="contact-header">
          <h1>Get in touch</h1>
          <p>Istanbul, TR · Open to internships & freelance</p>
        </header>

        <div className="contact-grid">
          {/* EMAIL */}
          <article className="card reveal">
            <div className="card-head">
              <span className="icon-wrap">
                <FiMail />
              </span>
              <div>
                <h3>Email</h3>
                <p className="muted break">{EMAIL}</p>
              </div>
            </div>
            <div className="actions">
              <a className="btn" href={`mailto:${EMAIL}`}>
                <FiExternalLink /> <span>Send Email</span>
              </a>
              <button
                className="btn ghost"
                onClick={() => copy(EMAIL, "email")}
                aria-label="Copy email"
              >
                {copied === "email" ? <FiCheck /> : <FiCopy />}{" "}
                <span>{copied === "email" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </article>

          {/* PHONE */}
          <article className="card reveal" style={{ animationDelay: "0.12s" }}>
            <div className="card-head">
              <span className="icon-wrap">
                <FiPhone />
              </span>
              <div>
                <h3>Phone</h3>
                <p className="muted">{PHONE_DISPLAY}</p>
              </div>
            </div>
            <div className="actions">
              <a className="btn" href={`tel:${PHONE_TEL}`}>
                <FiExternalLink /> <span>Call</span>
              </a>
              <button
                className="btn ghost"
                onClick={() => copy(PHONE_DISPLAY, "phone")}
                aria-label="Copy phone"
              >
                {copied === "phone" ? <FiCheck /> : <FiCopy />}{" "}
                <span>{copied === "phone" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </article>

          {/* LINKEDIN */}
          <article className="card reveal" style={{ animationDelay: "0.24s" }}>
            <div className="card-head">
              <span className="icon-wrap">
                <FiLinkedin />
              </span>
              <div>
                <h3>LinkedIn</h3>
                <p className="muted ellipsis">{LINKEDIN_URL}</p>
              </div>
            </div>
            <div className="actions">
              <a
                className="btn"
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiExternalLink /> <span>Open Profile</span>
              </a>
              <button
                className="btn ghost"
                onClick={() => copy(LINKEDIN_URL, "linkedin")}
                aria-label="Copy LinkedIn URL"
              >
                {copied === "linkedin" ? <FiCheck /> : <FiCopy />}{" "}
                <span>{copied === "linkedin" ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
