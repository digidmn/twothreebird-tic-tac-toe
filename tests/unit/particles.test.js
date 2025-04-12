import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

describe('ParticlesBackground', () => {
    let ParticlesBackground;
    let mockCanvas;
    let mockCtx;
    let mockParticlesContainer;

    beforeEach(async () => {
        // Setup mock canvas
        mockCtx = {
            clearRect: vi.fn(),
            beginPath: vi.fn(),
            arc: vi.fn(),
            fill: vi.fn(),
            stroke: vi.fn(),
            moveTo: vi.fn(),
            lineTo: vi.fn(),
            fillStyle: ''
        };

        mockCanvas = {
            id: '',
            width: 0,
            height: 0,
            style: {},
            getContext: vi.fn().mockReturnValue(mockCtx)
        };

        // Setup mock container
        mockParticlesContainer = {
            appendChild: vi.fn()
        };

        // Mock document.createElement
        global.document.createElement = vi.fn().mockImplementation((tag) => {
            if (tag === 'canvas') {
                return mockCanvas;
            }
            return {};
        });

        // Mock document.getElementById
        global.document.getElementById = vi.fn().mockImplementation((id) => {
            if (id === 'particles-js') {
                return mockParticlesContainer;
            }
            return null;
        });

        // Mock window methods
        global.window.addEventListener = vi.fn();
        global.document.addEventListener = vi.fn();
        global.window.requestAnimationFrame = vi.fn();

        // Mock window dimensions
        vi.stubGlobal('innerWidth', 1024);
        vi.stubGlobal('innerHeight', 768);

        // Import ParticlesBackground with mocks in place
        vi.resetModules();
        const module = await import('../../src/js/particles.js');
        ParticlesBackground = module.default;
    });

    afterEach(() => {
        vi.clearAllMocks();
        vi.unstubAllGlobals();
    });

    it('should create a canvas element and set its properties', () => {
        // Create instance
        const particles = new ParticlesBackground();

        // Check if canvas was created
        expect(document.createElement).toHaveBeenCalledWith('canvas');

        // Check if canvas properties were set
        expect(mockCanvas.id).toBe('particles-canvas');
        expect(mockCanvas.style.position).toBe('absolute');
        expect(mockCanvas.style.top).toBe('0');
        expect(mockCanvas.style.left).toBe('0');

        // Check if canvas was appended to container
        expect(mockParticlesContainer.appendChild).toHaveBeenCalledWith(mockCanvas);
    });

    it('should set up event listeners', () => {
        // Create instance
        const particles = new ParticlesBackground();

        // Check if event listeners were added
        expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
        expect(document.addEventListener).toHaveBeenCalledWith('mousemove', expect.any(Function));
    });

    it('should create particles', () => {
        // Create instance
        const particles = new ParticlesBackground();

        // Check particles array
        expect(Array.isArray(particles.particles)).toBe(true);
        expect(particles.particles.length).toBe(particles.particleCount);

        // Check first particle
        const particle = particles.particles[0];
        expect(typeof particle.x).toBe('number');
        expect(typeof particle.y).toBe('number');
        expect(typeof particle.size).toBe('number');
        expect(typeof particle.speedX).toBe('number');
        expect(typeof particle.speedY).toBe('number');
        expect(typeof particle.color).toBe('string');
    });

    it('should resize canvas to match window dimensions', () => {
        // Create instance and reset mocks for clean tracking
        const particles = new ParticlesBackground();

        // Check canvas dimensions
        expect(mockCanvas.width).toBe(1024);
        expect(mockCanvas.height).toBe(768);
    });

    it('should start animation loop', () => {
        // Create instance
        const particles = new ParticlesBackground();

        // Check if animation frame was requested
        expect(window.requestAnimationFrame).toHaveBeenCalled();
    });
});