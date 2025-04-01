import React, { useEffect, useRef } from 'react';
import './App.css'; // Assuming your CSS is named App.css

// --- Data --- (Keep as is)
const portfolioData = {
    name: "Riccardo Mantelli",
    title: "Software Developer",
    bio: "Backend Developer specializing in C# and ASP.NET Core, crafting scalable and clean solutions. Let's connect and explore new opportunities!",
    skills: ["C#", "C", "SQL", "JS", ".NET", "ASP.NET Core", "SQL Server", "PostgreSQL", "Git", "Docker", "Design Patterns", "REST APIs", "Unit Testing", "Integration Testing"],
    contact: { email: "mantelli96@libero.it", github: "https://github.com/Buutyful", location: "Florence, Italy" }
};

// --- Icons (NOW WITH ACTUAL SVG CODE) ---
const MailIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24" // Example intrinsic size, CSS will override
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor" // Will inherit color from CSS
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="feather feather-mail" // Optional class for targeting if needed
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 98 96"
    fill="currentColor"
  >
    <path d="M49 .5C22 .5 0 22.9 0 49.9c0 21.9 14.2 40.6 33.8 47.2 2.5.5 3.4-1.1 3.4-2.5v-9c-13.7 3-16.7-5.8-16.7-5.8-2.3-5.8-5.8-7.3-5.8-7.3-4.7-3.3.4-3.2.4-3.2 5.1.3 7.8 5.3 7.8 5.3 4.6 7.8 12 5.5 14.9 4.2.5-3.3 1.8-5.5 3.3-6.7-11-1.3-22.5-5.5-22.5-24.5 0-5.5 2-10 5.2-13.5-.5-1.3-2.3-6.5.5-13.5 0 0 4.2-1.3 13.8 5.2 4-1.1 8.2-1.6 12.4-1.6 4.2 0 8.4.5 12.4 1.6 9.5-6.5 13.8-5.2 13.8-5.2 2.8 7 1 12.2.5 13.5 3.2 3.5 5.2 8 5.2 13.5 0 19.1-11.6 23.2-22.6 24.5 1.8 1.6 3.5 4.8 3.5 9.7v14.3c0 1.5 1 3 3.4 2.5C83.8 90.5 98 72 98 49.9 98 22.9 76 0.5 49 .5z" />
  </svg>
);



