// Theme Switcher JavaScript
class ThemeSwitcher {
    constructor() {
        this.currentTheme = localStorage.getItem('theme') || 'light';
        this.init();
    }

    init() {
        this.createThemeSwitcher();
        this.applyTheme();
        this.bindEvents();
        this.addKeyboardShortcuts();
    }

    createThemeSwitcher() {
        const themeSwitcher = document.createElement('div');
        themeSwitcher.className = 'theme-switcher';
        themeSwitcher.innerHTML = `
            <span class="theme-label">🌞</span>
            <div class="theme-toggle ${this.currentTheme === 'dark' ? 'dark' : ''}" id="themeToggle"></div>
            <span class="theme-label">🌙</span>
        `;
        
        document.body.appendChild(themeSwitcher);
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        
        // Update toggle appearance
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            if (this.currentTheme === 'dark') {
                toggle.classList.add('dark');
            } else {
                toggle.classList.remove('dark');
            }
        }
        
        // Store preference
        localStorage.setItem('theme', this.currentTheme);
        
        // Dispatch theme change event
        window.dispatchEvent(new CustomEvent('themeChanged', { 
            detail: { theme: this.currentTheme } 
        }));
    }

    toggleTheme() {
        const toggle = document.getElementById('themeToggle');
        
        // Add switching animation
        toggle.classList.add('switching');
        setTimeout(() => toggle.classList.remove('switching'), 300);
        
        // Toggle theme
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        
        // Add some visual feedback
        this.showThemeChangeNotification();
    }

    showThemeChangeNotification() {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            z-index: 1001;
            font-size: 14px;
            opacity: 0;
            transition: opacity 0.3s ease;
            backdrop-filter: blur(10px);
        `;
        
        const themeIcon = this.currentTheme === 'dark' ? '🌙' : '🌞';
        const themeName = this.currentTheme === 'dark' ? 'Dark' : 'Light';
        notification.textContent = `${themeIcon} ${themeName} theme activated`;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.style.opacity = '1', 10);
        
        // Remove after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    bindEvents() {
        // Click event for theme toggle
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }
    }

    addKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Shift + T to toggle theme
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'T') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // Method to get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Method to set theme programmatically
    setTheme(theme) {
        if (['light', 'dark'].includes(theme)) {
            this.currentTheme = theme;
            this.applyTheme();
        }
    }
}

// Auto-detect system preference if no saved preference
function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    return 'light';
}

// Enhanced theme transition effects
function addThemeTransitionEffects() {
    // Add smooth transition styles
    const style = document.createElement('style');
    style.textContent = `
        * {
            transition: background-color 0.3s ease, 
                       border-color 0.3s ease, 
                       color 0.3s ease,
                       box-shadow 0.3s ease !important;
        }
        
        .theme-transition-disable * {
            transition: none !important;
        }
    `;
    document.head.appendChild(style);
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    addThemeTransitionEffects();
    
    // Set initial theme based on preference
    const initialTheme = getInitialTheme();
    localStorage.setItem('theme', initialTheme);
    
    // Initialize theme switcher
    const themeSwitcher = new ThemeSwitcher();
    
    // Make theme switcher globally available
    window.themeSwitcher = themeSwitcher;
    
    // Add welcome message for theme feature
    setTimeout(() => {
        const hasSeenThemeWelcome = localStorage.getItem('hasSeenThemeWelcome');
        if (!hasSeenThemeWelcome) {
            const welcomeMsg = document.createElement('div');
            welcomeMsg.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 20px 30px;
                border-radius: 15px;
                z-index: 1002;
                text-align: center;
                backdrop-filter: blur(15px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            welcomeMsg.innerHTML = `
                <h3 style="margin: 0 0 10px 0; font-size: 18px;">🎨 New Feature!</h3>
                <p style="margin: 0 0 15px 0; font-size: 14px;">Toggle between light and dark themes</p>
                <p style="margin: 0; font-size: 12px; opacity: 0.8;">Use the switch in the top-right corner or press Ctrl+Shift+T</p>
                <button onclick="this.parentElement.remove(); localStorage.setItem('hasSeenThemeWelcome', 'true');" 
                        style="margin-top: 15px; padding: 8px 16px; background: white; color: black; border: none; border-radius: 20px; cursor: pointer; font-size: 12px;">
                    Got it!
                </button>
            `;
            
            document.body.appendChild(welcomeMsg);
            setTimeout(() => welcomeMsg.style.opacity = '1', 10);
        }
    }, 1000);
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ThemeSwitcher;
}