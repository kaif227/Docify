import "./../styles/features.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

function FeaturesSection() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
  }, []);

  return (
    <div className="featureContainer">
      <h1>What Docify Can Do</h1>

      <div className="featureGrid">
        <div data-aos="fade-up" className="featureCard">
          <h2>Generate Documents</h2>

          <p>Generate thousands of Word documents within seconds.</p>
        </div>

        <div data-aos="zoom-in" className="featureCard">
          <h2>AI Extraction</h2>

          <p>Automatically extract values from descriptions.</p>
        </div>

        <div data-aos="fade-left" className="featureCard">
          <h2>Bulk Processing</h2>

          <p>Generate and ZIP 1000+ files instantly.</p>
        </div>

        <div data-aos="flip-left" className="featureCard">
          <h2>Cloud Ready</h2>

          <p>Future support for storage and history.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesSection;
