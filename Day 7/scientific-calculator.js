// Scientific Calculator Extension
class ScientificCalculator extends EnhancedCalculator {
    constructor() {
        super();
        this.angleUnit = 'deg'; // 'deg', 'rad', 'grad'
        this.isInverse = false;
        this.constants = {
            pi: Math.PI,
            e: Math.E,
            phi: (1 + Math.sqrt(5)) / 2, // Golden ratio
            sqrt2: Math.sqrt(2)
        };
        this.initializeScientificFeatures();
    }

    initializeScientificFeatures() {
        this.createScientificPanel();
        this.createConstantsPanel();
        this.createUnitConverter();
        this.createGraphPlotter();
        this.addScientificKeyboardShortcuts();
        this.createEquationSolver();
    }

    createScientificPanel() {
        const scientificPanel = document.createElement('div');
        scientificPanel.className = 'scientific-panel';
        scientificPanel.innerHTML = `
            <div class="panel-header">
                <h3>🔬 Scientific Functions</h3>
                <div class="mode-toggles">
                    <button id="angleUnit" class="mode-btn active">${this.angleUnit.toUpperCase()}</button>
                    <button id="inverseMode" class="mode-btn">INV</button>
                    <button id="hyperbolicMode" class="mode-btn">HYP</button>
                </div>
            </div>
            
            <div class="function-grid">
                <!-- Trigonometric Functions -->
                <div class="function-group">
                    <h4>Trigonometry</h4>
                    <button class="sci-btn" data-function="sin">sin</button>
                    <button class="sci-btn" data-function="cos">cos</button>
                    <button class="sci-btn" data-function="tan">tan</button>
                    <button class="sci-btn" data-function="asin">asin</button>
                    <button class="sci-btn" data-function="acos">acos</button>
                    <button class="sci-btn" data-function="atan">atan</button>
                </div>
                
                <!-- Logarithmic Functions -->
                <div class="function-group">
                    <h4>Logarithms</h4>
                    <button class="sci-btn" data-function="ln">ln</button>
                    <button class="sci-btn" data-function="log">log</button>
                    <button class="sci-btn" data-function="log2">log₂</button>
                    <button class="sci-btn" data-function="exp">eˣ</button>
                    <button class="sci-btn" data-function="exp10">10ˣ</button>
                    <button class="sci-btn" data-function="exp2">2ˣ</button>
                </div>
                
                <!-- Power & Root Functions -->
                <div class="function-group">
                    <h4>Powers & Roots</h4>
                    <button class="sci-btn" data-function="square">x²</button>
                    <button class="sci-btn" data-function="cube">x³</button>
                    <button class="sci-btn" data-function="power">xʸ</button>
                    <button class="sci-btn" data-function="sqrt">√x</button>
                    <button class="sci-btn" data-function="cbrt">∛x</button>
                    <button class="sci-btn" data-function="nthroot">ⁿ√x</button>
                </div>
                
                <!-- Statistical Functions -->
                <div class="function-group">
                    <h4>Statistics</h4>
                    <button class="sci-btn" data-function="factorial">n!</button>
                    <button class="sci-btn" data-function="gamma">Γ(x)</button>
                    <button class="sci-btn" data-function="combination">nCr</button>
                    <button class="sci-btn" data-function="permutation">nPr</button>
                    <button class="sci-btn" data-function="random">rand</button>
                    <button class="sci-btn" data-function="round">round</button>
                </div>
                
                <!-- Advanced Functions -->
                <div class="function-group">
                    <h4>Advanced</h4>
                    <button class="sci-btn" data-function="abs">|x|</button>
                    <button class="sci-btn" data-function="floor">⌊x⌋</button>
                    <button class="sci-btn" data-function="ceil">⌈x⌉</button>
                    <button class="sci-btn" data-function="frac">frac</button>
                    <button class="sci-btn" data-function="mod">mod</button>
                    <button class="sci-btn" data-function="gcd">gcd</button>
                </div>
            </div>
        `;
        
        document.querySelector('.calculator-container').appendChild(scientificPanel);
        this.bindScientificEvents();
    }

