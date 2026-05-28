let expression = '';

function updateDisplay(val) {
  document.getElementById('display').textContent = val;
}
function updateExpr(val) {
  document.getElementById('expr').textContent = val;
}

function append(val) {
  const ops = ['+', '-', '*', '/'];
  const lastChar = expression.slice(-1);
  if (ops.includes(val) && ops.includes(lastChar)) {
    expression = expression.slice(0, -1);
  }
  if (val === '.' && lastChar === '.') return;
  expression += val;
  let display = expression.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−');
  updateDisplay(expression.slice(-12) || '0');
  updateExpr(display);
}

function clearAll() {
  expression = '';
  updateDisplay('0');
  updateExpr('');
}

function deleteLast() {
  expression = expression.slice(0, -1);
  let display = expression.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−');
  updateDisplay(expression || '0');
  updateExpr(display);
}

function calculate() {
  if (!expression) return;
  try {
    let display = expression.replace(/\*/g,'×').replace(/\//g,'÷').replace(/-/g,'−');
    updateExpr(display + ' =');
    let result = Function('"use strict"; return (' + expression + ')')();
    result = parseFloat(result.toFixed(10));
    updateDisplay(result);
    expression = String(result);
  } catch {
    updateDisplay('Error');
    expression = '';
  }
}

document.addEventListener('keydown', (e) => {
  if ('0123456789.+-*/'.includes(e.key)) append(e.key);
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearAll();
});
