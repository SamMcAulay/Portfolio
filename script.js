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
        let mouseX = 0;
        let mouseY = 0;

        // Mouse input
        canvas.parentElement.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouseX = (e.clientX - rect.left - width/2) / (width/2);
            mouseY = (e.clientY - rect.top - height/2) / (height/2);
        });

        canvas.parentElement.addEventListener('mouseleave', () => {
            mouseX = 0;
            mouseY = 0;
        });

        function animate() {
            ctx.clearRect(0, 0, width, height);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            
            const r = Math.min(width, height) * 0.35;
            const cx = width / 2;
            const cy = height / 2;

            rotation += 0.005 + (mouseX * 0.02);
            tilt += ((mouseY * 0.5 + 0.3) - tilt) * 0.1;

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
                    
                    // Rough edges
                    const noise = Math.sin(nLon * 4 + lat * 4) * 0.15 + Math.sin(lat * 10) * 0.05;

                    // Antarctica
                    if (lat < -1.3 + noise) isLand = true;
                    
                    // Americas
                    if (Math.hypot(lat - 0.8, nLon + 1.7) < 0.6 + noise) isLand = true; // NA
                    if (Math.hypot(lat + 0.4, nLon + 1.0) < 0.5 + noise) isLand = true; // SA
                    
                    // Europe / Africa
                    if (Math.hypot(lat - 0.1, nLon - 0.3) < 0.6 + noise) isLand = true; // Africa
                    if (Math.hypot(lat - 0.9, nLon - 0.3) < 0.35 + noise) isLand = true; // Europe
                    
                    // Asia
                    if (Math.hypot(lat - 0.8, nLon - 1.5) < 0.8 + noise) isLand = true;
                    
                    // Australia
                    if (Math.hypot(lat + 0.5, nLon - 2.3) < 0.3 + noise) isLand = true;
                    
                    // 3D math
                    let x = rRing * Math.cos(lon + rotation);
                    let z = rRing * Math.sin(lon + rotation);
                    let y = yRing;

                    // Tilt
                    let xRot = x * Math.cos(tilt) - y * Math.sin(tilt);
                    let yRot = x * Math.sin(tilt) + y * Math.cos(tilt);
                    x = xRot;
                    y = yRot;

                    // Draw front
                    if (z > -r/2) {
                        const scale = (z + r * 2) / (r * 3);
                        const alpha = (z + r) / (2 * r);
                        
                        // Land vs Ocean
                        const charIndex = Math.floor(Math.abs(lat * 10 + lon * 5) % chars.length);
                        const char = isLand ? chars[charIndex] : '.';

                        ctx.font = `${10 * scale + 2}px monospace`;
                        
                        if (isLand) {
                            ctx.fillStyle = z > 0 ? '#E94560' : '#E3D5CA'; 
                            ctx.globalAlpha = Math.max(0.1, alpha);
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
        
        const particleCount = 150;
        const connectionDistance = 150;
        const moveSpeed = 0.2;

        const resizeBg = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            bgCanvas.width = width;
            bgCanvas.height = height;
        };
        
        window.addEventListener('resize', resizeBg);
        resizeBg();

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

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

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
        const ring = { radius: 550, speed: 0.001, tilt: 10 * (Math.PI / 180), slope: -5 * (Math.PI / 180) };

        const totalIcons = icons.length;
        const angleStep = (Math.PI * 2) / totalIcons;

        icons.forEach((icon, index) => {
            icon.dataset.angle = index * angleStep;
        });

        let width = techSection.clientWidth;
        let height = techSection.clientHeight;

        window.addEventListener('resize', () => {
            width = techSection.clientWidth;
            height = techSection.clientHeight;
        });

        function animateTech() {
            const cx = width / 2;
            const cy = height / 2;

            icons.forEach(item => {
                let angle = parseFloat(item.dataset.angle);
                angle += ring.speed;
                item.dataset.angle = angle;

                // 3D position
                const x = Math.cos(angle) * ring.radius;
                const z = Math.sin(angle) * ring.radius;
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
                    item.style.opacity = Math.max(0.3, 1 - (zRot / ring.radius));
                } else {
                    item.style.zIndex = 21 + Math.floor((scale - 1) * 20);
                    item.style.opacity = 1;
                }
                
                // Glow
                item.style.filter = `brightness(${scale}) drop-shadow(0 0 ${scale * 2}px rgba(233,69,96,${(scale - 0.5) * 0.4}))`;
            });

            requestAnimationFrame(animateTech);
        }
        animateTech();
    }
});
