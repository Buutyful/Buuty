import React, { useEffect, useRef, useCallback } from 'react';
import './App.css';

// --- Portfolio Data (Integrated) ---
const portfolioData = {
    name: "Riccardo Mantelli",
    title: "Software Developer",
    bio: "Backend Developer specializing in C# and ASP.NET Core, crafting scalable and clean solutions. Passionate about robust architecture and elegant code. Let's connect!",
    skills: {
        "Core Languages": ["C#", "SQL", "JavaScript", "C"],
        "Frameworks & Platforms": [".NET", "ASP.NET Core", "React"],
        "Databases": ["SQL Server", "PostgreSQL", "SQLite", "Redis", "MongoDB", "Azure Tables", "MinIO", "AWS S3"],
        "DevOps & Tools": ["Git", "Docker"], 
        "Methodologies & Concepts": ["SOLID", "Design Patterns", "DSA", "REST APIs", "Unit Testing", "Integration Testing", "DDD", "Clean Architecture"], 
    },
    contact: {
        email: "mantelli96@libero.it",
        github: "https://github.com/Buutyful",
        linkedin: "https://www.linkedin.com/in/riccardo-mantelli-343662211/",
        location: "Florence, Italy"
    }
};

//  skill category colors here for easy access
const skillCategoryStyles = {
    "Core Languages": { color: "hsl(195, 75%, 60%)", bg: "hsla(195, 75%, 60%, 0.15)" },
    "Frameworks & Platforms": { color: "hsl(265, 75%, 65%)", bg: "hsla(265, 75%, 65%, 0.15)" },
    "Databases": { color: "hsl(340, 80%, 65%)", bg: "hsla(340, 80%, 65%, 0.15)" },
    "DevOps & Tools": { color: "hsl(145, 65%, 55%)", bg: "hsla(145, 65%, 55%, 0.15)" },
    "Methodologies & Concepts": { color: "hsl(215, 70%, 60%)", bg: "hsla(215, 70%, 60%, 0.15)" },
    "default": { color: "hsl(0, 0%, 80%)", bg: "hsla(0, 0%, 80%, 0.1)" }
};


