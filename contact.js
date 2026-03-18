document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.getElementById('contactModal');
    const modalClose = document.getElementById('modalClose');
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    const contactLinks = document.querySelectorAll('a[href="#footer"], a[href="#contact"]');

    // Handle Contact Us button clicks
    contactLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    function openModal() {
        modalOverlay.style.display = 'flex';
        // Force reflow
        modalOverlay.offsetHeight;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        setTimeout(() => {
            modalOverlay.style.display = 'none';
            document.body.style.overflow = ''; // Restore scrolling
            // Reset form if it was successful
            if (formSuccess.style.display === 'block') {
                contactForm.style.display = 'flex';
                formSuccess.style.display = 'none';
                contactForm.reset();
            }
        }, 400);
    }

    modalClose.addEventListener('click', closeModal);

    // Close on outside click
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // Handle form submission
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
            // NOTE: The URL will be replaced by the user with their Google Apps Script Web App URL
            const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby99PNa5M_tSl3Ul44Oq6cD1hJbOFwV4_iWKmaQVzFsM8Zr0n1828MTzFOP9KF5fOh8/exec'; // Placeholder

            // For now, we simulate the submission
            console.log('Submitting data:', data);

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1500));

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
});
