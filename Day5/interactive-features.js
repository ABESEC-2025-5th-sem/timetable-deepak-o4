// Interactive Grid Features JavaScript
class InteractiveGrid {
    constructor() {
        this.isInitialized = false;
        this.currentLayout = 'default';
        this.animationMode = 'none';
        this.colorScheme = 'default';
        this.stats = {
            clicks: 0,
            hovers: 0,
            animations: 0,
            particles: 0
        };
        this.init();
    }

    init() {
        if (this.isInitialized) return;
        
        this.createColorPalette();
        this.createControlPanel();
        this.createStatsPanel();
        this.createParticleSystem();
        this.addMouseTrail();
        this.bindEvents();
        this.addRippleEffect();
        this.startStatsUpdate();
        
        this.isInitialized = true;
        console.log('🎨 Interactive Grid Features Loaded!');
    }

    createColorPalette() {
        const palette = document.createElement('div');
        palette.className = 'color-palette';
        
        const colors = [
            { name: 'default', color: '#04AA6D' },
            { name: 'sunset', color: '#ff6b6b' },
            { name: 'ocean', color: '#4ecdc4' },
            { name: 'purple', color: '#a8e6cf' },
            { name: 'gold', color: '#ffd93d' },
            { name: 'rose', color: '#ff8a95' }
        ];

        colors.forEach((colorScheme, index) => {
            const colorOption = document.createElement('div');
            colorOption.className = `color-option ${index === 0 ? 'active' : ''}`;
            colorOption.style.background = colorScheme.color;
            colorOption.dataset.scheme = colorScheme.name;
            colorOption.title = `${colorScheme.name} theme`;
            
            palette.appendChild(colorOption);
        });

        document.body.appendChild(palette);
    }

    createControlPanel() {
        const panel = document.createElement('div');
        panel.className = 'control-panel';
        panel.innerHTML = `
            <h3>🎛️ Grid Controls</h3>
            
            <div class="control-group">
                <label>Animation Mode:</label>
                <select id="animationMode" style="width: 150px; padding: 5px; border-radius: 5px;">
                    <option value="none">None</option>
                    <option value="wave">Wave Motion</option>
                    <option value="rotate">Rotation</option>
                    <option value="pulse">Pulse Effect</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Grid Layout:</label>
                <select id="layoutMode" style="width: 150px; padding: 5px; border-radius: 5px;">
                    <option value="default">Default</option>
                    <option value="hexagon">Hexagon</option>
                    <option value="circle">Circle</option>
                    <option value="diamond">Diamond</option>
                </select>
            </div>
            
            <div class="control-group">
                <label>Animation Speed: <span id="speedValue">1x</span></label>
                <input type="range" id="animationSpeed" class="slider" min="0.5" max="3" step="0.1" value="1">
            </div>
            
            <div class="control-group">
                <label>Particle Density: <span id="densityValue">50</span></label>
                <input type="range" id="particleDensity" class="slider" min="10" max="100" step="10" value="50">
            </div>
            
            <div class="control-group" style="margin-top: 15px;">
                <button id="resetGrid" style="width: 100%; padding: 8px; border-radius: 5px; border: none; background: #04AA6D; color: white; cursor: pointer;">
                    🔄 Reset Grid
                </button>
            </div>
        `;

        document.body.appendChild(panel);
    }

    createStatsPanel() {
        const stats = document.createElement('div');
        stats.className = 'stats-panel';
        stats.innerHTML = `
            <h3>📊 Grid Statistics</h3>
            <div class="stat-item">
                <span>Clicks:</span>
                <span class="stat-value" id="clickCount">0</span>
            </div>
            <div class="stat-item">
                <span>Hovers:</span>
                <span class="stat-value" id="hoverCount">0</span>
            </div>
            <div class="stat-item">
                <span>Animations:</span>
                <span class="stat-value" id="animationCount">0</span>
            </div>
            <div class="stat-item">
                <span>Active Particles:</span>
                <span class="stat-value" id="particleCount">0</span>
            </div>
            <div class="stat-item">
                <span>FPS:</span>
                <span class="stat-value" id="fpsCount">60</span>
            </div>
        `;

        document.body.appendChild(stats);
    }

    createParticleSystem() {
        const particleSystem = document.createElement('div');
        particleSystem.className = 'particle-system';
        document.body.appendChild(particleSystem);

        this.spawnParticles();
    }

