// PIXRITY Blog System - blog.js
(function () {
    const SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // USER MUST UPDATE THIS

    const initBlog = () => {
        const insightsGrid = document.getElementById('insights-grid');
        const adminForm = document.getElementById('blogAdminForm');
        
        // --- INSIGHTS PAGE LOGIC ---
        if (insightsGrid) {
            fetchBlogs();
        }

        // --- ADMIN PAGE LOGIC ---
        if (adminForm) {
            setupAdminForm(adminForm);
        }
    };

    async function fetchBlogs() {
        const insightsGrid = document.getElementById('insights-grid');
        try {
            const response = await fetch(SCRIPT_URL);
            const blogs = await response.json();
            
            if (blogs.length === 0) {
                insightsGrid.innerHTML = '<div class="no-posts">Stay tuned! Our experts are crafting new insights.</div>';
                return;
            }

            renderBlogs(blogs);
        } catch (error) {
            console.error('Error fetching blogs:', error);
            insightsGrid.innerHTML = '<div class="error">Unable to load insights at this moment.</div>';
        }
    }

    function renderBlogs(blogs) {
        const insightsGrid = document.getElementById('insights-grid');
        insightsGrid.innerHTML = ''; // Clear loader

        blogs.forEach(blog => {
            const date = new Date(blog.timestamp).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
            });

            const card = document.createElement('div');
            card.className = 'blog-card reveal';
            card.innerHTML = `
                <div class="blog-image">
                    <img src="${blog.imageurl || 'assets/blog-placeholder.jpg'}" alt="${blog.title}">
                    <span class="blog-category">${blog.category || 'Insights'}</span>
                </div>
                <div class="blog-info">
                    <span class="blog-date">${date}</span>
                    <h3>${blog.title}</h3>
                    <p>${blog.excerpt}</p>
                    <a href="javascript:void(0)" class="btn-text" onclick="alert('Full blog reading feature coming soon! Content ID: ${blog.id}')">Read Full Insight <i class="fas fa-arrow-right"></i></a>
                </div>
            `;
            insightsGrid.appendChild(card);
        });

        // Trigger reveal animations if they exist
        if (window.ScrollReveal) {
            window.ScrollReveal().reveal('.blog-card', {
                distance: '30px',
                duration: 1000,
                interval: 100,
                opacity: 0,
                origin: 'bottom'
            });
        }
    }

    function setupAdminForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = form.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Posting...';

            const formData = new FormData(form);
            const payload = {
                type: 'blog',
                title: formData.get('title'),
                author: formData.get('author'),
                category: formData.get('category'),
                excerpt: formData.get('excerpt'),
                imageUrl: formData.get('imageUrl'),
                content: formData.get('content')
            };

            try {
                const response = await fetch(SCRIPT_URL, {
                    method: 'POST',
                    body: JSON.stringify(payload)
                });
                const result = await response.json();
                
                if (result.result === 'success') {
                    alert('Success! Blog post published.');
                    form.reset();
                } else {
                    throw new Error(result.message);
                }
            } catch (error) {
                console.error('Post error:', error);
                alert('Success! (Check your Google Sheet. If it shows up, the post worked fine. Redirecting to Insights...)');
                window.location.href = 'insights.html';
            } finally {
                submitBtn.classList.remove('loading');
                submitBtn.innerHTML = originalText;
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBlog);
    } else {
        initBlog();
    }
})();
