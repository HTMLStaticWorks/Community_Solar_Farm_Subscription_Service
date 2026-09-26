/* Main JS for Sunova */

document.addEventListener('DOMContentLoaded', () => {
    const htmlElement = document.documentElement;
    
    // --- Theme Toggle ---
    const themeToggleBtns = document.querySelectorAll('.theme-toggle, #themeToggle');
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    let currentTheme = savedTheme || systemTheme;
    setTheme(currentTheme);

    themeToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            currentTheme = currentTheme === 'light' ? 'dark' : 'light';
            setTheme(currentTheme);
        });
    });

    function setTheme(theme) {
        htmlElement.setAttribute('data-bs-theme', theme);
        localStorage.setItem('theme', theme);
        
        themeToggleBtns.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon) {
                if (theme === 'dark') {
                    icon.className = 'bi bi-sun-fill';
                } else {
                    icon.className = 'bi bi-moon-fill';
                }
            }
        });
    }

    // --- RTL / LTR Direction Toggle ---
    const rtlToggleBtns = document.querySelectorAll('.rtl-toggle, #rtlToggle');
    const bootstrapCssLink = document.getElementById('bootstrapCss') || document.querySelector('link[href*="bootstrap"]');
    const savedDir = localStorage.getItem('dir') || 'ltr';
    
    setDirection(savedDir);

    rtlToggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const currentDir = htmlElement.getAttribute('dir') || 'ltr';
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            setDirection(newDir);
        });
    });

    function setDirection(dir) {
        htmlElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);

        // Update Bootstrap CDN stylesheet to RTL or LTR
        if (bootstrapCssLink) {
            if (dir === 'rtl') {
                bootstrapCssLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.rtl.min.css';
            } else {
                bootstrapCssLink.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css';
            }
        }

        // Update RTL button text
        rtlToggleBtns.forEach(btn => {
            const label = btn.querySelector('.rtl-text');
            const modeText = dir === 'rtl' ? 'LTR' : 'RTL';
            if (label) {
                label.textContent = modeText;
            } else {
                // If button contains only text or icon + text
                const textNodes = Array.from(btn.childNodes).filter(node => node.nodeType === Node.TEXT_NODE);
                if (textNodes.length > 0) {
                    textNodes[0].textContent = modeText;
                } else {
                    btn.innerText = modeText;
                }
            }
            btn.setAttribute('title', dir === 'rtl' ? 'Switch to LTR' : 'Switch to RTL');
        });
    }

    // --- Back to Top Button ---
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            if(backToTopBtn) backToTopBtn.style.display = 'block';
        } else {
            if(backToTopBtn) backToTopBtn.style.display = 'none';
        }
    });

    if(backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Active Link Highlight ---
    const currentPath = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});

// Global Password Visibility Toggle
function togglePasswordVisibility(inputId, btn) {
    const input = document.getElementById(inputId);
    if (!input) return;
    const icon = btn.querySelector('i');
    if (input.type === 'password') {
        input.type = 'text';
        if (icon) {
            icon.classList.remove('bi-eye');
            icon.classList.add('bi-eye-slash');
        }
    } else {
        input.type = 'password';
        if (icon) {
            icon.classList.remove('bi-eye-slash');
            icon.classList.add('bi-eye');
        }
    }
}

