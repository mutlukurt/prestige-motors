// Smooth scrolling and navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    
    // Handle navbar background on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Car gallery interactions
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        const viewBtn = card.querySelector('.view-details-btn');
        
        viewBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            const carTitle = card.querySelector('.car-title').textContent;
            showCarDetails(carTitle, card);
        });
        
        // Add hover sound effect (optional)
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleFormSubmission(this);
        });
        
        // Form field animations
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const select = group.querySelector('select');
            const label = group.querySelector('label');
            
            // Handle regular input and textarea fields
            if (input && label) {
                input.addEventListener('focus', function() {
                    group.classList.add('focused');
                });
                
                input.addEventListener('blur', function() {
                    if (!this.value) {
                        group.classList.remove('focused');
                    }
                });
                
                // Check if field has value on page load
                if (input.value) {
                    group.classList.add('focused');
                }
            }
            
            // Handle select fields differently - label is always positioned above
            if (select && label) {
                group.classList.add('focused'); // Always keep select labels positioned above
            }
        });
    }
    
    // Testimonials slider (auto-rotate)
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    let currentTestimonial = 0;
    
    function rotateTestimonials() {
        testimonialCards.forEach((card, index) => {
            card.style.opacity = index === currentTestimonial ? '1' : '0.7';
            card.style.transform = index === currentTestimonial ? 'scale(1.05)' : 'scale(1)';
        });
        
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
    }
    
    // Start testimonial rotation
    if (testimonialCards.length > 0) {
        setInterval(rotateTestimonials, 5000);
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.car-card, .service-card, .testimonial-card, .stat-item');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Stats counter animation
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground) {
            const rate = scrolled * -0.5;
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Service cards hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 20px 60px rgba(212, 175, 55, 0.2)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.boxShadow = '';
        });
    });
    
    // Back to top button
    const backToTopBtn = createBackToTopButton();
    document.body.appendChild(backToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    });
});

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const offsetTop = section.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

