// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
} else if (prefersDarkScheme.matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
}

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update canvas background
    const canvas = document.getElementById('space');
    const ctx = canvas.getContext('2d');
    canvas.style.backgroundColor = newTheme === 'dark' ? '#000000' : '#ffffff';
}); 