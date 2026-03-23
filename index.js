document.addEventListener('DOMContentLoaded', () => {
    // Add js class to body for CSS fallbacks
    document.body.classList.add('js-enabled');

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navNav = document.querySelector('nav');

    if (menuToggle && navNav) {
        menuToggle.addEventListener('click', () => {
            navNav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                // Once visible, stop observing to save resources
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });

    // XR Card Toggles
    const toggleButtons = document.querySelectorAll('.btn-text-toggle');

    toggleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            if (targetContent) {
                const isActive = targetContent.classList.toggle('active');
                btn.textContent = isActive ? 'Show Less' : 'Learn More';
            }
        });
    });

    // Infinite Grid Animation & Interaction
    // Global Grid Animation & Interaction
    const globalBg = document.querySelector('.global-background');
    const gridPatterns = document.querySelectorAll('pattern');
    
    if (globalBg && gridPatterns.length > 0) {
        let gridX = 0;
        let gridY = 0;
        const speedX = 0.5;
        const speedY = 0.5;
        const patternSize = 50; // Updated to match HTML

        // Global Mouse Reveal Effect
        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            // Fixed background is relative to viewport, so clientX/Y is perfect.
            globalBg.style.setProperty('--mouse-x', `${x}px`);
            globalBg.style.setProperty('--mouse-y', `${y}px`);
        });

        // Infinite Scroll Animation
        function animateGrid() {
            gridX = (gridX + speedX) % patternSize;
            gridY = (gridY + speedY) % patternSize;
            
            gridPatterns.forEach(pattern => {
                pattern.setAttribute('x', gridX);
                pattern.setAttribute('y', gridY);
            });
            
            requestAnimationFrame(animateGrid);
        }
        
        animateGrid();
    }
});
