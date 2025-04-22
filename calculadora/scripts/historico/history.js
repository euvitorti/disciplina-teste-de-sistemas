export let history = JSON.parse(localStorage.getItem('calcHistory') || '[]');

export function renderHistory(historyListEl, displayEl, updateParenFn) {
  historyListEl.innerHTML = '';
  history.forEach(({ expr, result }) => {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = `${expr} = ${result}`;
    const btn = document.createElement('button');
    btn.textContent = '↺';
    btn.title = 'Recarregar';
    btn.onclick = () => {
      displayEl.value = expr;
      clearError();
      updateParenFn();
    };
    li.append(span, btn);
    historyListEl.append(li);
  });
}

export function saveToHistory(expr, result, historyListEl, updateParenFn) {
  history.unshift({ expr, result });
  history = history.slice(0, 20);
  localStorage.setItem('calcHistory', JSON.stringify(history));
  renderHistory(historyListEl, document.getElementById('display'), updateParenFn);
}