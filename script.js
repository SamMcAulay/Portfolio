// Colors and fonts
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'theme-dark': '#121212',
                'theme-surface': '#1E1E1E',
                'theme-sand': '#E3D5CA',
                'theme-pink': '#E94560',
                'theme-pink-hover': '#c22f48',
            },
            fontFamily: {
                'mono': ['Courier New', 'Courier', 'monospace'], 
            }
        }
    }
}

// Start
document.addEventListener('DOMContentLoaded', () => {
    // ASCII Globe
    const canvas = document.getElementById('matrixCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;

        const resizeCanvas = () => {
            width = canvas.parentElement.clientWidth;
            height = canvas.parentElement.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let rotation = 0;
        let tilt = 0;
        let isDragging = false;
        let lastX = 0;
        let lastY = 0;

        // Set cursor
        canvas.parentElement.style.cursor = 'grab';

        // Mouse input
        canvas.parentElement.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            canvas.parentElement.style.cursor = 'grabbing';
        });

        window.addEventListener('mouseup', () => {
            isDragging = false;
            canvas.parentElement.style.cursor = 'grab';
        });

        window.addEventListener('mousemove', (e) => {
            if (isDragging) {
                const dx = e.clientX - lastX;
                const dy = e.clientY - lastY;
                
                rotation += dx * 0.004;
                tilt -= dy * 0.004;
                
                lastX = e.clientX;
                lastY = e.clientY;
            }
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const r = Math.min(width, height) * 0.35;
            const cx = width / 2;
            const cy = height / 2;

            if (!isDragging) rotation -= 0.002;

            const chars = "01"; 

            // Draw globe
            for (let lat = -Math.PI/2; lat <= Math.PI/2; lat += 0.1) {
                const rRing = r * Math.cos(lat);
                const yRing = r * Math.sin(lat);
                const circumference = 2 * Math.PI * rRing;
                const charCount = Math.floor(circumference / 10);

                if (charCount < 1) continue;

                for (let i = 0; i < charCount; i++) {
                    const lon = (i / charCount) * Math.PI * 2;
                    
                    // Fix longitude
                    let nLon = lon;
                    if (nLon > Math.PI) nLon -= 2 * Math.PI;

                    // Earth map
                    let isLand = false;
                    let isIreland = false;
                    
                    // Rough edges
                    const noise = Math.sin(nLon * 10) * 0.05 + Math.cos(lat * 10) * 0.05;

                    // Ireland Highlight (Approx 53N, 8W -> Lat -0.93, Lon -0.14)
                    if (Math.hypot(lat + 0.93, nLon + 0.14) < 0.05) {
                        isLand = true;
                        isIreland = true;
                    }

                    // Antarctica (South)
                    if (lat > 1.3 + noise) isLand = true;
                    
                    // Greenland
                    if (Math.hypot(lat + 1.1, nLon + 0.7) < 0.2 + noise) isLand = true;

                    // North America
                    if (Math.hypot(lat + 0.7, nLon + 1.7) < 0.6 + noise) isLand = true;

                    // South America
                    if (Math.hypot(lat - 0.3, nLon + 1.0) < 0.45 + noise) isLand = true;
                    
                    // Europe
                    if (Math.hypot(lat + 0.8, nLon - 0.3) < 0.35 + noise) isLand = true; 
                    
                    // Africa
                    if (Math.hypot(lat - 0.2, nLon - 0.3) < 0.55 + noise) isLand = true; 
                    
                    // Asia
                    if (Math.hypot(lat + 0.6, nLon - 1.6) < 0.75 + noise) isLand = true;
                    
                    // Australia
                    if (Math.hypot(lat - 0.5, nLon - 2.3) < 0.3 + noise) isLand = true;
                    
                    // 3D math
                    let x = rRing * Math.sin(lon + rotation);
                    let z = rRing * Math.cos(lon + rotation);
                    let y = yRing;

                    // Pitch (Rotate around X-axis)
                    let yRot = y * Math.cos(tilt) - z * Math.sin(tilt);
                    let zRot = y * Math.sin(tilt) + z * Math.cos(tilt);
                    y = yRot;
                    z = zRot;

                    // Draw front
                    if (z > -r/2) {
                        const scale = (z + r * 2) / (r * 3);
                        const alpha = (z + r) / (2 * r);
                        
                        // Land vs Ocean
                        const charIndex = Math.floor(Math.abs(lat * 10 + lon * 5) % chars.length);
                        const char = isLand ? chars[charIndex] : '.';

                        ctx.font = `${10 * scale + 2}px monospace`;
                        
                        if (isLand) {
                            if (isIreland) {
                                ctx.fillStyle = '#4ADE80'; // Bright Green Highlight
                                ctx.globalAlpha = 1.0;
                            } else {
                                ctx.fillStyle = z > 0 ? '#E94560' : '#E3D5CA'; 
                                ctx.globalAlpha = Math.max(0.1, alpha);
                            }
                        } else {
                            ctx.fillStyle = '#E3D5CA';
                            ctx.globalAlpha = Math.max(0.05, alpha * 0.2);
                        }
                        
                        ctx.fillText(char, cx + x, cy + y);
                    }
                }
            }
            ctx.globalAlpha = 1.0;
            requestAnimationFrame(animate);
        }
        animate();
    }

    // Background stars
    const bgCanvas = document.getElementById('parallax-bg');
    if (bgCanvas) {
        const bgCtx = bgCanvas.getContext('2d');
        let width, height;
        let particles = [];
        
        const connectionDistance = 150;
        const moveSpeed = 0.2;

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.vx = (Math.random() - 0.5) * moveSpeed;
                this.vy = (Math.random() - 0.5) * moveSpeed;
                this.size = Math.random() * 2 + 1;
            }

            update() {
                this.x += this.vx;
                this.y += this.vy;

                // Bounce
                if (this.x < 0 || this.x > width) this.vx *= -1;
                if (this.y < 0 || this.y > height) this.vy *= -1;
            }

            draw() {
                bgCtx.fillStyle = 'rgba(233, 69, 96, 0.6)';
                bgCtx.beginPath();
                bgCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                bgCtx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            // Scale node count based on screen area (approx 150 nodes for 1440p)
            const particleCount = Math.floor((width * height) / 25000);
            const count = Math.max(25, particleCount);

            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };

        const resizeBg = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            bgCanvas.width = width;
            bgCanvas.height = height;
            initParticles();
        };
        
        window.addEventListener('resize', resizeBg);
        resizeBg();

        function animateConstellation() {
            bgCtx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < connectionDistance) {
                        bgCtx.beginPath();
                        bgCtx.strokeStyle = `rgba(227, 213, 202, ${0.4 * (1 - dist / connectionDistance)})`;
                        bgCtx.lineWidth = 1;
                        bgCtx.moveTo(particles[i].x, particles[i].y);
                        bgCtx.lineTo(particles[j].x, particles[j].y);
                        bgCtx.stroke();
                    }
                }
            }
            requestAnimationFrame(animateConstellation);
        }
        
        animateConstellation();
    }

    // Tech orbit
    const techSection = document.getElementById('tech');
    const orbitContainer = document.getElementById('tech-orbit');
    if (techSection && orbitContainer) {
        const icons = Array.from(orbitContainer.querySelectorAll('.tech-icon'));
        
        // Ring settings
        const ring = { speed: 0.001, tilt: 10 * (Math.PI / 180), slope: -5 * (Math.PI / 180) };

        const totalIcons = icons.length;
        const angleStep = (Math.PI * 2) / totalIcons;

        icons.forEach((icon, index) => {
            icon.dataset.angle = index * angleStep;
            icon.style.position = 'absolute';
            icon.style.left = '50%';
            icon.style.top = '50%';
        });

        let width = techSection.clientWidth;
        let height = techSection.clientHeight;
        let radius = Math.min(width, height) * 0.7;

        window.addEventListener('resize', () => {
            width = techSection.clientWidth;
            height = techSection.clientHeight;
            radius = Math.min(width, height) * 0.45;
        });

        function animateTech() {
            const cx = width / 2;
            const cy = height / 2;

            icons.forEach(item => {
                let angle = parseFloat(item.dataset.angle);
                angle += ring.speed;
                item.dataset.angle = angle;

                // 3D position
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                const y = 0;

                // Tilt
                let yRot = y * Math.cos(ring.tilt) - z * Math.sin(ring.tilt);
                const zRot = y * Math.sin(ring.tilt) + z * Math.cos(ring.tilt);

                // Slope
                const xRot = x * Math.cos(ring.slope) - yRot * Math.sin(ring.slope);
                yRot = x * Math.sin(ring.slope) + yRot * Math.cos(ring.slope);

                // 3D to 2D
                const perspective = 1000;
                const scale = perspective / (perspective + zRot);
                
                const x2d = cx + xRot * scale;
                const y2d = cy + yRot * scale;

                item.style.transform = `translate(-50%, -50%) translate3d(${x2d - cx}px, ${y2d - cy}px, 0) scale(${scale})`;
                
                // Layering
                if (zRot > 0) {
                    item.style.zIndex = Math.floor(scale * 19); 
                    item.style.opacity = Math.max(0.3, 1 - (zRot / radius));
                } else {
                    item.style.zIndex = 21 + Math.floor((scale - 1) * 20);
                    item.style.opacity = 1;
                }
                
                // Glow (Reduced)
                item.style.filter = `brightness(${scale}) drop-shadow(0 0 ${scale}px rgba(233,69,96,${(scale - 0.5) * 0.15}))`;
            });

            requestAnimationFrame(animateTech);
        }
        animateTech();
    }
});
