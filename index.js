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

    // 3D Hero Boxes Generation
    const initHeroBoxes = () => {
        const container = document.getElementById('hero-boxes');
        if (!container) return;

        // Clear existing boxes
        container.innerHTML = '';

        const boxSize = 80; // Size of each box in px for better density
        const columns = Math.ceil(window.innerWidth / boxSize);
        const rows = Math.ceil(window.innerHeight / boxSize);

        container.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
        container.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

        const totalBoxes = columns * rows;
        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            box.classList.add('hero-box');
            container.appendChild(box);
        }
    };

    initHeroBoxes();
    window.addEventListener('resize', initHeroBoxes);

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

});
