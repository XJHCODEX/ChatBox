let counterValue = 0;
const counterDisplay = document.getElementById('counterDisplay');

function increment() {
    counterValue++;
    updateDisplay();
}

function decrement() {
    counterValue--;
    updateDisplay();
}

function updateDisplay() {
    counterDisplay.textContent = counterValue;
}