    createConstantsPanel() {
        const constantsPanel = document.createElement('div');
        constantsPanel.className = 'constants-panel';
        constantsPanel.innerHTML = `
            <div class="panel-header">
                <h3>📊 Constants & Variables</h3>
            </div>
            <div class="constants-grid">
                <button class="const-btn" data-constant="pi">π</button>
                <button class="const-btn" data-constant="e">e</button>
                <button class="const-btn" data-constant="phi">φ</button>
                <button class="const-btn" data-constant="sqrt2">√2</button>
                <button class="const-btn" data-action="store-var">STO</button>
                <button class="const-btn" data-action="recall-var">RCL</button>
            </div>
            <div class="variable-storage">
                <h4>Variables</h4>
                <div id="variableList"></div>
                <input type="text" id="variableName" placeholder="Variable name" maxlength="10">
            </div>
        `;
        
        document.querySelector('.calculator-container').appendChild(constantsPanel);
        this.variables = {};
    }

    createUnitConverter() {
        const converterPanel = document.createElement('div');
        converterPanel.className = 'unit-converter';
        converterPanel.innerHTML = `
            <div class="panel-header">
                <h3>🔄 Unit Converter</h3>
            </div>
            <div class="converter-content">
                <select id="conversionType">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                    <option value="area">Area</option>
                    <option value="volume">Volume</option>
                    <option value="speed">Speed</option>
                    <option value="energy">Energy</option>
                </select>
                <div class="conversion-row">
                    <input type="number" id="fromValue" placeholder="From">
                    <select id="fromUnit"></select>
                </div>
                <div class="conversion-arrow">⇓</div>
                <div class="conversion-row">
                    <input type="number" id="toValue" placeholder="To" readonly>
                    <select id="toUnit"></select>
                </div>
                <button id="convertBtn">Convert</button>
            </div>
        `;
        
        document.querySelector('.calculator-container').appendChild(converterPanel);
        this.initializeUnitConversions();
    }

    createGraphPlotter() {
        const graphPanel = document.createElement('div');
        graphPanel.className = 'graph-plotter';
        graphPanel.innerHTML = `
            <div class="panel-header">
                <h3>📈 Function Plotter</h3>
            </div>
            <div class="plot-content">
                <input type="text" id="functionInput" placeholder="Enter function: f(x) = x^2 + 2*x + 1">
                <div class="plot-controls">
                    <label>X Range: <input type="number" id="xMin" value="-10"> to <input type="number" id="xMax" value="10"></label>
                    <button id="plotFunction">Plot</button>
                    <button id="clearPlot">Clear</button>
                </div>
                <canvas id="functionCanvas" width="300" height="200"></canvas>
                <div class="function-analysis">
                    <h4>Analysis</h4>
                    <div id="functionInfo"></div>
                </div>
            </div>
        `;
        
        document.querySelector('.calculator-container').appendChild(graphPanel);
        this.initializePlotter();
    }

    createEquationSolver() {
        const solverPanel = document.createElement('div');
        solverPanel.className = 'equation-solver';
        solverPanel.innerHTML = `
            <div class="panel-header">
                <h3>🔍 Equation Solver</h3>
            </div>
            <div class="solver-content">
                <div class="equation-type">
                    <select id="equationType">
                        <option value="linear">Linear (ax + b = 0)</option>
                        <option value="quadratic">Quadratic (ax² + bx + c = 0)</option>
                        <option value="cubic">Cubic (ax³ + bx² + cx + d = 0)</option>
                        <option value="system">System of Equations</option>
                    </select>
                </div>
                <div id="equationInputs"></div>
                <button id="solveEquation">Solve</button>
                <div id="solutionDisplay"></div>
            </div>
        `;
        
        document.querySelector('.calculator-container').appendChild(solverPanel);
        this.initializeEquationSolver();
    }

    bindScientificEvents() {
        // Scientific function buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('sci-btn')) {
                this.executeScientificFunction(e.target.dataset.function);
            }
            
