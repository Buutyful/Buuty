import React, { useEffect, useRef } from 'react';
import './App.css'; // Assuming your CSS is named App.css

// --- Data --- (Keep as is)
const portfolioData = {
    name: "Riccardo Mantelli",
    title: "Software Developer",
    bio: "Backend Developer specializing in C# and ASP.NET Core, crafting scalable and clean solutions. Let's connect and explore new opportunities!",
    skills: ["C#", ".NET", "ASP.NET Core", "SQL Server", "PostgreSQL", "Git", "Docker", "Design Patterns", "REST APIs", "Unit Testing", "Integration Testing"],
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
       // --- Particle Effect Logic ---
       useEffect(() => {
        const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); let animationFrameId; let particlesArray = []; const mousePos = { x: undefined, y: undefined }; let resizeTimeout; const handleResize = () => { clearTimeout(resizeTimeout); resizeTimeout = setTimeout(() => { if (!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; initParticles(); }, 150); }; const handleMouseMove = (event) => { mousePos.x = event.clientX; mousePos.y = event.clientY; }; const handleMouseOut = () => { mousePos.x = undefined; mousePos.y = undefined; }; class Particle { constructor(x, y, size, color, weight) { this.x = x; this.y = y; this.size = size; this.color = color; this.weight = weight; this.baseX = this.x; this.baseY = this.y; this.density = (Math.random() * 155) + 5; } draw() { ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.closePath(); ctx.fill(); } update() { if (mousePos.x !== undefined && mousePos.y !== undefined) { let dx = mousePos.x - this.x; let dy = mousePos.y - this.y; let distance = Math.hypot(dx, dy); let forceDirectionX = dx / distance; let forceDirectionY = dy / distance; let maxDistance = 80; let force = (maxDistance - distance) / maxDistance; if(distance < maxDistance) { let directionX = forceDirectionX * force * this.density * 0.6; let directionY = forceDirectionY * force * this.density * 0.6; this.x -= directionX; this.y -= directionY; } else { this.returnToBase(); } } else { this.returnToBase(); } } returnToBase() { if (this.x !== this.baseX) { this.x -= (this.x - this.baseX) / 20; } if (this.y !== this.baseY) { this.y -= (this.y - this.baseY) / 20; } } }
        function initParticles() {
            particlesArray = [];
            const particleColors = ['rgba(0, 255, 255, 0.3)', 'rgba(236, 72, 153, 0.3)', 'rgba(168, 85, 247, 0.3)', 'rgba(255, 255, 255, 0.15)'];
            if (!canvas) return;
            const viewportArea = canvas.width * canvas.height;
            // You might want to slightly decrease the number of particles if bigger ones feel too crowded
            const particlesPerPixelRatio = Math.max(1, Math.min(10, 1 / (window.devicePixelRatio || 1))) * 8;
            const numParticlesRaw = viewportArea / (50 * 50) * particlesPerPixelRatio;
            const numParticles = Math.max(80, Math.min(800, Math.floor(numParticlesRaw))); // Keep particle count same for now

            for(let i = 0; i < numParticles; i++){
                // ***** THIS LINE IS CHANGED *****
                let size = (Math.random() * 5.0) + 1.0; // New size range: 1.0 to almost 3.0
                // ********************************
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                let color = particleColors[Math.floor(Math.random() * particleColors.length)];
                let weight = Math.random() * 4.5 + 0.1; // Keep weight the same
                particlesArray.push(new Particle(x, y, size, color, weight));
            }
        }
        function animate() { if (!canvas) return; ctx.clearRect(0, 0, canvas.width, canvas.height); for (let i = 0; i < particlesArray.length; i++){ particlesArray[i].update(); particlesArray[i].draw(); } connectParticles(); animationFrameId = requestAnimationFrame(animate); } function connectParticles(){ let opacityValue = 1; for (let a = 0; a < particlesArray.length; a++){ for (let b = a + 1; b < particlesArray.length; b++){ let distance = Math.hypot(particlesArray[a].x - particlesArray[b].x, particlesArray[a].y - particlesArray[b].y); let maxLineDistance = 70; if (distance < maxLineDistance){ opacityValue = 1 - (distance / maxLineDistance); ctx.strokeStyle = `rgba(100, 150, 255, ${opacityValue * 0.03})`; ctx.lineWidth = 0.2; ctx.beginPath(); ctx.moveTo(particlesArray[a].x, particlesArray[a].y); ctx.lineTo(particlesArray[b].x, particlesArray[b].y); ctx.stroke(); } } } }
        handleResize(); animate();
        window.addEventListener('resize', handleResize); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('mouseout', handleMouseOut);
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