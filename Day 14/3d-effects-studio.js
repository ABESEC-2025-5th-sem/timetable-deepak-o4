// Advanced 3D CSS Effects and Animations System
class Advanced3DEffects {
    constructor() {
        this.activeElements = new Set();
        this.init();
    }

    init() {
        this.addControlPanel();
        this.setup3DStyles();
        this.scanForElements();
        this.addInteractiveDemo();
    }

    addControlPanel() {
        const controlPanel = document.createElement('div');
        controlPanel.className = 'fx-control-panel';
        controlPanel.innerHTML = `
            <div class="fx-panel-header">
                <h3>🎨 3D Effects Studio</h3>
                <button id="fx-toggle-panel" class="fx-toggle-btn">⚙️</button>
            </div>
            
            <div class="fx-panel-content" id="fx-panel-content">
                <div class="fx-section">
                    <h4>🎯 Target Selection</h4>
                    <div class="fx-target-controls">
                        <button class="fx-btn" id="fx-select-mode">🎯 Select Element</button>
                        <button class="fx-btn" id="fx-select-all">🌐 Select All</button>
                        <button class="fx-btn" id="fx-clear-selection">❌ Clear</button>
                    </div>
                </div>

                <div class="fx-section">
                    <h4>📐 Transform Controls</h4>
                    <div class="fx-control-group">
                        <label>Rotate X:</label>
                        <input type="range" id="fx-rotate-x" min="0" max="360" value="0" class="fx-slider">
                        <span class="fx-value">0°</span>
                    </div>
                    <div class="fx-control-group">
                        <label>Rotate Y:</label>
                        <input type="range" id="fx-rotate-y" min="0" max="360" value="0" class="fx-slider">
                        <span class="fx-value">0°</span>
                    </div>
                    <div class="fx-control-group">
                        <label>Rotate Z:</label>
                        <input type="range" id="fx-rotate-z" min="0" max="360" value="0" class="fx-slider">
                        <span class="fx-value">0°</span>
                    </div>
                    <div class="fx-control-group">
                        <label>Scale:</label>
                        <input type="range" id="fx-scale" min="0.1" max="3" value="1" step="0.1" class="fx-slider">
                        <span class="fx-value">1x</span>
                    </div>
                    <div class="fx-control-group">
                        <label>Perspective:</label>
                        <input type="range" id="fx-perspective" min="100" max="2000" value="1000" class="fx-slider">
                        <span class="fx-value">1000px</span>
                    </div>
                </div>

                <div class="fx-section">
                    <h4>🎭 Animation Presets</h4>
                    <div class="fx-preset-grid">
                        <button class="fx-preset-btn" data-effect="flip-card">🃏 Flip Card</button>
                        <button class="fx-preset-btn" data-effect="cube-rotate">🧊 Cube Rotate</button>
                        <button class="fx-preset-btn" data-effect="wave-motion">🌊 Wave Motion</button>
                        <button class="fx-preset-btn" data-effect="floating">☁️ Float</button>
                        <button class="fx-preset-btn" data-effect="pulse-glow">💫 Pulse Glow</button>
                        <button class="fx-preset-btn" data-effect="tilt-hover">📱 Tilt Hover</button>
                        <button class="fx-preset-btn" data-effect="zoom-bounce">🎯 Zoom Bounce</button>
                        <button class="fx-preset-btn" data-effect="slide-reveal">🎬 Slide Reveal</button>
                        <button class="fx-preset-btn" data-effect="glass-morph">🔮 Glass Morph</button>
                        <button class="fx-preset-btn" data-effect="neon-glow">⚡ Neon Glow</button>
                    </div>
                </div>

                <div class="fx-section">
                    <h4>🎨 Visual Effects</h4>
                    <div class="fx-visual-controls">
                        <div class="fx-control-group">
                            <label>Shadow Blur:</label>
                            <input type="range" id="fx-shadow" min="0" max="50" value="0" class="fx-slider">
                            <span class="fx-value">0px</span>
                        </div>
                        <div class="fx-control-group">
                            <label>Blur:</label>
                            <input type="range" id="fx-blur" min="0" max="20" value="0" step="0.5" class="fx-slider">
                            <span class="fx-value">0px</span>
                        </div>
                        <div class="fx-control-group">
                            <label>Opacity:</label>
                            <input type="range" id="fx-opacity" min="0" max="1" value="1" step="0.1" class="fx-slider">
                            <span class="fx-value">100%</span>
                        </div>
                        <div class="fx-control-group">
                            <label>Brightness:</label>
                            <input type="range" id="fx-brightness" min="0" max="200" value="100" class="fx-slider">
                            <span class="fx-value">100%</span>
                        </div>
                    </div>
                </div>

                <div class="fx-section">
                    <h4>⏱️ Animation Settings</h4>
                    <div class="fx-animation-controls">
                        <div class="fx-control-group">
                            <label>Duration:</label>
                            <select id="fx-duration" class="fx-select">
                                <option value="0.3">0.3s - Fast</option>
                                <option value="0.6" selected>0.6s - Normal</option>
                                <option value="1">1s - Slow</option>
                                <option value="2">2s - Very Slow</option>
                            </select>
                        </div>
                        <div class="fx-control-group">
                            <label>Easing:</label>
                            <select id="fx-easing" class="fx-select">
                                <option value="ease">ease</option>
                                <option value="ease-in">ease-in</option>
                                <option value="ease-out">ease-out</option>
                                <option value="ease-in-out" selected>ease-in-out</option>
                                <option value="linear">linear</option>
                                <option value="cubic-bezier(0.68, -0.55, 0.265, 1.55)">bounce</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div class="fx-section">
                    <h4>💾 Export & Actions</h4>
                    <div class="fx-action-buttons">
                        <button class="fx-action-btn reset" id="fx-reset-all">🔄 Reset All</button>
                        <button class="fx-action-btn export" id="fx-export-css">📋 Export CSS</button>
                        <button class="fx-action-btn save" id="fx-save-preset">💾 Save Preset</button>
                        <button class="fx-action-btn demo" id="fx-toggle-demo">🎪 Demo Mode</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(controlPanel);
        this.addPanelStyles();
        this.bindPanelEvents();
    }

    addPanelStyles() {
        const styles = `
            .fx-control-panel {
                position: fixed;
                top: 20px;
                left: 20px;
                width: 350px;
                background: linear-gradient(135deg, #1f1f23 0%, #2a2a2e 100%);
                border: 1px solid #404040;
                border-radius: 16px;
                box-shadow: 0 20px 40px rgba(0,0,0,0.3);
                z-index: 10000;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                color: white;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }

            .fx-panel-header {
                padding: 15px 20px;
                border-bottom: 1px solid #404040;
                display: flex;
                justify-content: space-between;
                align-items: center;
                background: rgba(255,255,255,0.05);
                border-radius: 16px 16px 0 0;
            }

            .fx-panel-header h3 {
                margin: 0;
                font-size: 16px;
                font-weight: 600;
                background: linear-gradient(45deg, #00d4ff, #ff00a8);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }

            .fx-toggle-btn {
                background: rgba(255,255,255,0.1);
                border: none;
                color: white;
                padding: 8px 12px;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s ease;
            }

            .fx-toggle-btn:hover {
                background: rgba(255,255,255,0.2);
                transform: scale(1.1);
            }

            .fx-panel-content {
                max-height: 70vh;
                overflow-y: auto;
                padding: 20px;
            }

            .fx-section {
                margin-bottom: 25px;
            }

            .fx-section h4 {
                margin: 0 0 15px 0;
                font-size: 14px;
                color: #00d4ff;
                border-bottom: 1px solid #404040;
                padding-bottom: 5px;
            }

            .fx-target-controls, .fx-preset-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }

            .fx-preset-grid {
                grid-template-columns: repeat(2, 1fr);
            }

            .fx-btn, .fx-preset-btn {
                padding: 8px 12px;
                border: 1px solid #404040;
                border-radius: 8px;
                background: rgba(255,255,255,0.05);
                color: white;
                cursor: pointer;
                font-size: 12px;
                transition: all 0.3s ease;
            }

            .fx-btn:hover, .fx-preset-btn:hover {
                background: rgba(0,212,255,0.2);
                border-color: #00d4ff;
                transform: translateY(-2px);
            }

            .fx-control-group {
                display: grid;
                grid-template-columns: 1fr 2fr auto;
                gap: 10px;
                align-items: center;
                margin-bottom: 12px;
                padding: 8px;
                background: rgba(255,255,255,0.03);
                border-radius: 6px;
            }

            .fx-control-group label {
                font-size: 12px;
                color: #ccc;
            }

            .fx-slider {
                accent-color: #00d4ff;
            }

            .fx-value {
                font-size: 11px;
                color: #00d4ff;
                font-weight: 600;
                min-width: 40px;
                text-align: right;
            }

            .fx-select {
                background: rgba(255,255,255,0.1);
                border: 1px solid #404040;
                color: white;
                padding: 6px;
                border-radius: 4px;
                font-size: 12px;
            }

            .fx-action-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }

            .fx-action-btn {
                padding: 10px 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 600;
                transition: all 0.3s ease;
            }

            .fx-action-btn.reset { background: #ef4444; color: white; }
            .fx-action-btn.export { background: #8b5cf6; color: white; }
            .fx-action-btn.save { background: #10b981; color: white; }
            .fx-action-btn.demo { background: #f59e0b; color: white; }

            .fx-action-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }

            .fx-visual-controls, .fx-animation-controls {
                background: rgba(255,255,255,0.02);
                padding: 10px;
                border-radius: 8px;
                border: 1px solid #333;
            }

            @media (max-width: 768px) {
                .fx-control-panel {
                    width: calc(100vw - 40px);
                    left: 20px;
                    right: 20px;
                }
                
                .fx-preset-grid {
                    grid-template-columns: 1fr;
                }
            }

            .fx-element-highlight {
                outline: 2px solid #00d4ff !important;
                outline-offset: 2px;
                box-shadow: 0 0 20px rgba(0, 212, 255, 0.3) !important;
            }

            .fx-demo-stage {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 300px;
                height: 300px;
                background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
                border-radius: 20px;
                z-index: 9999;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 18px;
                font-weight: bold;
                text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            }

            ::-webkit-scrollbar {
                width: 6px;
            }

            ::-webkit-scrollbar-track {
                background: rgba(255,255,255,0.1);
                border-radius: 3px;
            }

            ::-webkit-scrollbar-thumb {
                background: #00d4ff;
                border-radius: 3px;
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }

    setup3DStyles() {
        const fxStyles = `
            @keyframes fx-flip-card {
                0% { transform: rotateY(0deg); }
                50% { transform: rotateY(180deg); }
                100% { transform: rotateY(360deg); }
            }

            @keyframes fx-cube-rotate {
                0% { transform: rotateX(0deg) rotateY(0deg); }
                25% { transform: rotateX(90deg) rotateY(0deg); }
                50% { transform: rotateX(90deg) rotateY(90deg); }
                75% { transform: rotateX(0deg) rotateY(90deg); }
                100% { transform: rotateX(0deg) rotateY(0deg); }
            }

            @keyframes fx-wave-motion {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                25% { transform: translateY(-10px) rotate(5deg); }
                50% { transform: translateY(0px) rotate(0deg); }
                75% { transform: translateY(-10px) rotate(-5deg); }
            }

            @keyframes fx-floating {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }

            @keyframes fx-pulse-glow {
                0%, 100% { box-shadow: 0 0 5px rgba(0,212,255,0.5); transform: scale(1); }
                50% { box-shadow: 0 0 25px rgba(0,212,255,0.8); transform: scale(1.05); }
            }

            @keyframes fx-zoom-bounce {
                0%, 100% { transform: scale(1); }
                25% { transform: scale(1.1); }
                50% { transform: scale(0.9); }
                75% { transform: scale(1.05); }
            }

            @keyframes fx-slide-reveal {
                0% { transform: translateX(-100%); opacity: 0; }
                100% { transform: translateX(0); opacity: 1; }
            }

            .fx-flip-card { animation: fx-flip-card 2s ease-in-out infinite; }
            .fx-cube-rotate { animation: fx-cube-rotate 4s linear infinite; }
            .fx-wave-motion { animation: fx-wave-motion 3s ease-in-out infinite; }
            .fx-floating { animation: fx-floating 3s ease-in-out infinite; }
            .fx-pulse-glow { animation: fx-pulse-glow 2s ease-in-out infinite; }
            .fx-zoom-bounce { animation: fx-zoom-bounce 1s ease-in-out infinite; }
            .fx-slide-reveal { animation: fx-slide-reveal 0.8s ease-out; }

            .fx-tilt-hover:hover {
                transform: perspective(1000px) rotateX(10deg) rotateY(10deg) scale(1.05);
                transition: transform 0.3s ease;
            }

            .fx-glass-morph {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            }

            .fx-neon-glow {
                box-shadow: 
                    0 0 5px currentColor,
                    0 0 10px currentColor,
                    0 0 20px currentColor,
                    0 0 40px currentColor;
                text-shadow: 
                    0 0 5px currentColor,
                    0 0 10px currentColor;
            }

            .fx-preserve-3d { transform-style: preserve-3d; }
        `;

        const fxStyleSheet = document.createElement('style');
        fxStyleSheet.textContent = fxStyles;
        document.head.appendChild(fxStyleSheet);
    }

    bindPanelEvents() {
        // Panel toggle
        document.getElementById('fx-toggle-panel').addEventListener('click', () => {
            const content = document.getElementById('fx-panel-content');
            content.style.display = content.style.display === 'none' ? 'block' : 'none';
        });

        // Element selection
        document.getElementById('fx-select-mode').addEventListener('click', () => {
            this.enableSelectMode();
        });

        document.getElementById('fx-select-all').addEventListener('click', () => {
            this.selectAllElements();
        });

        document.getElementById('fx-clear-selection').addEventListener('click', () => {
            this.clearSelection();
        });

        // Transform controls
        this.bindTransformControls();

        // Preset effects
        document.querySelectorAll('.fx-preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyPresetEffect(e.target.dataset.effect);
            });
        });

        // Action buttons
        document.getElementById('fx-reset-all').addEventListener('click', () => {
            this.resetAllEffects();
        });

        document.getElementById('fx-export-css').addEventListener('click', () => {
            this.exportCSS();
        });

        document.getElementById('fx-save-preset').addEventListener('click', () => {
            this.savePreset();
        });

        document.getElementById('fx-toggle-demo').addEventListener('click', () => {
            this.toggleDemoMode();
        });
    }

    bindTransformControls() {
        const controls = ['rotate-x', 'rotate-y', 'rotate-z', 'scale', 'perspective', 'shadow', 'blur', 'opacity', 'brightness'];
        
        controls.forEach(control => {
            const slider = document.getElementById(`fx-${control}`);
            const valueSpan = slider.parentElement.querySelector('.fx-value');
            
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                this.updateTransform();
                
                // Update display value
                let displayValue = value;
                switch(control) {
                    case 'rotate-x':
                    case 'rotate-y':
                    case 'rotate-z':
                        displayValue = value + '°';
                        break;
                    case 'scale':
                        displayValue = value + 'x';
                        break;
                    case 'perspective':
                    case 'shadow':
                    case 'blur':
                        displayValue = value + 'px';
                        break;
                    case 'opacity':
                        displayValue = Math.round(value * 100) + '%';
                        break;
                    case 'brightness':
                        displayValue = value + '%';
                        break;
                }
                valueSpan.textContent = displayValue;
            });
        });
    }