// --- Icons (Integrated) ---
const MailIcon = ({ className = "", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`icon icon-mail ${className}`} {...props}>
        {/* 1. This path draws the rectangular envelope body */}
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>

        {/* 2. THIS POLYLINE DRAWS THE V-SHAPED FLAP */}
        <polyline points="22,6 12,13 2,6"></polyline>
    </svg>
);
const GitHubIcon = ({ className = "", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 98 96" fill="currentColor" className={`icon icon-github ${className}`} {...props}>
        <path d="M49 .5C22 .5 0 22.9 0 49.9c0 21.9 14.2 40.6 33.8 47.2 2.5.5 3.4-1.1 3.4-2.5v-9c-13.7 3-16.7-5.8-16.7-5.8-2.3-5.8-5.8-7.3-5.8-7.3-4.7-3.3.4-3.2.4-3.2 5.1.3 7.8 5.3 7.8 5.3 4.6 7.8 12 5.5 14.9 4.2.5-3.3 1.8-5.5 3.3-6.7-11-1.3-22.5-5.5-22.5-24.5 0-5.5 2-10 5.2-13.5-.5-1.3-2.3-6.5.5-13.5 0 0 4.2-1.3 13.8 5.2 4-1.1 8.2-1.6 12.4-1.6 4.2 0 8.4.5 12.4 1.6 9.5-6.5 13.8-5.2 13.8-5.2 2.8 7 1 12.2.5 13.5 3.2 3.5 5.2 8 5.2 13.5 0 19.1-11.6 23.2-22.6 24.5 1.8 1.6 3.5 4.8 3.5 9.7v14.3c0 1.5 1 3 3.4 2.5C83.8 90.5 98 72 98 49.9 98 22.9 76 0.5 49 .5z" />
    </svg>
);

const LinkedInIcon = ({ className = "", ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={`icon icon-linkedin ${className}`} {...props}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
);


// --- Sub-Components (Defined in App.jsx) ---

const Header = ({ name, title, bio }) => (
    <header className="header-info" role="banner">
        <h1 className="name">{name}</h1>
        <p className="title">{title}</p>
        <p className="bio">{bio}</p>
    </header>
);

const SkillsSection = ({ skills }) => (
    <section className="skills-section" aria-labelledby="skills-heading">        
        <div className="skills-grid">
            {Object.entries(skills).map(([category, skillList]) => {
                 const categoryStyle = skillCategoryStyles[category] || skillCategoryStyles.default;
                 return (
                     <div key={category} className="skill-category">
                         <h3
                             className="category-title"
                             style={{ borderBottomColor: categoryStyle.color }}
                         >
                             {category}
                         </h3>
                         <ul className="skills-list">
                             {skillList.map((skill, index) => (
                                 <li
                                     className="skill-tag"
                                     key={skill}
                                     style={{
                                         '--skill-delay': `${index * 0.05}s`,
                                         '--skill-bg-color': categoryStyle.bg,
                                         '--skill-border-color': categoryStyle.color,
                                     }}
                                 >
                                     {skill}
                                 </li>
                             ))}
                         </ul>
                     </div>
                 );
                 })}
        </div>
    </section>
);

const ContactFooter = ({ contact, name }) => (
    <footer className="footer" role="contentinfo">
        <div className="contact-links">
            <a
                href={`mailto:${contact.email}`}
                className="contact-button email"
                aria-label="Send an Email"
            >
                <MailIcon />
                <span>Contact</span>
            </a>
            <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-button github"
                aria-label="View GitHub Profile"
            >
                <GitHubIcon />
                <span>GitHub</span>
            </a>
            {contact.linkedin && (
                <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-button linkedin"
                    aria-label="View LinkedIn Profile"
                >
                    <LinkedInIcon />
                    <span>LinkedIn</span>
                </a>
            )}
        </div>
        <p className="copyright">
            © {new Date().getFullYear()} {name}
            {contact.location && ` | ${contact.location}`}
        </p>
    </footer>
);

// --- Particle Canvas Component (Integrated) ---
const ParticleCanvas = () => {
    const canvasRef = useRef(null);
    const animationFrameId = useRef(null);
    const particlesArray = useRef([]);
    const mousePos = useRef({ x: undefined, y: undefined });
    const resizeTimeout = useRef(null);

    const handleMouseMove = useCallback((event) => {
        mousePos.current.x = event.clientX;
        mousePos.current.y = event.clientY;
    }, []);

    const handleMouseOut = useCallback(() => {
        mousePos.current.x = undefined;
        mousePos.current.y = undefined;
    }, []);

    class Particle {
         constructor(x, y, size, color, weight, canvasWidth, canvasHeight) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.baseColor = color; // Store the base HSL(A) string
            this.weight = weight;
            this.density = (Math.random() * 25) + 2;
            this.baseDriftSpeed = 0.15;
            this.dx = (Math.random() - 0.5) * this.baseDriftSpeed;
            this.dy = (Math.random() - 0.5) * this.baseDriftSpeed;
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            // Extract base alpha from hsla string, default to 0.5 if not present
            const alphaMatch = this.baseColor.match(/hsla?\([^,]+,[^,]+,[^,]+,?\s*([0-9.]+)\s*\)/);
            this.baseAlpha = alphaMatch ? parseFloat(alphaMatch[1]) : 0.5;
            this.currentAlpha = this.baseAlpha;
            // Extract HSL values for potential color manipulation later (optional)
            const hslMatch = this.baseColor.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%/);
            this.hue = hslMatch ? parseInt(hslMatch[1]) : 0;
            this.saturation = hslMatch ? parseFloat(hslMatch[2]) : 0;
            this.lightness = hslMatch ? parseFloat(hslMatch[3]) : 0;
        }

        draw(ctx) {
             let distance = Infinity;
             if (mousePos.current.x !== undefined) {
                 distance = Math.hypot(mousePos.current.x - this.x, mousePos.current.y - this.y);
             }
             const fadeRadius = 180; // Slightly larger interaction radius for visibility fade
             // Fade out alpha when mouse is close, ensure it doesn't exceed baseAlpha
             this.currentAlpha = Math.min(this.baseAlpha, this.baseAlpha * (distance / fadeRadius));

             ctx.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.currentAlpha})`;
             ctx.beginPath();
             ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
             ctx.closePath();
             ctx.fill();
        }

        update() {
            let mousePushX = 0;
            let mousePushY = 0;
            const interactionRadius = 110; // Radius mouse interacts (push effect)

            if (mousePos.current.x !== undefined && mousePos.current.y !== undefined) {
                let dxMouse = this.x - mousePos.current.x;
                let dyMouse = this.y - mousePos.current.y;
                let distance = Math.hypot(dxMouse, dyMouse);

                if (distance > 0 && distance < interactionRadius) { // Check distance > 0
                    let forceDirectionX = dxMouse / distance;
                    let forceDirectionY = dyMouse / distance;
                    let force = (interactionRadius - distance) / interactionRadius * this.density * 0.15; // Slightly increased force
                    mousePushX = forceDirectionX * force;
                    mousePushY = forceDirectionY * force;
                }
            }

            this.x += this.dx + mousePushX;
            this.y += this.dy + mousePushY;

            // Boundary checks (Wrap around)
            if (this.x + this.size < 0) this.x = this.canvasWidth + this.size;
            else if (this.x - this.size > this.canvasWidth) this.x = 0 - this.size;
            if (this.y + this.size < 0) this.y = this.canvasHeight + this.size;
            else if (this.y - this.size > this.canvasHeight) this.y = 0 - this.size;
        }
    }


    const initParticles = useCallback((canvas) => {
        if (!canvas) return;
        particlesArray.current = [];
        const particleColors = [
            'hsla(195, 80%, 70%, 0.35)',
            'hsla(280, 70%, 75%, 0.35)',
            'hsla(30, 80%, 70%, 0.25)',
            'hsla(0, 0%, 90%, 0.20)',
        ];
         const particleDensityFactor = 12000; // Lower value = more particles
        const numParticles = Math.floor((canvas.width * canvas.height) / particleDensityFactor);
        const minParticles = 80;
        const maxParticles = 300;
        const clampedParticles = Math.max(minParticles, Math.min(maxParticles, numParticles));


        for (let i = 0; i < clampedParticles; i++) {
            let size = Math.random() * 2.5 + 0.5; // Keep particles small
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let color = particleColors[Math.floor(Math.random() * particleColors.length)];
            let weight = Math.random() * 1.0 + 0.5;
            particlesArray.current.push(new Particle(x, y, size, color, weight, canvas.width, canvas.height));
        }
    }, []);


     const connectParticles = useCallback((ctx, canvasWidth) => {
         let maxConnectDistance = Math.min(100, canvasWidth * 0.09); // Max distance particles connect
         const baseLineOpacity = 0.4; // Base opacity for lines

         for (let a = 0; a < particlesArray.current.length; a++) {
             for (let b = a + 1; b < particlesArray.current.length; b++) {
                 const pa = particlesArray.current[a];
                 const pb = particlesArray.current[b];
                 let distance = Math.hypot(pa.x - pb.x, pa.y - pb.y);

                 if (distance < maxConnectDistance) {
                     // Calculate line opacity based on distance and the alpha of the connected particles
                     const distanceFactor = 1 - (distance / maxConnectDistance);
                     // Consider the lesser alpha of the two particles for connection visibility
                     const alphaFactor = Math.min(pa.currentAlpha / pa.baseAlpha, pb.currentAlpha / pb.baseAlpha);
                     const opacity = baseLineOpacity * distanceFactor * alphaFactor;

                     if (opacity > 0.01) { // Only draw if opacity is noticeable
                       ctx.strokeStyle = `hsla(210, 50%, 80%, ${opacity})`; // Cool white/blue lines
                       ctx.lineWidth = 0.6; // Slightly thicker lines
                       ctx.beginPath();
                       ctx.moveTo(pa.x, pa.y);
                       ctx.lineTo(pb.x, pb.y);
                       ctx.stroke();
                     }
                 }
             }
         }
     }, []); // No external dependencies other than the ref


    const animate = useCallback((ctx, canvasWidth, canvasHeight) => {
        if (!ctx) return;
         ctx.clearRect(0, 0, canvasWidth, canvasHeight);
         particlesArray.current.forEach(particle => {
             particle.update();
             particle.draw(ctx);
         });
         connectParticles(ctx, canvasWidth);
         animationFrameId.current = requestAnimationFrame(() => animate(ctx, canvasWidth, canvasHeight));
     }, [connectParticles]);


    const handleResize = useCallback(() => {
        clearTimeout(resizeTimeout.current);
        resizeTimeout.current = setTimeout(() => {
            const canvas = canvasRef.current;
            if (!canvas) return;

            const isSmallScreen = window.innerWidth < 768;
             if (canvas.style.display === 'none' && isSmallScreen) {
                 return; // Already hidden and still small, do nothing
             }

            canvas.style.display = isSmallScreen ? 'none' : 'block';
            cancelAnimationFrame(animationFrameId.current); // Stop animation during resize prep
             animationFrameId.current = null;

            if(isSmallScreen) {
                 particlesArray.current = []; // Clear particles on small screens to save memory
                return;
            }

            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            const ctx = canvas.getContext('2d');
            if (ctx) {
                 initParticles(canvas);
                 // Ensure particles know the new bounds immediately after init
                 particlesArray.current.forEach(p => {
                    p.canvasWidth = canvas.width;
                    p.canvasHeight = canvas.height;
                 });
                 // Use a minimal delay before restarting animation to allow canvas to redraw cleanly
                 setTimeout(() => {
                    if(canvasRef.current) { // Check if component is still mounted
                        animate(ctx, canvas.width, canvas.height);
                    }
                 }, 0);
            }

        }, 200); // Increased debounce time slightly
    }, [initParticles, animate]);


    useEffect(() => {
        const canvas = canvasRef.current;
        let ctx = null;

         // Initial setup based on screen size
        if (window.innerWidth < 5) {
             canvas.style.display = "none";
         } else {
             canvas.width = window.innerWidth;
             canvas.height = window.innerHeight;
             ctx = canvas.getContext('2d');
             if (ctx) {
                 initParticles(canvas);
                 animate(ctx, canvas.width, canvas.height);
             }
         }


        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId.current);
            clearTimeout(resizeTimeout.current);
        };
    }, [handleResize, handleMouseMove, handleMouseOut, initParticles, animate]); // Add stable callbacks

    return <canvas ref={canvasRef} id="particle-canvas-main"></canvas>; // Added an ID for easier targeting
};

// --- Main App Component ---
function App() {
    return (
        <div className="portfolio-container">
            <ParticleCanvas /> {/* Particle effect */}

            {/* Content Wrapper */}
            <div className="content-wrapper">
                <Header
                    name={portfolioData.name}
                    title={portfolioData.title}
                    bio={portfolioData.bio}
                />

                <main className="main-content">
                    <SkillsSection skills={portfolioData.skills} />
                    {/* Potential future sections: Projects, Experience */}
                </main>

                <ContactFooter
                     contact={portfolioData.contact}
                     name={portfolioData.name}
                 />
            </div>
        </div>
    );
}

export default App;