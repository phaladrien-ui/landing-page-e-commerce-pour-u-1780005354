```javascript
// static/js/script.js

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Product image gallery
const mainImage = document.querySelector('.main-product-image');
const thumbnails = document.querySelectorAll('.thumbnail');

if (thumbnails.length > 0 && mainImage) {
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            // Add active class to clicked thumbnail
            this.classList.add('active');
            // Update main image
            const newSrc = this.getAttribute('data-image');
            if (newSrc) {
                mainImage.src = newSrc;
                mainImage.classList.add('fade-in');
                setTimeout(() => {
                    mainImage.classList.remove('fade-in');
                }, 300);
            }
        });
    });
}

// Add to cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
let cartCount = 0;
const cartBadge = document.querySelector('.cart-badge');

addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
        cartCount++;
        if (cartBadge) {
            cartBadge.textContent = cartCount;
            cartBadge.classList.add('bounce');
            setTimeout(() => {
                cartBadge.classList.remove('bounce');
            }, 300);
        }
        
        // Show success message
        const productName = this.getAttribute('data-product') || 'Product';
        showNotification(`${productName} added to cart!`);
    });
});

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Price calculator for customization
const strapSelector = document.getElementById('strap-selector');
const colorSelector = document.getElementById('color-selector');
const basePrice = 299;
const priceDisplay = document.querySelector('.price-display');

function updatePrice() {
    if (priceDisplay) {
        let additionalPrice = 0;
        
        if (strapSelector) {
            const strapOption = strapSelector.options[strapSelector.selectedIndex];
            if (strapOption) {
                additionalPrice += parseInt(strapOption.getAttribute('data-price')) || 0;
            }
        }
        
        if (colorSelector) {
            const colorOption = colorSelector.options[colorSelector.selectedIndex];
            if (colorOption) {
                additionalPrice += parseInt(colorOption.getAttribute('data-price')) || 0;
            }
        }
        
        const totalPrice = basePrice + additionalPrice;
        priceDisplay.textContent = `$${totalPrice}`;
    }
}

if (strapSelector) {
    strapSelector.addEventListener('change', updatePrice);
}

if (colorSelector) {
    colorSelector.addEventListener('change', updatePrice);
}

// Accordion for product details
const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');
    const content = item.querySelector('.accordion-content');
    
    if (header && content) {
        header.addEventListener('click', function() {
            // Close other accordion items
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherContent = otherItem.querySelector('.accordion-content');
                    if (otherContent) {
                        otherContent.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + 'px';
            } else {
                content.style.maxHeight = '0';
            }
        });
    }
});

// Testimonial slider
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const prevButton = document.querySelector('.slider-prev');
const nextButton = document.querySelector('.slider-next');

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === index) {
            slide.classList.add('active');
        }
    });
}

function nextSlide() {
    if (slides.length > 0) {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
}

function prevSlide() {
    if (slides.length > 0) {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
}

if (nextButton) {
    nextButton.addEventListener('click', nextSlide);
}

if (prevButton) {
    prevButton.addEventListener('click', prevSlide);
}

// Auto-advance testimonials
let testimonialInterval;
if (slides.length > 0) {
    testimonialInterval = setInterval(nextSlide, 5000);
    
    // Pause on hover
    const testimonialContainer = document.querySelector('.testimonials-container');
    if (testimonialContainer) {
        testimonialContainer.addEventListener('mouseenter', () => {
            clearInterval(testimonialInterval);
        });
        
        testimonialContainer.addEventListener('mouseleave', () => {
            testimonialInterval = setInterval(nextSlide, 5000);
        });
    }
}

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// Intersection Observer for counter animation
const counterElements = document.querySelectorAll('.counter');
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.getAttribute('data-target'));
            if (target) {
                animateCounter(entry.target, target);
            }
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

counterElements.forEach(counter => {
    counterObserver.observe(counter);
});

// Mobile menu toggle
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const mobileMenu = document.querySelector('.mobile-menu');

if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Toggle aria-expanded
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
    });
    
    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuButton.classList.remove('active');
            mobileMenuButton.setAttribute('aria-expanded', 'false');
        });
    });
}

// Parallax effect for hero section
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
    });
}

// Form validation for newsletter
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = this.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            showNotification('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            showNotification('Please enter a valid email address');
            emailInput.classList.add('error');
            setTimeout(() => {
                emailInput.classList.remove('error');
            }, 2000);
        }
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize price display
    updatePrice();
    
    // Initialize first testimonial
    if (slides.length > 0) {
        showSlide(0);
    }
    
    // Initialize accordion
    accordionItems.forEach(item => {
        const content = item.querySelector('.accordion-content');
        if (content) {
            content.style.maxHeight = '0';
        }
    });
    
    // Add fade-in animation to elements
    const fadeElements = document.querySelectorAll('.fade-in-on-scroll');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeElements.forEach(element => {
        fadeObserver.observe(element);
    });
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
        mobileMenuButton.classList.remove('active');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    }
    
    // Navigate testimonials with arrow keys
    if (e.key === 'ArrowLeft' && slides.length > 0) {
        prevSlide();
    }
    if (e.key === 'ArrowRight' && slides.length > 0) {
        nextSlide();
    }
});
```