function App() {
    const canvasRef = useRef(null);
// --- Particle Effect Logic ---
useEffect(() => {
  const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let animationFrameId; let particlesArray = []; const mousePos = { x: undefined, y: undefined }; let resizeTimeout;
  const handleResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { if (!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); }, 150); };
  const handleMouseMove = (event) => { mousePos.x = event.clientX; mousePos.y = event.clientY; };
  const handleMouseOut = () => { mousePos.x = undefined; mousePos.y = undefined; };

  class Particle {
      constructor(x, y, size, color, weight) {
          this.x = x;
          this.y = y;
          this.size = size;
          this.color = color;
          this.weight = weight; // Weight influences mouse repulsion strength
          // this.baseX = x; // Keep base if needed for other effects, but not for return
          // this.baseY = y;
          this.density = (Math.random() * 15) + 1; // Reduced density range for mouse interaction

          // *** NEW: Add velocity for independent movement ***
          this.driftSpeed = 0.2; // Control overall slow drift speed - adjust this value!
          this.dx = (Math.random() - 0.5) * this.driftSpeed; // Random horizontal velocity (-0.1 to +0.1)
          this.dy = (Math.random() - 0.5) * this.driftSpeed; // Random vertical velocity (-0.1 to +0.1)
      }

      draw() {
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
          ctx.closePath();
          ctx.fill();
      }

      update() {
          let mousePushX = 0;
          let mousePushY = 0;

          // Calculate mouse repulsion force if mouse is present and close
          if (mousePos.x !== undefined && mousePos.y !== undefined) {
              let dxMouse = mousePos.x - this.x;
              let dyMouse = mousePos.y - this.y;
              let distance = Math.hypot(dxMouse, dyMouse);
              let maxDistance = 100; // Interaction radius (slightly increased)

              if (distance < maxDistance) {
                  let forceDirectionX = dxMouse / distance;
                  let forceDirectionY = dyMouse / distance;
                  let force = (maxDistance - distance) / maxDistance;
                  // Calculate the push amount based on density/weight
                  // Increase multiplier slightly if repulsion feels weak
                  mousePushX = forceDirectionX * force * this.density * 0.8;
                  mousePushY = forceDirectionY * force * this.density * 0.8;
              }
          }

          // *** Apply constant drift ***
          this.x += this.dx;
          this.y += this.dy;

          // *** Apply mouse push (subtract the calculated push) ***
          this.x -= mousePushX;
          this.y -= mousePushY;

          // *** Boundary Check (Wrapping) ***
          // If particle goes off left edge, wrap to right edge
          if (this.x + this.size < 0) {
              this.x = canvas.width + this.size;
          }
          // If particle goes off right edge, wrap to left edge
          else if (this.x - this.size > canvas.width) {
              this.x = 0 - this.size;
          }
          // If particle goes off top edge, wrap to bottom edge
          if (this.y + this.size < 0) {
              this.y = canvas.height + this.size;
          }
          // If particle goes off bottom edge, wrap to top edge
          else if (this.y - this.size > canvas.height) {
              this.y = 0 - this.size;
          }
      }

      
  }

  function initParticles() {
      particlesArray = [];
      const particleColors = ['rgba(0, 255, 255, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(255, 255, 255, 0.15)'];
      if (!canvas) return;
      const viewportArea = canvas.width * canvas.height;
      const particlesPerPixelRatio = Math.max(1, Math.min(8, 1 / (window.devicePixelRatio || 1))) * 6; // Adjusted density slightly
      const numParticlesRaw = viewportArea / (60 * 60) * particlesPerPixelRatio; // Slightly fewer particles maybe needed
      const numParticles = Math.max(60, Math.min(600, Math.floor(numParticlesRaw))); // Adjusted particle count range

      for(let i = 0; i < numParticles; i++){
          let size = (Math.random() * 5.0) + 1.0; // Keeping the bigger size
          let x = Math.random() * canvas.width;
          let y = Math.random() * canvas.height;
          let color = particleColors[Math.floor(Math.random() * particleColors.length)];
          let weight = (Math.random() * 1.0) + 0.5; // Adjusted weight range
          particlesArray.push(new Particle(x, y, size, color, weight));
      }
  }

  function animate() {
      if (!canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++){
          particlesArray[i].update();
          particlesArray[i].draw();
      }
      connectParticles(); // Keep connecting lines if desired
      animationFrameId = requestAnimationFrame(animate);
  }

  // Connect particles function remains the same
  function connectParticles(){
       let opacityValue = 1;
       for (let a = 0; a < particlesArray.length; a++){
           for (let b = a + 1; b < particlesArray.length; b++){
               let distance = Math.hypot(particlesArray[a].x - particlesArray[b].x, particlesArray[a].y - particlesArray[b].y);
               let maxLineDistance = 70; // Connection distance remains same
               if (distance < maxLineDistance){
                   opacityValue = 1 - (distance / maxLineDistance);
                   // Make lines slightly more visible if needed
                   ctx.strokeStyle = `rgba(100, 150, 255, ${opacityValue * 0.05})`; // Increased opacity multiplier
                   ctx.lineWidth = 0.2; // Line width remains same
                   ctx.beginPath();
                   ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                   ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                   ctx.stroke();
               }
           }
       }
  }

  handleResize();
  animate();
  window.addEventListener('resize', handleResize);
  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseout', handleMouseOut);
  return () => { window.removeEventListener('resize', handleResize); window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('mouseout', handleMouseOut); cancelAnimationFrame(animationFrameId); clearTimeout(resizeTimeout); }
}, []);

    return (
        <div className="portfolio-wrapper single-screen">
            <canvas ref={canvasRef} className="particle-canvas"></canvas>
            <div className="page-content">
                <main className="main-content-area">
                    {/* --- Main Info Block --- */}
                    <div className="main-info anim-fade-in">
                        <h1 className="main-name">{portfolioData.name}</h1>
                        <p className="main-title">{portfolioData.title}</p>
                        <p className="main-bio">{portfolioData.bio}</p>
                    </div>

                    {/* --- Skills Block (Professional Tag Cloud) --- */}
                    <div className="skills-block anim-fade-in" style={{ animationDelay: '0.4s' }}>                        
                        <div className="skills-cloud">
                            {portfolioData.skills.map((skill, index) => (
                                <span
                                    className="skill-tag"
                                    key={skill}
                                    style={{ '--skill-delay': `${index * 0.1}s` }} // Stagger delay
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div> {/* End skills-block */}

                </main>

                {/* --- Footer Area --- */}
               <footer className="footer-area">
                    <div className="contact-buttons anim-fade-in" style={{ animationDelay: '0.6s' }}>
                        <a href={`mailto:${portfolioData.contact.email}`} className="button primary glow-button compact-button">
                            <MailIcon /> <span>Email Me</span> {/* Icon Component Used */}
                        </a>
                        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="button secondary glow-button compact-button">
                            <GitHubIcon /> <span>GitHub</span> {/* Icon Component Used */}
                        </a>
                    </div>
                    <p className="copyright-info anim-fade-in" style={{ animationDelay: '0.8s' }}>
                        © {new Date().getFullYear()} {portfolioData.name} | Based in {portfolioData.contact.location}
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;