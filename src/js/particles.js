/**
 * Particles background animation
 */
class ParticlesBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouseX = 0;
        this.mouseY = 0;
        this.colors = ['#ffffff', '#f5f5f5', '#e0e0e0', '#d5d5d5'];

        this.init();
    }

    init() {
        // Setup canvas
        this.canvas.id = 'particles-canvas';
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.zIndex = '1';
        this.canvas.style.pointerEvents = 'none'; // Make sure it doesn't interfere with clicks

        const particlesContainer = document.getElementById('particles-js');
        particlesContainer.appendChild(this.canvas);

        // Set canvas size
        this.resizeCanvas();

        // Add event listeners
        window.addEventListener('resize', () => this.resizeCanvas());
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        });

        // Create particles
        this.createParticles();

        // Start animation
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Recreate particles when canvas is resized to ensure proper distribution
        this.createParticles();
    }

    createParticles() {
        this.particles = [];

        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: Math.random() * 1 - 0.5,
                speedY: Math.random() * 1 - 0.5,
                color: this.colors[Math.floor(Math.random() * this.colors.length)]
            });
        }
    }

    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;

            // Check if particles need to bounce off the edges
            if (particle.x > this.canvas.width || particle.x < 0) {
                particle.speedX *= -1;
            }

            if (particle.y > this.canvas.height || particle.y < 0) {
                particle.speedY *= -1;
            }

            // Draw connections between particles
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.5 - distance / 200})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });

            // Interactive effect with mouse
            const dx = particle.x - this.mouseX;
            const dy = particle.y - this.mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (100 - distance) / 100;

                particle.x += forceDirectionX * force;
                particle.y += forceDirectionY * force;
            }
        });
    }

    animate() {
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the particles background when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticlesBackground();
});