    spawnParticles() {
        const particleSystem = document.querySelector('.particle-system');
        const density = parseInt(document.getElementById('particleDensity')?.value || 50);
        
        // Clear existing particles
        particleSystem.innerHTML = '';
        
        for (let i = 0; i < density; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 6 + 's';
                particle.style.animationDuration = (4 + Math.random() * 4) + 's';
                
                particleSystem.appendChild(particle);
                this.stats.particles++;
                
                // Remove particle after animation
                setTimeout(() => {
                    if (particle.parentNode) {
                        particle.remove();
                        this.stats.particles--;
                    }
                }, 8000);
            }, i * 100);
        }
    }

    addMouseTrail() {
        const trail = document.createElement('div');
        trail.className = 'mouse-trail';
        document.body.appendChild(trail);

        document.addEventListener('mousemove', (e) => {
            trail.style.left = (e.clientX - 10) + 'px';
            trail.style.top = (e.clientY - 10) + 'px';
        });
    }

    addRippleEffect() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('box1')) {
                this.stats.clicks++;
                this.createRipple(e);
            }
        });
    }

    createRipple(e) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
        
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    bindEvents() {
        // Color palette
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-option')) {
                this.changeColorScheme(e.target);
            }
        });

        // Animation mode
        const animationMode = document.getElementById('animationMode');
        if (animationMode) {
            animationMode.addEventListener('change', (e) => {
                this.changeAnimationMode(e.target.value);
            });
        }

        // Layout mode
        const layoutMode = document.getElementById('layoutMode');
        if (layoutMode) {
            layoutMode.addEventListener('change', (e) => {
                this.changeLayout(e.target.value);
            });
        }

        // Animation speed
        const animationSpeed = document.getElementById('animationSpeed');
        if (animationSpeed) {
            animationSpeed.addEventListener('input', (e) => {
                this.changeAnimationSpeed(e.target.value);
                document.getElementById('speedValue').textContent = e.target.value + 'x';
            });
        }

        // Particle density
        const particleDensity = document.getElementById('particleDensity');
        if (particleDensity) {
            particleDensity.addEventListener('input', (e) => {
                document.getElementById('densityValue').textContent = e.target.value;
                this.spawnParticles();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetGrid');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => this.resetGrid());
        }

        // Hover tracking
        document.addEventListener('mouseenter', (e) => {
            if (e.target.classList.contains('box1')) {
                this.stats.hovers++;
            }
        }, true);

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case '1':
                        e.preventDefault();
                        this.changeAnimationMode('wave');
                        break;
                    case '2':
                        e.preventDefault();
                        this.changeAnimationMode('rotate');
                        break;
                    case '3':
                        e.preventDefault();
                        this.changeAnimationMode('pulse');
                        break;
                    case '0':
                        e.preventDefault();
                        this.resetGrid();
                        break;
                }
            }
        });
    }

    changeColorScheme(colorElement) {
        // Remove active class from all color options
        document.querySelectorAll('.color-option').forEach(el => 
            el.classList.remove('active'));
        
        // Add active class to clicked option
        colorElement.classList.add('active');
        
        // Apply color scheme
        const scheme = colorElement.dataset.scheme;
        const color = colorElement.style.background;
        
        document.documentElement.style.setProperty('--accent-color', color);
        
        // Update all grid boxes
        document.querySelectorAll('.box1').forEach(box => {
            box.style.borderColor = color;
            box.style.background = `linear-gradient(135deg, ${color}22, ${color}44)`;
        });

        this.colorScheme = scheme;
    }

    changeAnimationMode(mode) {
        const container = document.getElementById('container-box');
        
        // Remove existing animation classes
        container.classList.remove('grid-mode-wave', 'grid-mode-rotate', 'grid-mode-pulse');
        
        // Add new animation class
        if (mode !== 'none') {
            container.classList.add(`grid-mode-${mode}`);
            this.stats.animations++;
        }
        
        this.animationMode = mode;
    }

    changeLayout(layout) {
        const container = document.getElementById('container-box');
        
        // Remove existing layout classes
        container.classList.remove('layout-hexagon', 'layout-circle', 'layout-diamond');
        
        // Add new layout class
        if (layout !== 'default') {
            container.classList.add(`layout-${layout}`);
        }
        
        this.currentLayout = layout;
    }

    changeAnimationSpeed(speed) {
        const duration = 3 / parseFloat(speed);
        document.documentElement.style.setProperty('--animation-duration', duration + 's');
        
        // Update CSS animations
        const style = document.createElement('style');
        style.textContent = `
            .grid-mode-wave .box1 { animation-duration: ${duration}s; }
            .grid-mode-rotate .box1 { animation-duration: ${duration * 1.33}s; }
            .grid-mode-pulse .box1 { animation-duration: ${duration * 0.67}s; }
        `;
        
        // Remove previous speed style
        const prevStyle = document.querySelector('#speed-style');
        if (prevStyle) prevStyle.remove();
        
        style.id = 'speed-style';
        document.head.appendChild(style);
    }

    resetGrid() {
        this.changeAnimationMode('none');
        this.changeLayout('default');
        
        // Reset controls
        const animationMode = document.getElementById('animationMode');
        const layoutMode = document.getElementById('layoutMode');
        const animationSpeed = document.getElementById('animationSpeed');
        const particleDensity = document.getElementById('particleDensity');
        
        if (animationMode) animationMode.value = 'none';
        if (layoutMode) layoutMode.value = 'default';
        if (animationSpeed) {
            animationSpeed.value = '1';
            document.getElementById('speedValue').textContent = '1x';
        }
        if (particleDensity) {
            particleDensity.value = '50';
            document.getElementById('densityValue').textContent = '50';
        }
        
        // Reset stats
        this.stats = { clicks: 0, hovers: 0, animations: 0, particles: this.stats.particles };
        
        // Reset color scheme
        const defaultColor = document.querySelector('.color-option');
        if (defaultColor) this.changeColorScheme(defaultColor);
        
        this.spawnParticles();
    }

    startStatsUpdate() {
        setInterval(() => {
            document.getElementById('clickCount').textContent = this.stats.clicks;
            document.getElementById('hoverCount').textContent = this.stats.hovers;
            document.getElementById('animationCount').textContent = this.stats.animations;
            document.getElementById('particleCount').textContent = this.stats.particles;
            
            // Simple FPS counter
            const fps = Math.floor(Math.random() * 10) + 55; // Mock FPS
            document.getElementById('fpsCount').textContent = fps;
        }, 100);
    }

    // Public API methods
    getStats() {
        return { ...this.stats };
    }

    getCurrentSettings() {
        return {
            layout: this.currentLayout,
            animationMode: this.animationMode,
            colorScheme: this.colorScheme
        };
    }
}

