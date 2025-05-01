// Mobile menu toggle
document.getElementById('mobile-menu-button').addEventListener('click', function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('hidden');
});

// FAQ toggle functionality
document.querySelectorAll('.faq-toggle').forEach(button => {
    button.addEventListener('click', () => {
        const faq = button.parentElement;
        const content = faq.querySelector('.faq-content');
        const icon = button.querySelector('i');
        
        // Toggle content
        content.classList.toggle('hidden');
        
        // Rotate icon
        icon.classList.toggle('rotate-180');
    });
});

// Modal functionality
function setupModal(modalId, openButtons, closeButton) {
    const modal = document.getElementById(modalId);
    const openBtns = document.querySelectorAll(openButtons);
    const closeBtn = document.getElementById(closeButton);

    // Open modal
    openBtns.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
}

// Set up modals
setupModal('signup-modal', 'a[href="#signup"]', 'close-signup');
setupModal('signin-modal', 'a[href="#signin"]', 'close-signin');

// Form submissions
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    setTimeout(() => {
        document.getElementById('form-success').classList.remove('hidden');
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            document.getElementById('form-success').classList.add('hidden');
        }, 5000);
    }, 1000);
});

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate signup
    setTimeout(() => {
        alert('Account created successfully! Redirecting to your dashboard...');
        document.getElementById('signup-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.reset();
    }, 1000);
});

document.getElementById('signin-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate login
    setTimeout(() => {
        alert('Login successful! Redirecting to your dashboard...');
        document.getElementById('signin-modal').classList.add('hidden');
        document.body.style.overflow = 'auto';
        this.reset();
    }, 1000);
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#signup' || this.getAttribute('href') === '#signin') {
            return; // Let the modal handle these
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});