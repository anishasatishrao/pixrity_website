(function() {
    console.log('PIXRITY Contact System Initializing...');

    const initContact = () => {
        const modalOverlay = document.getElementById('contactModal');
        const modalClose = document.getElementById('modalClose');
        const contactForm = document.getElementById('contactForm');
        const formSuccess = document.getElementById('formSuccess');

        if (!modalOverlay) {
            console.error('Contact modal element not found!');
            return;
        }

        const openModal = () => {
            console.log('Opening Contact Modal');
            
            // Close mobile menu if open
            const navNav = document.querySelector('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navNav && navNav.classList.contains('active')) {
                navNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            modalOverlay.style.display = 'flex';
            // Force reflow
            modalOverlay.offsetHeight;
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            console.log('Closing Contact Modal');
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.style.overflow = '';
                if (formSuccess && formSuccess.style.display === 'block') {
                    if (contactForm) contactForm.style.display = 'flex';
                    formSuccess.style.display = 'none';
                    if (contactForm) contactForm.reset();
                }
            }, 400);
        };

        // GLOBAL CLICK DELEGATION: Catch any click on a "Contact" link anywhere on the page
        document.addEventListener('click', (e) => {
            const target = e.target.closest('a');
            if (!target) return;

            const href = target.getAttribute('href') || '';
            if (href.includes('#footer') || href.includes('#contact')) {
                console.log('Intercepted contact link click:', href);
                e.preventDefault();
                e.stopPropagation();
                openModal();
            }
        });

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        if (contactForm) {
            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalBtnText = submitBtn.innerHTML;
                
                submitBtn.classList.add('loading');
                submitBtn.innerHTML = '<i class="fas fa-spinner"></i> Sending...';

                const formData = new FormData(contactForm);
                const data = {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    timestamp: new Date().toLocaleString()
                };

                try {
                    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby99PNa5M_tSl3Ul44Oq6cD1hJbOFwV4_iWKmaQVzFsM8Zr0n1828MTzFOP9KF5fOh8/exec';
                    
                    await fetch(SCRIPT_URL, {
                        method: 'POST',
                        mode: 'no-cors',
                        cache: 'no-cache',
                        body: JSON.stringify(data)
                    });

                    contactForm.style.display = 'none';
                    formSuccess.style.display = 'block';
                } catch (error) {
                    console.error('Submission error:', error);
                    alert('Error sending message. Please email info@pixrity.com');
                } finally {
                    submitBtn.classList.remove('loading');
                    submitBtn.innerHTML = originalBtnText;
                }
            });
        }

        // Expose to window for manual testing if needed
        window.pixrityContact = { open: openModal, close: closeModal };
        console.log('PIXRITY Contact System Ready');
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initContact);
    } else {
        initContact();
    }
})();

