import Navbar from "../components/Navbar";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import { useState } from "react";

import "../styles/contact.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_fwiwqd7",

        "YOUR_TEMPLATE_ID",

        {
          from_name: formData.name,

          from_email: formData.email,

          message: formData.message,
        },

        "g9pQ7D_5UiurOgvip",
      )

      .then(() => {
        alert("Message sent successfully");

        setFormData({
          name: "",
          email: "",
          message: "",
        });
      })

      .catch(() => {
        alert("Failed to send");
      });
  };

  return (
    <>
      <Navbar />

      <div className="contactPage">
        <h1>Let's Build Something Amazing</h1>

        <p>Have ideas, questions, or collaboration opportunities?</p>

        <div className="contactContainer">
          <div className="contactInfo">
            <h2>Contact Information</h2>

            <div className="infoCard">
              <FaEnvelope />

              <a href="mailto:kaifbhati58@gmail.com">kaifbhati58@gmail.com</a>
            </div>

            <div className="infoCard">
              <FaLinkedin />

              <a
                href="https://www.linkedin.com/in/mohammedkaif02/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
            </div>

            <div className="infoCard">
              <FaGithub />

              <a
                href="https://github.com/kaif227"
                target="_blank"
                rel="noreferrer"
              >
                Github
              </a>
            </div>
          </div>

          <form className="contactForm" onSubmit={sendEmail}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
            />

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Contact;