            if (e.target.classList.contains('const-btn')) {
                if (e.target.dataset.constant) {
                    this.inputConstant(e.target.dataset.constant);
                } else if (e.target.dataset.action) {
                    this.executeConstantAction(e.target.dataset.action);
                }
            }
        });

        // Mode toggles
        document.getElementById('angleUnit')?.addEventListener('click', () => {
            this.toggleAngleUnit();
        });

        document.getElementById('inverseMode')?.addEventListener('click', () => {
            this.toggleInverseMode();
        });
    }

    executeScientificFunction(funcName) {
        const value = parseFloat(this.currentInput);
        let result;

        try {
            switch(funcName) {
                // Trigonometric functions
                case 'sin':
                    result = this.isInverse ? 
                        this.radToDeg(Math.asin(value)) : 
                        Math.sin(this.degToRad(value));
                    break;
                case 'cos':
                    result = this.isInverse ? 
                        this.radToDeg(Math.acos(value)) : 
                        Math.cos(this.degToRad(value));
                    break;
                case 'tan':
                    result = this.isInverse ? 
                        this.radToDeg(Math.atan(value)) : 
                        Math.tan(this.degToRad(value));
                    break;
                case 'asin':
                    result = this.radToDeg(Math.asin(value));
                    break;
                case 'acos':
                    result = this.radToDeg(Math.acos(value));
                    break;
                case 'atan':
                    result = this.radToDeg(Math.atan(value));
                    break;

                // Logarithmic functions
                case 'ln':
                    result = Math.log(value);
                    break;
                case 'log':
                    result = Math.log10(value);
                    break;
                case 'log2':
                    result = Math.log2(value);
                    break;
                case 'exp':
                    result = Math.exp(value);
                    break;
                case 'exp10':
                    result = Math.pow(10, value);
                    break;
                case 'exp2':
                    result = Math.pow(2, value);
                    break;

                // Power functions
                case 'square':
                    result = Math.pow(value, 2);
                    break;
                case 'cube':
                    result = Math.pow(value, 3);
                    break;
                case 'sqrt':
                    result = Math.sqrt(value);
                    break;
                case 'cbrt':
                    result = Math.cbrt(value);
                    break;

                // Statistical functions
                case 'factorial':
                    result = this.factorial(Math.floor(value));
                    break;
                case 'gamma':
                    result = this.gamma(value);
                    break;
                case 'random':
                    result = Math.random();
                    break;
                case 'round':
                    result = Math.round(value);
                    break;

                // Advanced functions
                case 'abs':
                    result = Math.abs(value);
                    break;
                case 'floor':
                    result = Math.floor(value);
                    break;
                case 'ceil':
                    result = Math.ceil(value);
                    break;
                case 'frac':
                    result = value - Math.floor(value);
                    break;

                default:
                    throw new Error('Unknown function');
            }

            this.addToHistory(`${funcName}(${value}) = ${result}`);
            this.currentInput = String(result);
            this.updateDisplay();
            
        } catch (error) {
            this.currentInput = 'Error';
            this.updateDisplay();
            setTimeout(() => {
                this.currentInput = '0';
                this.updateDisplay();
            }, 2000);
        }
    }

    degToRad(degrees) {
        if (this.angleUnit === 'rad') return degrees;
        if (this.angleUnit === 'grad') return degrees * Math.PI / 200;
        return degrees * Math.PI / 180;
    }

    radToDeg(radians) {
        if (this.angleUnit === 'rad') return radians;
        if (this.angleUnit === 'grad') return radians * 200 / Math.PI;
        return radians * 180 / Math.PI;
    }

    factorial(n) {
        if (n < 0) throw new Error('Negative factorial');
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    gamma(z) {
        // Approximation of Gamma function using Lanczos approximation
        const g = 7;
        const C = [0.99999999999980993,
                   676.5203681218851,
                   -1259.1392167224028,
                   771.32342877765313,
                   -176.61502916214059,
                   12.507343278686905,
                   -0.13857109526572012,
                   9.9843695780195716e-6,
                   1.5056327351493116e-7];

        if (z < 0.5) {
            return Math.PI / (Math.sin(Math.PI * z) * this.gamma(1 - z));
        }

        z -= 1;
        let x = C[0];
        for (let i = 1; i < g + 2; i++) {
            x += C[i] / (z + i);
        }

        const t = z + g + 0.5;
        const sqrt2pi = Math.sqrt(2 * Math.PI);

        return sqrt2pi * Math.pow(t, (z + 0.5)) * Math.exp(-t) * x;
    }

    toggleAngleUnit() {
        const units = ['deg', 'rad', 'grad'];
        const currentIndex = units.indexOf(this.angleUnit);
        this.angleUnit = units[(currentIndex + 1) % units.length];
        document.getElementById('angleUnit').textContent = this.angleUnit.toUpperCase();
    }

    toggleInverseMode() {
        this.isInverse = !this.isInverse;
        const button = document.getElementById('inverseMode');
        button.classList.toggle('active', this.isInverse);
    }

    inputConstant(constantName) {
        const value = this.constants[constantName];
        this.currentInput = String(value);
        this.updateDisplay();
    }

    executeConstantAction(action) {
        if (action === 'store-var') {
            const varName = document.getElementById('variableName').value;
            if (varName) {
                this.variables[varName] = parseFloat(this.currentInput);
                this.updateVariableList();
                document.getElementById('variableName').value = '';
            }
        } else if (action === 'recall-var') {
            // Show variable selection dialog
            this.showVariableDialog();
        }
    }

    updateVariableList() {
        const list = document.getElementById('variableList');
        list.innerHTML = '';
        Object.keys(this.variables).forEach(varName => {
            const varElement = document.createElement('div');
            varElement.className = 'variable-item';
            varElement.innerHTML = `
                <span>${varName} = ${this.variables[varName]}</span>
                <button onclick="this.parentElement.remove(); delete window.calculator.variables['${varName}']">×</button>
            `;
            list.appendChild(varElement);
        });
    }

    initializeUnitConversions() {
        const conversions = {
            length: {
                meter: 1,
                kilometer: 1000,
                centimeter: 0.01,
                millimeter: 0.001,
                inch: 0.0254,
                foot: 0.3048,
                yard: 0.9144,
                mile: 1609.344
            },
            weight: {
                kilogram: 1,
                gram: 0.001,
                pound: 0.453592,
                ounce: 0.0283495,
                ton: 1000,
                stone: 6.35029
            },
            temperature: {
                celsius: (val, to) => to === 'fahrenheit' ? val * 9/5 + 32 : val + 273.15,
                fahrenheit: (val, to) => to === 'celsius' ? (val - 32) * 5/9 : (val - 32) * 5/9 + 273.15,
                kelvin: (val, to) => to === 'celsius' ? val - 273.15 : (val - 273.15) * 9/5 + 32
            }
        };

        this.conversions = conversions;
        this.updateUnitOptions();
    }

    updateUnitOptions() {
        const type = document.getElementById('conversionType').value;
        const fromUnit = document.getElementById('fromUnit');
        const toUnit = document.getElementById('toUnit');
        
        fromUnit.innerHTML = '';
        toUnit.innerHTML = '';
        
        Object.keys(this.conversions[type]).forEach(unit => {
            fromUnit.add(new Option(unit, unit));
            toUnit.add(new Option(unit, unit));
        });
    }

    initializePlotter() {
        const canvas = document.getElementById('functionCanvas');
        this.plotContext = canvas.getContext('2d');
        
        document.getElementById('plotFunction').addEventListener('click', () => {
            this.plotFunction();
        });
    }

    plotFunction() {
        const funcString = document.getElementById('functionInput').value;
        const xMin = parseFloat(document.getElementById('xMin').value);
        const xMax = parseFloat(document.getElementById('xMax').value);
        
        try {
            // Simple function parser and plotter
            const canvas = document.getElementById('functionCanvas');
            const ctx = this.plotContext;
            
            // Clear canvas
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Draw axes
            ctx.strokeStyle = '#ccc';
            ctx.beginPath();
            ctx.moveTo(0, canvas.height / 2);
            ctx.lineTo(canvas.width, canvas.height / 2);
            ctx.moveTo(canvas.width / 2, 0);
            ctx.lineTo(canvas.width / 2, canvas.height);
            ctx.stroke();
            
            // Plot function
            ctx.strokeStyle = '#04AA6D';
            ctx.beginPath();
            
            for (let px = 0; px < canvas.width; px++) {
                const x = xMin + (xMax - xMin) * px / canvas.width;
                const y = this.evaluateFunction(funcString, x);
                
                if (!isNaN(y) && isFinite(y)) {
                    const py = canvas.height / 2 - y * 20; // Scale factor
                    if (px === 0) {
                        ctx.moveTo(px, py);
                    } else {
                        ctx.lineTo(px, py);
                    }
                }
            }
            
            ctx.stroke();
            
        } catch (error) {
            console.error('Error plotting function:', error);
        }
    }

    evaluateFunction(funcString, x) {
        // Simple function evaluator - replace with proper math parser for production
        try {
            const expression = funcString
                .replace(/x/g, x)
                .replace(/\^/g, '**')
                .replace(/sin/g, 'Math.sin')
                .replace(/cos/g, 'Math.cos')
                .replace(/tan/g, 'Math.tan')
                .replace(/ln/g, 'Math.log')
                .replace(/log/g, 'Math.log10')
                .replace(/sqrt/g, 'Math.sqrt');
            
            return eval(expression);
        } catch (error) {
            return NaN;
        }
    }

    initializeEquationSolver() {
        document.getElementById('equationType').addEventListener('change', () => {
            this.updateEquationInputs();
        });
        
        document.getElementById('solveEquation').addEventListener('click', () => {
            this.solveEquation();
        });
        
        this.updateEquationInputs();
    }

    updateEquationInputs() {
        const type = document.getElementById('equationType').value;
        const inputsDiv = document.getElementById('equationInputs');
        
        switch(type) {
            case 'linear':
                inputsDiv.innerHTML = `
                    <div>ax + b = 0</div>
                    <input type="number" id="linearA" placeholder="a"> x + 
                    <input type="number" id="linearB" placeholder="b"> = 0
                `;
                break;
            case 'quadratic':
                inputsDiv.innerHTML = `
                    <div>ax² + bx + c = 0</div>
                    <input type="number" id="quadA" placeholder="a"> x² + 
                    <input type="number" id="quadB" placeholder="b"> x + 
                    <input type="number" id="quadC" placeholder="c"> = 0
                `;
                break;
        }
    }

    solveEquation() {
        const type = document.getElementById('equationType').value;
        const solutionDiv = document.getElementById('solutionDisplay');
        
        try {
            let solution;
            
            switch(type) {
                case 'linear':
                    const a = parseFloat(document.getElementById('linearA').value);
                    const b = parseFloat(document.getElementById('linearB').value);
                    solution = this.solveLinear(a, b);
                    break;
                case 'quadratic':
                    const qa = parseFloat(document.getElementById('quadA').value);
                    const qb = parseFloat(document.getElementById('quadB').value);
                    const qc = parseFloat(document.getElementById('quadC').value);
                    solution = this.solveQuadratic(qa, qb, qc);
                    break;
            }
            
            solutionDiv.innerHTML = `<h4>Solution:</h4><div>${solution}</div>`;
            
        } catch (error) {
            solutionDiv.innerHTML = `<h4>Error:</h4><div>${error.message}</div>`;
        }
    }

    solveLinear(a, b) {
        if (a === 0) {
            if (b === 0) return 'Infinite solutions';
            return 'No solution';
        }
        return `x = ${-b / a}`;
    }

    solveQuadratic(a, b, c) {
        if (a === 0) return this.solveLinear(b, c);
        
        const discriminant = b * b - 4 * a * c;
        
        if (discriminant > 0) {
            const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
            const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
            return `x₁ = ${x1}, x₂ = ${x2}`;
        } else if (discriminant === 0) {
            const x = -b / (2 * a);
            return `x = ${x} (double root)`;
        } else {
            const realPart = -b / (2 * a);
            const imagPart = Math.sqrt(-discriminant) / (2 * a);
            return `x₁ = ${realPart} + ${imagPart}i, x₂ = ${realPart} - ${imagPart}i`;
        }
    }

    addScientificKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 's':
                        e.preventDefault();
                        this.executeScientificFunction('sin');
                        break;
                    case 'c':
                        e.preventDefault();
                        this.executeScientificFunction('cos');
                        break;
                    case 't':
                        e.preventDefault();
                        this.executeScientificFunction('tan');
                        break;
                    case 'l':
                        e.preventDefault();
                        this.executeScientificFunction('ln');
                        break;
                    case 'p':
                        e.preventDefault();
                        this.inputConstant('pi');
                        break;
                    case 'e':
                        e.preventDefault();
                        this.inputConstant('e');
                        break;
                }
            }
        });
    }
}

