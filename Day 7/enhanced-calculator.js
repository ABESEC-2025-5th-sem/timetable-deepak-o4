// Enhanced Calculator with History and Advanced Features
class EnhancedCalculator {
    constructor() {
        this.display = document.getElementById('display');
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
        this.waitingForOperand = false;
        this.history = [];
        this.memory = 0;
        this.initializeButtons();
        this.initializeKeyboard();
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.currentInput;
    }

    inputNumber(number) {
        if (this.waitingForOperand) {
            this.currentInput = number;
            this.waitingForOperand = false;
        } else {
            this.currentInput = this.currentInput === '0' ? number : this.currentInput + number;
        }
        this.updateDisplay();
    }

    inputOperator(nextOperator) {
        const inputValue = parseFloat(this.currentInput);

        if (this.previousInput === null) {
            this.previousInput = inputValue;
        } else if (this.operator) {
            const result = this.calculate();
            
            // Add to history
            this.addToHistory(`${this.previousInput} ${this.operator} ${this.currentInput} = ${result}`);
            
            this.currentInput = String(result);
            this.previousInput = result;
            this.updateDisplay();
        }

        this.waitingForOperand = true;
        this.operator = nextOperator;
    }

    calculate() {
        const prev = parseFloat(this.previousInput);
        const current = parseFloat(this.currentInput);

        switch(this.operator) {
            case '+': return prev + current;
            case '-': return prev - current;
            case '*': return prev * current;
            case '/': return current !== 0 ? prev / current : 'Error';
            case '%': return prev % current;
            case '^': return Math.pow(prev, current);
            default: return current;
        }
    }

    inputEquals() {
        if (this.operator && !this.waitingForOperand) {
            const result = this.calculate();
            
            // Add to history
            this.addToHistory(`${this.previousInput} ${this.operator} ${this.currentInput} = ${result}`);
            
            this.currentInput = String(result);
            this.previousInput = null;
            this.operator = null;
            this.waitingForOperand = true;
            this.updateDisplay();
        }
    }

    clear() {
        this.currentInput = '0';
        this.previousInput = null;
        this.operator = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    clearAll() {
        this.clear();
        this.history = [];
        this.updateHistory();
    }

    backspace() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
        this.updateDisplay();
    }

    addToHistory(calculation) {
        this.history.push(calculation);
        if (this.history.length > 10) {
            this.history.shift();
        }
        this.updateHistory();
    }

    updateHistory() {
        const historyDiv = document.getElementById('history');
        if (historyDiv) {
            historyDiv.innerHTML = this.history
                .slice(-5)
                .map(item => `<div class="history-item">${item}</div>`)
                .join('');
        }
    }

    toggleSign() {
        if (this.currentInput !== '0') {
            this.currentInput = this.currentInput.startsWith('-') 
                ? this.currentInput.slice(1) 
                : '-' + this.currentInput;
            this.updateDisplay();
        }
    }

    inputDecimal() {
        if (!this.currentInput.includes('.')) {
            this.currentInput += '.';
            this.updateDisplay();
        }
    }

    square() {
        const value = parseFloat(this.currentInput);
        this.currentInput = String(value * value);
        this.updateDisplay();
    }

    sqrt() {
        const value = parseFloat(this.currentInput);
        this.currentInput = String(Math.sqrt(value));
        this.updateDisplay();
    }

    initializeButtons() {
        const buttons = document.querySelectorAll('button');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;
                
                if (!isNaN(value)) {
                    this.inputNumber(value);
                } else {
                    switch(value) {
                        case '+':
                        case '-':
                        case '*':
                        case '/':
                        case '%':
                        case '^':
                            this.inputOperator(value);
                            break;
                        case '=':
                            this.inputEquals();
                            break;
                        case 'C':
                            this.clear();
                            break;
                        case 'AC':
                            this.clearAll();
                            break;
                        case '←':
                            this.backspace();
                            break;
                        case '.':
                            this.inputDecimal();
                            break;
                        case '±':
                            this.toggleSign();
                            break;
                        case 'x²':
                            this.square();
                            break;
                        case '√':
                            this.sqrt();
                            break;
                    }
                }
            });
        });
    }

    initializeKeyboard() {
        document.addEventListener('keydown', (event) => {
            if (!isNaN(event.key)) {
                this.inputNumber(event.key);
            } else {
                switch(event.key) {
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        this.inputOperator(event.key);
                        break;
                    case 'Enter':
                    case '=':
                        this.inputEquals();
                        break;
                    case 'Escape':
                    case 'c':
                    case 'C':
                        this.clear();
                        break;
                    case 'Backspace':
                        this.backspace();
                        break;
                    case '.':
                        this.inputDecimal();
                        break;
                }
            }
        });
    }
}

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new EnhancedCalculator();
});