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

    // Static Neon Flow handled in individual HTML pages for cross-origin stability

    // Intersection Observer for reveal elements
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

});
