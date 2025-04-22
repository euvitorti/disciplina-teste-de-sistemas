export function initTheme(themeToggleEl) {
  // Eu verifico a preferência de tema salva
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark');
    themeToggleEl.textContent = 'Modo Claro';
  }

  // Eu configuro o listener para alternar temas
  themeToggleEl.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const tema = document.body.classList.contains('dark') ? 'dark' : 'light';
    themeToggleEl.textContent = tema === 'dark' ? 'Modo Claro' : 'Modo Escuro';
    localStorage.setItem('theme', tema);
  });
}