import React from 'react';
import './App.css'; // Make sure this import exists

function App() {
  // --- Mock Data ---
  const portfolioData = {
    name: "Alex Chen",
    title: "Creative Frontend Developer & UI/UX Enthusiast",
    bio: "Crafting beautiful, intuitive, and performant web experiences. Turning ideas into interactive digital realities.",
    projects: [
      { id: 1, title: "Project Aurora", description: "Interactive data visualization platform using D3.js and React.", tech: ["React", "D3.js", "Node.js"], link: "#" },
      { id: 2, title: "NeoShop", description: "Modern e-commerce site with a focus on animations and user experience.", tech: ["Vue", "GSAP", "Firebase"], link: "#" },
      { id: 3, title: "PixelPerfect", description: "A design system and component library built for scalability.", tech: ["React", "Styled Components", "Storybook"], link: "#" },
      { id: 4, title: "SynthWave Runner", description: "A simple browser game with retro aesthetics.", tech: ["JavaScript", "Canvas API"], link: "#" },
    ],
    skills: ["React", "JavaScript (ES6+)", "HTML5", "CSS3 / SASS", "Vite", "Node.js", "UI/UX Design", "Figma", "Git", "Responsive Design", "GSAP", "WebGL (Basic)"],
  };
  // --- End Mock Data ---

  return (
    <div className="portfolio-container">
      {/* ----- Hero Section ----- */}
      <section className="section hero-section">
        <div className="hero-content">
          <h1 className="hero-name">{portfolioData.name}</h1>
          <p className="hero-title">{portfolioData.title}</p>
          <p className="hero-bio">{portfolioData.bio}</p>
        </div>
        <div className="scroll-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </section>

      {/* ----- Projects Section ----- */}
      <section className="section projects-section">
        <h2 className="section-title">Featured Projects</h2>
        <div className="projects-grid">
          {portfolioData.projects.map((project) => (
            <a href={project.link} key={project.id} className="project-card" target="_blank" rel="noopener noreferrer">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tech">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ----- Skills Section ----- */}
      <section className="section skills-section">
        <h2 className="section-title">Skills & Technologies</h2>
        <div className="skills-cloud">
          {portfolioData.skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      </section>

       {/* ----- Footer/Contact Hint ----- */}
       <footer className="footer-hint">
        <p>Let's connect! [Your Contact Info/Link Here]</p>
      </footer>

    </div>
  );
}

export default App;