function showCarDetails(carTitle, cardElement) {
    // Create modal for car details
    const modal = document.createElement('div');
    modal.className = 'car-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="closeCarModal()"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h2>${carTitle}</h2>
                <button class="modal-close" onclick="closeCarModal()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
            <div class="modal-body">
                <div class="car-details">
                    <p>Experience luxury and performance with our ${carTitle.toLowerCase()}. This premium vehicle offers exceptional comfort, cutting-edge technology, and unmatched reliability.</p>
                    <div class="car-features">
                        <h3>Key Features:</h3>
                        <ul>
                            <li>Premium leather interior</li>
                            <li>Advanced safety systems</li>
                            <li>State-of-the-art infotainment</li>
                            <li>Superior performance engine</li>
                            <li>Comprehensive warranty</li>
                        </ul>
                    </div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="scheduleTestDrive('${carTitle}')">
                            Schedule Test Drive
                        </button>
                        <button class="btn btn-secondary" onclick="requestQuote('${carTitle}')">
                            Request Quote
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .car-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 2000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px);
        }
        
        .modal-content {
            background: var(--secondary-black);
            border-radius: var(--border-radius-large);
            border: 1px solid var(--accent-gold);
            max-width: 600px;
            width: 100%;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            z-index: 1;
            animation: modalSlideIn 0.3s ease-out;
        }
        
        @keyframes modalSlideIn {
            from {
                opacity: 0;
                transform: translateY(-50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .modal-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2rem 2rem 1rem;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .modal-header h2 {
            color: var(--accent-gold);
            margin: 0;
        }
        
        .modal-close {
            background: none;
            border: none;
            color: var(--metallic-silver);
            cursor: pointer;
            padding: 8px;
            border-radius: 50%;
            transition: var(--transition-fast);
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--accent-gold);
        }
        
        .modal-close svg {
            width: 24px;
            height: 24px;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .car-details p {
            color: var(--metallic-silver);
            line-height: 1.7;
            margin-bottom: 2rem;
        }
        
        .car-features h3 {
            color: var(--off-white);
            margin-bottom: 1rem;
        }
        
        .car-features ul {
            list-style: none;
            margin-bottom: 2rem;
        }
        
        .car-features li {
            color: var(--metallic-silver);
            margin-bottom: 0.5rem;
            position: relative;
            padding-left: 1.5rem;
        }
        
        .car-features li::before {
            content: '✓';
            position: absolute;
            left: 0;
            color: var(--accent-turquoise);
            font-weight: bold;
        }
        
        .modal-actions {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
        }
        
        @media (max-width: 768px) {
            .modal-actions {
                flex-direction: column;
            }
            
            .modal-content {
                margin: 20px;
                max-height: calc(100vh - 40px);
            }
            
            .modal-header,
            .modal-body {
                padding: 1.5rem;
            }
        }
    `;
    
    // Add styles to document if not already added
    if (!document.getElementById('modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

function closeCarModal() {
    const modal = document.querySelector('.car-modal');
    if (modal) {
        modal.remove();
        document.body.style.overflow = '';
    }
}

function scheduleTestDrive(carTitle) {
    closeCarModal();
    scrollToSection('contact');
    
    // Pre-fill the contact form
    setTimeout(() => {
        const interestSelect = document.getElementById('interest');
        const messageField = document.getElementById('message');
        
        if (interestSelect) {
            interestSelect.value = carTitle.toLowerCase().replace(' ', '-');
        }
        
        if (messageField) {
            messageField.value = `I would like to schedule a test drive for the ${carTitle}. Please contact me to arrange a convenient time.`;
            messageField.dispatchEvent(new Event('input'));
        }
    }, 500);
}

function requestQuote(carTitle) {
    closeCarModal();
    scrollToSection('contact');
    
    // Pre-fill the contact form
    setTimeout(() => {
        const interestSelect = document.getElementById('interest');
        const messageField = document.getElementById('message');
        
        if (interestSelect) {
            interestSelect.value = carTitle.toLowerCase().replace(' ', '-');
        }
        
        if (messageField) {
            messageField.value = `I am interested in getting a quote for the ${carTitle}. Please provide pricing and financing options.`;
            messageField.dispatchEvent(new Event('input'));
        }
    }, 500);
}

function handleFormSubmission(form) {
    const formData = new FormData(form);
    const submitBtn = form.querySelector('.form-submit');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = `
        <div class="loading-spinner"></div>
        <span>Sending...</span>
    `;
    submitBtn.disabled = true;
    
    // Add loading spinner styles
    const spinnerStyles = `
        .loading-spinner {
            width: 16px;
            height: 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid var(--accent-gold);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    
    if (!document.getElementById('spinner-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'spinner-styles';
        styleSheet.textContent = spinnerStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        // Reset form
        form.reset();
        
        // Show success message
        submitBtn.innerHTML = `
            <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <polyline points="20,6 9,17 4,12"/>
            </svg>
            <span>Message Sent!</span>
        `;
        submitBtn.style.background = 'var(--accent-turquoise)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
        }, 3000);
        
        // Show success notification
        showNotification('Thank you for your inquiry! We will contact you soon.', 'success');
    }, 2000);
}

function animateCounter(element) {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    const duration = 2000;
    const start = performance.now();
    const hasPlus = element.textContent.includes('+');
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - start;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current + (hasPlus ? '+' : '');
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function createBackToTopButton() {
    const button = document.createElement('button');
    button.className = 'back-to-top';
    button.innerHTML = `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5,12 12,5 19,12"></polyline>
        </svg>
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add back to top button styles
    const backToTopStyles = `
        .back-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--accent-gold);
            border: none;
            border-radius: 50%;
            color: var(--primary-black);
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: var(--transition-medium);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .back-to-top:hover {
            background: var(--accent-turquoise);
            transform: translateY(-2px);
            box-shadow: var(--shadow-medium);
        }
        
        .back-to-top svg {
            width: 24px;
            height: 24px;
            stroke-width: 2;
        }
        
        @media (max-width: 768px) {
            .back-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;
    
    if (!document.getElementById('back-to-top-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'back-to-top-styles';
        styleSheet.textContent = backToTopStyles;
        document.head.appendChild(styleSheet);
    }
    
    return button;
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
    `;
    
    // Add notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 30px;
            max-width: 400px;
            background: var(--secondary-black);
            border: 1px solid var(--accent-gold);
            border-radius: var(--border-radius);
            padding: 1rem;
            z-index: 2000;
            animation: slideInRight 0.3s ease-out;
        }
        
        .notification-success {
            border-color: var(--accent-turquoise);
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .notification-message {
            color: var(--off-white);
            font-size: 0.9rem;
        }
        
        .notification-close {
            background: none;
            border: none;
            color: var(--metallic-silver);
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
            transition: var(--transition-fast);
        }
        
        .notification-close:hover {
            background: rgba(255, 255, 255, 0.1);
            color: var(--accent-gold);
        }
        
        .notification-close svg {
            width: 16px;
            height: 16px;
        }
        
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @media (max-width: 768px) {
            .notification {
                right: 20px;
                left: 20px;
                max-width: none;
            }
        }
    `;
    
    if (!document.getElementById('notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Add CSS animations for scroll-triggered elements
const animationStyles = `
    .car-card,
    .service-card,
    .testimonial-card,
    .stat-item {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    
    .car-card.animate-in,
    .service-card.animate-in,
    .testimonial-card.animate-in,
    .stat-item.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .car-card:nth-child(2).animate-in {
        transition-delay: 0.1s;
    }
    
    .car-card:nth-child(3).animate-in {
        transition-delay: 0.2s;
    }
    
    .car-card:nth-child(4).animate-in {
        transition-delay: 0.3s;
    }
    
    .service-card:nth-child(2).animate-in {
        transition-delay: 0.15s;
    }
    
    .service-card:nth-child(3).animate-in {
        transition-delay: 0.3s;
    }
    
    .service-card:nth-child(4).animate-in {
        transition-delay: 0.45s;
    }
`;

// Add animation styles to document
if (!document.getElementById('animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
}
