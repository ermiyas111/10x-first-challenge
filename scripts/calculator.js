document.addEventListener('DOMContentLoaded', ()=>{
  const display = document.getElementById('display');
  const keys = document.querySelector('.keys');

  keys.addEventListener('click', (e)=>{
    if (!e.target.matches('button')) return;
    const action = e.target.dataset.action;
    const value = e.target.dataset.value;

    if (action === 'clear') {
      display.value = '';
      return;
    }
    if (action === 'backspace') {
      display.value = display.value.slice(0, -1);
      return;
    }
    if (action === 'eval') {
      evaluate();
      return;
    }

    // append value (for numeric, operator, parens, dot)
    display.value += value;
  });

  // keyboard support
  window.addEventListener('keydown', (e)=>{
    const allowed = '0123456789+-*/().';
    if (e.key === 'Enter') { e.preventDefault(); evaluate(); return; }
    if (e.key === 'Escape') { display.value = ''; return; }
    if (e.key === 'Backspace') { display.value = display.value.slice(0,-1); return; }
    if (allowed.includes(e.key)) { display.value += e.key; }
  });

  function evaluate(){
    const expr = display.value.trim();
    if (!expr) return;

    // Simple safety: allow only digits, operators, parentheses, decimal, spaces
    if (!/^[0-9+\-*/().\s]+$/.test(expr)){
      display.value = 'Error';
      return;
    }

    try {
      // Use Function to evaluate expression in a safe-ish sandbox
      const result = Function('"use strict"; return (' + expr + ')')();
      display.value = (result === undefined) ? 'Error' : String(result);
    } catch (err){
      display.value = 'Error';
    }
  }
});