// Initialize Scientific Calculator when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create scientific calculator styles
    const scientificStyles = `
        .scientific-panel, .constants-panel, .unit-converter, 
        .graph-plotter, .equation-solver {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 15px;
            padding: 20px;
            margin: 20px 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .panel-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .panel-header h3 {
            margin: 0;
            color: #04AA6D;
            font-size: 16px;
        }
        
        .mode-toggles {
            display: flex;
            gap: 5px;
        }
        
        .mode-btn {
            padding: 5px 10px;
            border: 1px solid rgba(255, 255, 255, 0.3);
            background: transparent;
            color: white;
            border-radius: 15px;
            cursor: pointer;
            font-size: 10px;
            transition: all 0.3s ease;
        }
        
        .mode-btn.active {
            background: #04AA6D;
            border-color: #04AA6D;
        }
        
        .function-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 15px;
        }
        
        .function-group h4 {
            color: #04AA6D;
            margin: 0 0 10px 0;
            font-size: 12px;
            text-transform: uppercase;
        }
        
        .sci-btn, .const-btn {
            padding: 8px 12px;
            margin: 2px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            border-radius: 8px;
            cursor: pointer;
            font-size: 11px;
            transition: all 0.3s ease;
        }
        
        .sci-btn:hover, .const-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateY(-2px);
        }
        
        .constants-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
            margin-bottom: 15px;
        }
        
        .variable-storage input {
            width: 100%;
            padding: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 5px;
            margin-top: 10px;
        }
        
        .converter-content select, .converter-content input {
            padding: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 5px;
            margin: 5px;
        }
        
        .conversion-row {
            display: flex;
            align-items: center;
            gap: 10px;
            margin: 10px 0;
        }
        
        .conversion-arrow {
            text-align: center;
            color: #04AA6D;
            font-size: 20px;
            margin: 10px 0;
        }
        
        #functionCanvas {
            border: 1px solid rgba(255, 255, 255, 0.3);
            border-radius: 5px;
            background: rgba(255, 255, 255, 0.05);
            margin: 10px 0;
        }
        
        .plot-controls {
            margin: 10px 0;
        }
        
        .plot-controls label {
            color: white;
            margin-right: 10px;
        }
        
        .plot-controls input {
            width: 60px;
            padding: 5px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 3px;
            margin: 0 5px;
        }
        
        #equationInputs {
            margin: 15px 0;
        }
        
        #equationInputs input {
            width: 60px;
            padding: 5px;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.3);
            color: white;
            border-radius: 3px;
            margin: 0 5px;
        }
        
        #solutionDisplay {
            margin-top: 15px;
            padding: 10px;
            background: rgba(4, 170, 109, 0.1);
            border-radius: 5px;
            border-left: 4px solid #04AA6D;
        }
        
        @media (max-width: 768px) {
            .function-grid {
                grid-template-columns: 1fr;
            }
            
            .scientific-panel, .constants-panel, .unit-converter,
            .graph-plotter, .equation-solver {
                padding: 15px;
                margin: 10px 0;
            }
        }
    `;
    
    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = scientificStyles;
    document.head.appendChild(styleSheet);
    
    // Replace existing calculator with scientific version
    if (window.calculator) {
        window.calculator = new ScientificCalculator();
    } else {
        // Wait a bit for the original calculator to load
        setTimeout(() => {
            window.calculator = new ScientificCalculator();
        }, 100);
    }
    
    console.log('🔬 Scientific Calculator Features Loaded!');
});