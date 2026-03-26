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

    // Animated Neon Tubes Integration
    const initHeroTubes = async () => {
        const container = document.getElementById('hero-tubes');
        if (!container) return;

        try {
            const module = await import('https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js');
            const TubesCursor = module.default;

            TubesCursor(container, {
                tubes: {
                    colors: ["#00B8D4", "#651FFF", "#D500F9"], // More vibrant/darker neons
                    lights: {
                        intensity: 500, // Increased intensity for light backgrounds
                        colors: ["#00B8D4", "#651FFF", "#1A1A2E", "#D500F9"]
                    }
                }
            });
        } catch (error) {
            console.error("Failed to load NeonFlow:", error);
        }
    };

    initHeroTubes();

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