// Performance monitoring
class PerformanceMonitor {
    constructor() {
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.fps = 60;
        this.start();
    }

    start() {
        const loop = (currentTime) => {
            this.frameCount++;
            
            if (currentTime - this.lastTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                this.frameCount = 0;
                this.lastTime = currentTime;
                
                // Update FPS display
                const fpsElement = document.getElementById('fpsCount');
                if (fpsElement) {
                    fpsElement.textContent = this.fps;
                    
                    // Color code FPS
                    if (this.fps >= 50) {
                        fpsElement.style.color = '#04AA6D';
                    } else if (this.fps >= 30) {
                        fpsElement.style.color = '#ffd93d';
                    } else {
                        fpsElement.style.color = '#ff6b6b';
                    }
                }
            }
            
            requestAnimationFrame(loop);
        };
        
        requestAnimationFrame(loop);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS link
    const cssLink = document.createElement('link');
    cssLink.rel = 'stylesheet';
    cssLink.href = 'interactive-features.css';
    document.head.appendChild(cssLink);
    
    // Initialize interactive grid
    window.interactiveGrid = new InteractiveGrid();
    window.performanceMonitor = new PerformanceMonitor();
    
    // Add welcome message
    setTimeout(() => {
        if (!localStorage.getItem('hasSeenGridWelcome')) {
            const welcome = document.createElement('div');
            welcome.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.95);
                color: white;
                padding: 30px;
                border-radius: 20px;
                z-index: 10000;
                text-align: center;
                backdrop-filter: blur(20px);
                border: 2px solid rgba(255, 255, 255, 0.3);
                max-width: 400px;
            `;
            
            welcome.innerHTML = `
                <h2 style="margin: 0 0 15px 0; color: #04AA6D;">🎨 Interactive Grid Loaded!</h2>
                <p style="margin: 0 0 10px 0; font-size: 14px;">Try these features:</p>
                <ul style="text-align: left; font-size: 12px; margin: 0 0 15px 0;">
                    <li>Click any grid box for ripple effects</li>
                    <li>Use color palette to change themes</li>
                    <li>Control animations and layouts</li>
                    <li>Keyboard shortcuts: Ctrl+1/2/3, Ctrl+0</li>
                </ul>
                <button onclick="this.parentElement.remove(); localStorage.setItem('hasSeenGridWelcome', 'true');" 
                        style="padding: 10px 20px; background: #04AA6D; color: white; border: none; border-radius: 25px; cursor: pointer;">
                    Start Exploring!
                </button>
            `;
            
            document.body.appendChild(welcome);
        }
    }, 500);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { InteractiveGrid, PerformanceMonitor };
}