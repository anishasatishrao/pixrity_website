document.addEventListener('DOMContentLoaded', () => {
    console.log('Contact script loaded');
    const modalOverlay = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    // Robust selector: any link containing #footer or #contact
    const contactLinks = document.querySelectorAll('a[href*="#footer"], a[href*="#contact"]');

    function openModal() {
        if (!modalOverlay) return;
        
        // Close mobile menu if it's open
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
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Handle Contact Us button clicks
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            console.log('Contact link clicked');
            e.preventDefault();
            e.stopPropagation();
            openModal();
        });
    });

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form if it was successful
            if (formSuccess && formSuccess.style.display === 'block') {
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                contactForm.reset();
            }
        }, 400);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on outside click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Handle form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
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
                    mode: 'no-cors', // Apps Script needs this for simple fetch
                    cache: 'no-cache',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });

                // Show success state
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';

            } catch (error) {
                console.error('Submission error:', error);
                alert('There was an error sending your message. Please try again or email us directly at info@pixrity.com');
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
});