    enableSelectMode() {
        document.body.style.cursor = 'crosshair';
        
        const clickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            if (e.target.closest('.fx-control-panel')) return;
            
            this.selectElement(e.target);
            document.body.style.cursor = 'default';
            document.removeEventListener('click', clickHandler, true);
        };
        
        document.addEventListener('click', clickHandler, true);
        this.showNotification('🎯 Click on any element to select it', 'info');
    }

    selectElement(element) {
        this.clearSelection();
        this.activeElements.add(element);
        element.classList.add('fx-element-highlight');
        this.showNotification(`✅ Selected: ${element.tagName}`, 'success');
    }

    selectAllElements() {
        const elements = document.querySelectorAll('div, img, h1, h2, h3, h4, h5, h6, p, button, article, section');
        elements.forEach(el => {
            if (!el.closest('.fx-control-panel') && !el.classList.contains('fx-demo-stage')) {
                this.activeElements.add(el);
                el.classList.add('fx-element-highlight');
            }
        });
        this.showNotification(`✅ Selected ${this.activeElements.size} elements`, 'success');
    }

    clearSelection() {
        this.activeElements.forEach(el => {
            el.classList.remove('fx-element-highlight');
        });
        this.activeElements.clear();
        this.showNotification('🗑️ Selection cleared', 'info');
    }

    updateTransform() {
        const rotateX = document.getElementById('fx-rotate-x').value;
        const rotateY = document.getElementById('fx-rotate-y').value;
        const rotateZ = document.getElementById('fx-rotate-z').value;
        const scale = document.getElementById('fx-scale').value;
        const perspective = document.getElementById('fx-perspective').value;
        const shadow = document.getElementById('fx-shadow').value;
        const blur = document.getElementById('fx-blur').value;
        const opacity = document.getElementById('fx-opacity').value;
        const brightness = document.getElementById('fx-brightness').value;

        const transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;
        const filter = `blur(${blur}px) brightness(${brightness}%)`;
        const boxShadow = `0 0 ${shadow}px rgba(0, 212, 255, 0.5)`;

        this.activeElements.forEach(el => {
            el.style.transform = transform;
            el.style.filter = filter;
            el.style.opacity = opacity;
            el.style.boxShadow = shadow > 0 ? boxShadow : '';
            el.style.transition = 'all 0.3s ease';
        });
    }

    applyPresetEffect(effect) {
        if (this.activeElements.size === 0) {
            this.showNotification('⚠️ No elements selected!', 'error');
            return;
        }

        const duration = document.getElementById('fx-duration').value;
        const easing = document.getElementById('fx-easing').value;

        this.activeElements.forEach(el => {
            // Remove existing effect classes
            el.classList.remove('fx-flip-card', 'fx-cube-rotate', 'fx-wave-motion', 'fx-floating', 
                              'fx-pulse-glow', 'fx-tilt-hover', 'fx-zoom-bounce', 'fx-slide-reveal', 
                              'fx-glass-morph', 'fx-neon-glow');
            
            // Apply new effect
            el.classList.add(`fx-${effect}`);
            el.style.animationDuration = `${duration}s`;
            el.style.animationTimingFunction = easing;
            
            // Special handling for certain effects
            if (effect === 'glass-morph' || effect === 'neon-glow') {
                // These are non-animated effects
                el.style.animation = 'none';
            }
        });

        this.showNotification(`✨ Applied ${effect} to ${this.activeElements.size} elements`, 'success');
    }

    resetAllEffects() {
        // Reset sliders
        document.getElementById('fx-rotate-x').value = 0;
        document.getElementById('fx-rotate-y').value = 0;
        document.getElementById('fx-rotate-z').value = 0;
        document.getElementById('fx-scale').value = 1;
        document.getElementById('fx-perspective').value = 1000;
        document.getElementById('fx-shadow').value = 0;
        document.getElementById('fx-blur').value = 0;
        document.getElementById('fx-opacity').value = 1;
        document.getElementById('fx-brightness').value = 100;

        // Update display values
        document.querySelectorAll('.fx-value').forEach(span => {
            const control = span.parentElement.querySelector('.fx-slider');
            const controlType = control.id.replace('fx-', '');
            let value = control.value;
            
            switch(controlType) {
                case 'rotate-x':
                case 'rotate-y':
                case 'rotate-z':
                    span.textContent = value + '°';
                    break;
                case 'scale':
                    span.textContent = value + 'x';
                    break;
                case 'perspective':
                case 'shadow':
                case 'blur':
                    span.textContent = value + 'px';
                    break;
                case 'opacity':
                    span.textContent = Math.round(value * 100) + '%';
                    break;
                case 'brightness':
                    span.textContent = value + '%';
                    break;
            }
        });

        // Reset all elements
        this.activeElements.forEach(el => {
            el.style.transform = '';
            el.style.filter = '';
            el.style.opacity = '';
            el.style.boxShadow = '';
            el.style.animation = '';
            el.classList.remove('fx-flip-card', 'fx-cube-rotate', 'fx-wave-motion', 'fx-floating', 
                              'fx-pulse-glow', 'fx-tilt-hover', 'fx-zoom-bounce', 'fx-slide-reveal', 
                              'fx-glass-morph', 'fx-neon-glow');
        });

        this.showNotification('🔄 All effects reset', 'info');
    }

    exportCSS() {
        if (this.activeElements.size === 0) {
            this.showNotification('⚠️ No elements selected!', 'error');
            return;
        }

        let css = '/* Generated by 3D Effects Studio */\n\n';
        
        this.activeElements.forEach((el, index) => {
            css += `.fx-element-${index + 1} {\n`;
            css += `  transform: ${el.style.transform || 'none'};\n`;
            css += `  filter: ${el.style.filter || 'none'};\n`;
            css += `  opacity: ${el.style.opacity || '1'};\n`;
            css += `  box-shadow: ${el.style.boxShadow || 'none'};\n`;
            css += `  transition: all 0.3s ease;\n`;
            css += `}\n\n`;
        });

        // Copy to clipboard
        navigator.clipboard.writeText(css).then(() => {
            this.showNotification('📋 CSS copied to clipboard!', 'success');
        });
    }

    savePreset() {
        const presetName = prompt('Enter preset name:');
        if (!presetName) return;

        const preset = {
            name: presetName,
            rotateX: document.getElementById('fx-rotate-x').value,
            rotateY: document.getElementById('fx-rotate-y').value,
            rotateZ: document.getElementById('fx-rotate-z').value,
            scale: document.getElementById('fx-scale').value,
            perspective: document.getElementById('fx-perspective').value,
            shadow: document.getElementById('fx-shadow').value,
            blur: document.getElementById('fx-blur').value,
            opacity: document.getElementById('fx-opacity').value,
            brightness: document.getElementById('fx-brightness').value
        };

        localStorage.setItem(`fx-preset-${presetName}`, JSON.stringify(preset));
        this.showNotification(`💾 Preset "${presetName}" saved!`, 'success');
    }

    toggleDemoMode() {
        const existingDemo = document.querySelector('.fx-demo-stage');
        
        if (existingDemo) {
            existingDemo.remove();
            this.showNotification('🎪 Demo mode off', 'info');
        } else {
            const demoStage = document.createElement('div');
            demoStage.className = 'fx-demo-stage';
            demoStage.textContent = '3D Demo Element';
            
            document.body.appendChild(demoStage);
            this.selectElement(demoStage);
            
            this.showNotification('🎪 Demo mode on - Element ready!', 'success');
        }
    }

    scanForElements() {
        // Auto-add hover effects to interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .card, .item');
        
        interactiveElements.forEach(el => {
            if (!el.closest('.fx-control-panel')) {
                el.style.transition = 'all 0.3s ease';
                
                el.addEventListener('mouseenter', () => {
                    if (!el.classList.contains('fx-element-highlight')) {
                        el.style.transform = 'scale(1.05) translateY(-2px)';
                        el.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
                    }
                });
                
                el.addEventListener('mouseleave', () => {
                    if (!el.classList.contains('fx-element-highlight')) {
                        el.style.transform = '';
                        el.style.boxShadow = '';
                    }
                });
            }
        });
    }

    addInteractiveDemo() {
        // Add sample demo content if page is empty
        if (document.body.children.length <= 2) {
            const demoContent = document.createElement('div');
            demoContent.innerHTML = `
                <div style="
                    padding: 100px 50px;
                    text-align: center;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    margin: 50px;
                    border-radius: 20px;
                " class="fx-demo-content">
                    <h1 style="margin-bottom: 30px;">🎨 Welcome to 3D Effects Studio</h1>
                    <p style="font-size: 18px; margin-bottom: 30px;">Use the control panel to apply amazing 3D effects!</p>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin-top: 40px;">
                        <div class="demo-card" style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; cursor: pointer;">
                            <h3>🃏 Card 1</h3>
                            <p>Hover to see effect</p>
                        </div>
                        <div class="demo-card" style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; cursor: pointer;">
                            <h3>🧊 Card 2</h3>
                            <p>Try the presets!</p>
                        </div>
                        <div class="demo-card" style="background: rgba(255,255,255,0.2); padding: 20px; border-radius: 15px; cursor: pointer;">
                            <h3>🌊 Card 3</h3>
                            <p>Export your CSS</p>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(demoContent);
            this.scanForElements();
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 25px;
            color: white;
            font-weight: 600;
            z-index: 10001;
            animation: slideUp 0.3s ease;
            max-width: 300px;
            backdrop-filter: blur(10px);
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 
                          type === 'error' ? 'linear-gradient(135deg, #ef4444, #dc2626)' : 
                          'linear-gradient(135deg, #3b82f6, #2563eb)'};
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
}

// Add notification animations
const notificationStyles = `
    @keyframes slideUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;

const notificationStyleSheet = document.createElement('style');
notificationStyleSheet.textContent = notificationStyles;
document.head.appendChild(notificationStyleSheet);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const fx3D = new Advanced3DEffects();
    
    // Make globally accessible
    window.Advanced3DEffects = fx3D;
    
    console.log('🎨 Advanced 3D Effects Studio Loaded!');
});

// Export for module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Advanced3DEffects;
}