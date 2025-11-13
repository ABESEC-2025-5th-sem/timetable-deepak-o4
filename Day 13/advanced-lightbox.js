// Advanced Lightbox Gallery with Image Editor
class AdvancedLightbox {
    constructor() {
        this.currentIndex = 0;
        this.images = [];
        this.isEditing = false;
        this.filters = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0
        };
        this.init();
    }

    init() {
        this.createLightboxHTML();
        this.setupEventListeners();
        this.scanForImages();
        this.addThumbnailControls();
    }

    createLightboxHTML() {
        const lightboxHTML = `
            <div id="advancedLightbox" class="lightbox-overlay">
                <div class="lightbox-container">
                    <button class="lightbox-close">&times;</button>
                    <button class="lightbox-prev">&#8249;</button>
                    <button class="lightbox-next">&#8250;</button>
                    
                    <div class="lightbox-main">
                        <div class="image-container">
                            <img id="lightboxImage" alt="Lightbox Image">
                            <div class="image-info">
                                <span id="imageCounter">1 / 1</span>
                                <span id="imageName">Image</span>
                            </div>
                        </div>
                        
                        <div class="editor-panel" id="editorPanel">
                            <div class="editor-header">
                                <h3>🎨 Image Editor</h3>
                                <button id="toggleEditor" class="editor-toggle">✏️ Edit</button>
                            </div>
                            
                            <div class="editor-controls" id="editorControls">
                                <div class="filter-group">
                                    <label>Brightness</label>
                                    <input type="range" id="brightness" min="0" max="200" value="100">
                                    <span class="value">100%</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Contrast</label>
                                    <input type="range" id="contrast" min="0" max="200" value="100">
                                    <span class="value">100%</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Saturation</label>
                                    <input type="range" id="saturation" min="0" max="200" value="100">
                                    <span class="value">100%</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Hue Rotate</label>
                                    <input type="range" id="hue" min="0" max="360" value="0">
                                    <span class="value">0°</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Blur</label>
                                    <input type="range" id="blur" min="0" max="10" value="0" step="0.1">
                                    <span class="value">0px</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Sepia</label>
                                    <input type="range" id="sepia" min="0" max="100" value="0">
                                    <span class="value">0%</span>
                                </div>
                                
                                <div class="filter-group">
                                    <label>Grayscale</label>
                                    <input type="range" id="grayscale" min="0" max="100" value="0">
                                    <span class="value">0%</span>
                                </div>
                                
                                <div class="editor-actions">
                                    <button id="resetFilters" class="editor-btn reset">Reset</button>
                                    <button id="saveImage" class="editor-btn save">💾 Save</button>
                                    <button id="downloadImage" class="editor-btn download">📥 Download</button>
                                </div>
                                
                                <div class="preset-filters">
                                    <h4>Quick Presets</h4>
                                    <div class="preset-buttons">
                                        <button class="preset-btn" data-preset="vintage">📸 Vintage</button>
                                        <button class="preset-btn" data-preset="bw">⚫ B&W</button>
                                        <button class="preset-btn" data-preset="warm">🔥 Warm</button>
                                        <button class="preset-btn" data-preset="cool">❄️ Cool</button>
                                        <button class="preset-btn" data-preset="dramatic">⚡ Dramatic</button>
                                        <button class="preset-btn" data-preset="soft">☁️ Soft</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="thumbnail-strip" id="thumbnailStrip">
                        <!-- Thumbnails will be populated here -->
                    </div>
                </div>
            </div>
        `;

        const lightboxCSS = `
            .lightbox-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                z-index: 10000;
                display: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .lightbox-overlay.active {
                display: flex;
                opacity: 1;
            }
            
            .lightbox-container {
                width: 100%;
                height: 100%;
                display: flex;
                flex-direction: column;
                position: relative;
            }
            
            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 20px;
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: white;
                font-size: 30px;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10001;
                transition: all 0.3s ease;
            }
            
            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.1);
            }
            
            .lightbox-prev, .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background: rgba(0, 0, 0, 0.5);
                border: none;
                color: white;
                font-size: 40px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10001;
                transition: all 0.3s ease;
            }
            
            .lightbox-prev {
                left: 20px;
            }
            
            .lightbox-next {
                right: 20px;
            }
            
            .lightbox-prev:hover, .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-50%) scale(1.1);
            }
            
            .lightbox-main {
                flex: 1;
                display: flex;
                min-height: 0;
            }
            
            .image-container {
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                padding: 80px 300px 20px 20px;
                position: relative;
            }
            
            #lightboxImage {
                max-width: 100%;
                max-height: 100%;
                object-fit: contain;
                border-radius: 8px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
                transition: all 0.3s ease;
            }
            
            .image-info {
                position: absolute;
                bottom: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 20px;
                display: flex;
                gap: 20px;
                font-size: 14px;
            }
            
            .editor-panel {
                position: absolute;
                top: 0;
                right: -300px;
                width: 300px;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px;
                overflow-y: auto;
                transition: right 0.3s ease;
            }
            
            .editor-panel.active {
                right: 0;
            }
            
            .editor-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 10px;
                border-bottom: 1px solid #333;
            }
            
            .editor-header h3 {
                margin: 0;
                font-size: 16px;
            }
            
            .editor-toggle {
                background: #007acc;
                border: none;
                color: white;
                padding: 8px 12px;
                border-radius: 4px;
                cursor: pointer;
                font-size: 12px;
            }
            
            .editor-controls {
                display: none;
            }
            
            .editor-controls.active {
                display: block;
            }
            
            .filter-group {
                margin-bottom: 15px;
                padding: 10px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 6px;
            }
            
            .filter-group label {
                display: block;
                margin-bottom: 8px;
                font-size: 13px;
                font-weight: 500;
            }
            
            .filter-group input[type="range"] {
                width: 100%;
                margin-bottom: 5px;
                accent-color: #007acc;
            }
            
            .filter-group .value {
                font-size: 12px;
                color: #ccc;
                float: right;
            }
            
            .editor-actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
                margin: 20px 0;
            }
            
            .editor-btn {
                padding: 10px 15px;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 12px;
                font-weight: 500;
                transition: all 0.3s ease;
            }
            
            .editor-btn.reset {
                background: #dc2626;
                color: white;
                grid-column: 1 / -1;
            }
            
            .editor-btn.save {
                background: #059669;
                color: white;
            }
            
            .editor-btn.download {
                background: #7c3aed;
                color: white;
            }
            
            .editor-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            }
            
            .preset-filters {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #333;
            }
            
            .preset-filters h4 {
                margin: 0 0 15px 0;
                font-size: 14px;
                color: #ccc;
            }
            
            .preset-buttons {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            
            .preset-btn {
                padding: 8px 10px;
                border: none;
                border-radius: 4px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                cursor: pointer;
                font-size: 11px;
                transition: all 0.3s ease;
            }
            
            .preset-btn:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            
            .thumbnail-strip {
                height: 120px;
                background: rgba(0, 0, 0, 0.8);
                padding: 10px;
                display: flex;
                gap: 10px;
                overflow-x: auto;
            }
            
            .thumbnail {
                height: 100px;
                width: 100px;
                object-fit: cover;
                border-radius: 6px;
                cursor: pointer;
                opacity: 0.6;
                transition: all 0.3s ease;
                flex-shrink: 0;
                border: 2px solid transparent;
            }
            
            .thumbnail:hover, .thumbnail.active {
                opacity: 1;
                transform: scale(1.05);
                border-color: #007acc;
            }
            
            @media (max-width: 768px) {
                .image-container {
                    padding: 60px 20px 20px 20px;
                }
                
                .editor-panel {
                    width: 100%;
                    right: -100%;
                }
                
                .lightbox-prev, .lightbox-next {
                    width: 45px;
                    height: 45px;
                    font-size: 30px;
                }
                
                .lightbox-close {
                    width: 40px;
                    height: 40px;
                    font-size: 24px;
                }
            }
            
            ::-webkit-scrollbar {
                width: 6px;
                height: 6px;
            }
            
            ::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
            }
            
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.3);
                border-radius: 3px;
            }
        `;

        // Add HTML to body
        document.body.insertAdjacentHTML('beforeend', lightboxHTML);

        // Add CSS to head
        const style = document.createElement('style');
        style.textContent = lightboxCSS;
        document.head.appendChild(style);
    }

    setupEventListeners() {
        const lightbox = document.getElementById('advancedLightbox');
        const closeBtn = document.querySelector('.lightbox-close');
        const prevBtn = document.querySelector('.lightbox-prev');
        const nextBtn = document.querySelector('.lightbox-next');
        const editorToggle = document.getElementById('toggleEditor');

        // Close lightbox
        closeBtn.addEventListener('click', () => this.closeLightbox());
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) this.closeLightbox();
        });

        // Navigation
        prevBtn.addEventListener('click', () => this.previousImage());
        nextBtn.addEventListener('click', () => this.nextImage());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeLightbox();
                    break;
                case 'ArrowLeft':
                    this.previousImage();
                    break;
                case 'ArrowRight':
                    this.nextImage();
                    break;
                case 'e':
                case 'E':
                    this.toggleEditor();
                    break;
            }
        });

        // Editor toggle
        editorToggle.addEventListener('click', () => this.toggleEditor());

        // Filter controls
        this.setupFilterControls();

        // Editor actions
        document.getElementById('resetFilters').addEventListener('click', () => this.resetFilters());
        document.getElementById('saveImage').addEventListener('click', () => this.saveImage());
        document.getElementById('downloadImage').addEventListener('click', () => this.downloadImage());

        // Preset filters
        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.applyPreset(e.target.dataset.preset);
            });
        });
    }

    setupFilterControls() {
        const filterInputs = ['brightness', 'contrast', 'saturation', 'hue', 'blur', 'sepia', 'grayscale'];
        
        filterInputs.forEach(filter => {
            const input = document.getElementById(filter);
            const valueSpan = input.parentNode.querySelector('.value');
            
            input.addEventListener('input', (e) => {
                const value = e.target.value;
                this.filters[filter] = value;
                
                // Update display value
                const unit = filter === 'hue' ? '°' : filter === 'blur' ? 'px' : '%';
                valueSpan.textContent = value + unit;
                
                this.applyFilters();
            });
        });
    }

    scanForImages() {
        // Scan document for images
        const images = document.querySelectorAll('img:not(#lightboxImage):not(.thumbnail)');
        
        images.forEach((img, index) => {
            // Skip if already has lightbox listener
            if (img.hasAttribute('data-lightbox-enabled')) return;
            
            img.style.cursor = 'pointer';
            img.setAttribute('data-lightbox-enabled', 'true');
            img.setAttribute('data-lightbox-index', index);
            
            img.addEventListener('click', () => {
                this.openLightbox(img.src, img.alt || `Image ${index + 1}`, index);
            });
            
            this.images.push({
                src: img.src,
                alt: img.alt || `Image ${index + 1}`,
                element: img
            });
        });
    }

    addThumbnailControls() {
        // Add floating thumbnail control button
        const thumbnailControl = document.createElement('div');
        thumbnailControl.innerHTML = `
            <button id="lightboxTrigger" style="
                position: fixed;
                bottom: 20px;
                right: 20px;
                background: #007acc;
                color: white;
                border: none;
                border-radius: 50%;
                width: 60px;
                height: 60px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 20px rgba(0, 122, 204, 0.3);
                z-index: 1000;
                transition: all 0.3s ease;
            ">🖼️</button>
        `;
        
        document.body.appendChild(thumbnailControl);
        
        const button = document.getElementById('lightboxTrigger');
        button.addEventListener('click', () => {
            if (this.images.length > 0) {
                this.openLightbox(this.images[0].src, this.images[0].alt, 0);
            }
        });
        
        button.addEventListener('mouseenter', () => {
            button.style.transform = 'scale(1.1)';
            button.style.background = '#0066aa';
        });
        
        button.addEventListener('mouseleave', () => {
            button.style.transform = 'scale(1)';
            button.style.background = '#007acc';
        });
    }

    openLightbox(src, alt, index) {
        const lightbox = document.getElementById('advancedLightbox');
        const lightboxImage = document.getElementById('lightboxImage');
        const imageCounter = document.getElementById('imageCounter');
        const imageName = document.getElementById('imageName');
        
        this.currentIndex = index;
        
        lightboxImage.src = src;
        lightboxImage.alt = alt;
        imageCounter.textContent = `${index + 1} / ${this.images.length}`;
        imageName.textContent = alt;
        
        this.resetFilters();
        this.updateThumbnails();
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeLightbox() {
        const lightbox = document.getElementById('advancedLightbox');
        const editorPanel = document.getElementById('editorPanel');
        
        lightbox.classList.remove('active');
        editorPanel.classList.remove('active');
        document.body.style.overflow = '';
        
        this.isEditing = false;
        this.resetFilters();
    }

    nextImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.loadCurrentImage();
    }

    previousImage() {
        if (this.images.length === 0) return;
        
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.loadCurrentImage();
    }

    loadCurrentImage() {
        const current = this.images[this.currentIndex];
        const lightboxImage = document.getElementById('lightboxImage');
        const imageCounter = document.getElementById('imageCounter');
        const imageName = document.getElementById('imageName');
        
        lightboxImage.src = current.src;
        lightboxImage.alt = current.alt;
        imageCounter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
        imageName.textContent = current.alt;
        
        this.resetFilters();
        this.updateThumbnails();
    }

    updateThumbnails() {
        const thumbnailStrip = document.getElementById('thumbnailStrip');
        
        thumbnailStrip.innerHTML = '';
        
        this.images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image.src;
            thumbnail.alt = image.alt;
            thumbnail.className = 'thumbnail';
            
            if (index === this.currentIndex) {
                thumbnail.classList.add('active');
            }
            
            thumbnail.addEventListener('click', () => {
                this.currentIndex = index;
                this.loadCurrentImage();
            });
            
            thumbnailStrip.appendChild(thumbnail);
        });
    }

    toggleEditor() {
        const editorPanel = document.getElementById('editorPanel');
        const editorControls = document.getElementById('editorControls');
        const editorToggle = document.getElementById('toggleEditor');
        
        this.isEditing = !this.isEditing;
        
        if (this.isEditing) {
            editorPanel.classList.add('active');
            editorControls.classList.add('active');
            editorToggle.textContent = '❌ Close';
        } else {
            editorPanel.classList.remove('active');
            editorControls.classList.remove('active');
            editorToggle.textContent = '✏️ Edit';
        }
    }

    applyFilters() {
        const lightboxImage = document.getElementById('lightboxImage');
        
        const filterString = `
            brightness(${this.filters.brightness}%)
            contrast(${this.filters.contrast}%)
            saturate(${this.filters.saturation}%)
            hue-rotate(${this.filters.hue}deg)
            blur(${this.filters.blur}px)
            sepia(${this.filters.sepia}%)
            grayscale(${this.filters.grayscale}%)
        `;
        
        lightboxImage.style.filter = filterString;
    }

    resetFilters() {
        this.filters = {
            brightness: 100,
            contrast: 100,
            saturation: 100,
            hue: 0,
            blur: 0,
            sepia: 0,
            grayscale: 0
        };
        
        // Update UI controls
        Object.keys(this.filters).forEach(filter => {
            const input = document.getElementById(filter);
            const valueSpan = input?.parentNode?.querySelector('.value');
            
            if (input) {
                input.value = this.filters[filter];
                if (valueSpan) {
                    const unit = filter === 'hue' ? '°' : filter === 'blur' ? 'px' : '%';
                    valueSpan.textContent = this.filters[filter] + unit;
                }
            }
        });
        
        this.applyFilters();
    }

    applyPreset(preset) {
        const presets = {
            vintage: { brightness: 110, contrast: 130, saturation: 80, sepia: 30, hue: 10 },
            bw: { brightness: 100, contrast: 120, saturation: 0, sepia: 0, hue: 0, grayscale: 100 },
            warm: { brightness: 110, contrast: 105, saturation: 120, hue: 15, sepia: 10 },
            cool: { brightness: 95, contrast: 110, saturation: 90, hue: 200, sepia: 0 },
            dramatic: { brightness: 80, contrast: 150, saturation: 130, hue: 0, sepia: 0 },
            soft: { brightness: 120, contrast: 80, saturation: 110, blur: 1, sepia: 5 }
        };
        
        const presetValues = presets[preset];
        if (!presetValues) return;
        
        Object.keys(presetValues).forEach(filter => {
            this.filters[filter] = presetValues[filter];
            
            const input = document.getElementById(filter);
            const valueSpan = input?.parentNode?.querySelector('.value');
            
            if (input) {
                input.value = presetValues[filter];
                if (valueSpan) {
                    const unit = filter === 'hue' ? '°' : filter === 'blur' ? 'px' : '%';
                    valueSpan.textContent = presetValues[filter] + unit;
                }
            }
        });
        
        this.applyFilters();
        this.showNotification(`✨ Applied ${preset} preset!`, 'success');
    }

    saveImage() {
        this.showNotification('💾 Image saved to gallery!', 'success');
        // In a real implementation, this would save to local storage or server
    }

    downloadImage() {
        const lightboxImage = document.getElementById('lightboxImage');
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = lightboxImage.naturalWidth;
        canvas.height = lightboxImage.naturalHeight;
        
        // Apply filters to canvas
        ctx.filter = lightboxImage.style.filter;
        ctx.drawImage(lightboxImage, 0, 0);
        
        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `edited-image-${Date.now()}.png`;
            a.click();
            URL.revokeObjectURL(url);
            
            this.showNotification('📥 Image downloaded!', 'success');
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 12px 24px;
            border-radius: 25px;
            color: white;
            font-weight: 500;
            z-index: 10002;
            animation: slideDown 0.3s ease;
            background: ${type === 'success' ? '#059669' : type === 'error' ? '#dc2626' : '#2563eb'};
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Method to add images dynamically
    addImage(src, alt) {
        const img = document.createElement('img');
        img.src = src;
        img.alt = alt || `Image ${this.images.length + 1}`;
        img.style.cursor = 'pointer';
        img.setAttribute('data-lightbox-enabled', 'true');
        img.setAttribute('data-lightbox-index', this.images.length);
        
        const index = this.images.length;
        img.addEventListener('click', () => {
            this.openLightbox(img.src, img.alt, index);
        });
        
        this.images.push({
            src: img.src,
            alt: img.alt,
            element: img
        });
        
        return img;
    }

    // Method to refresh image scanning
    refreshImages() {
        this.images = [];
        this.scanForImages();
    }
}

// Add slide animations
const slideAnimations = `
    @keyframes slideDown {
        from { transform: translate(-50%, -100%); opacity: 0; }
        to { transform: translate(-50%, 0); opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translate(-50%, 0); opacity: 1; }
        to { transform: translate(-50%, -100%); opacity: 0; }
    }
`;

const animationStyle = document.createElement('style');
animationStyle.textContent = slideAnimations;
document.head.appendChild(animationStyle);

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const lightbox = new AdvancedLightbox();
    
    // Make it globally accessible
    window.AdvancedLightbox = lightbox;
    
    console.log('🖼️ Advanced Lightbox Gallery Loaded!');
});

// Export for use in modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedLightbox;
}