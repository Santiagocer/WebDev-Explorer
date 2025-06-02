        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;
        
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        if (prefersDarkScheme.matches) {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            
            if (body.classList.contains('dark-mode')) {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                localStorage.setItem('theme', 'dark');
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                localStorage.setItem('theme', 'light');
            }
        });
        
        const currentTheme = localStorage.getItem('theme');
        if (currentTheme === 'dark') {
            body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else if (currentTheme === 'light') {
            body.classList.remove('dark-mode');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
        
        document.getElementById('copyright-text').textContent = `© ${new Date().getFullYear()} WebDev Explorer. Todos los derechos reservados a nombre de Santiago Cerdeira.`;
        
        // Animación keyframes dinámica
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rebote {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        // Efecto hover para el ejemplo de transición
        const hoverBox = document.querySelector('.result-column .box');
        if (hoverBox) {
            hoverBox.addEventListener('mouseenter', function() {
                this.style.transform = 'rotate(45deg)';
                this.style.backgroundColor = '#6e48aa';
            });
            hoverBox.addEventListener('mouseleave', function() {
                this.style.transform = 'rotate(0)';
                this.style.backgroundColor = '#2965f1';
            });
        }