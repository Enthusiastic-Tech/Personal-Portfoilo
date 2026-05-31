import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Schooling (CBSE)</h4>
                <h5>Kendriya Vidyalaya</h5>
              </div>
              <h3>2022 - 2024</h3>
            </div>
            <p>
              Completed 10th grade at KV Tirumalagherry (91.50%) and 12th grade at KV NTPC Dadri (78.7%). Developing a strong early interest in engineering and programming.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>B.Tech. in CSE</h4>
                <h5>Gautam Buddha University</h5>
              </div>
              <h3>2024 - 2028</h3>
            </div>
            <p>
              Pursuing a Bachelor of Technology in Computer Science & Engineering. Focusing on Data Structures & Algorithms, Java, and emerging Generative AI/IoT systems.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Web Development Intern</h4>
                <h5>Gautam Buddha University</h5>
              </div>
              <h3>Jan - Apr 2025</h3>
            </div>
            <p>
              Developed a frontend prototype for the university placement portal and contributed to core CCC modules of the Samarth Portal.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Hackathons & Achievements</h4>
                <h5>Technical Contests</h5>
              </div>
              <h3>2024 - 2025</h3>
            </div>
            <p>
              Selected for the finals of SIH 2025 with SAFAR SATHI band. Won 2nd Place at Entrepreneur Hackathon 2024 with a PIR/ESP32 Smart Home. Participated in Ignition Hack 2025.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
