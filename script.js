// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking on a nav link
const navLinks = document.querySelectorAll('.nav-links li');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

// Scroll Animation for Sections
const sections = document.querySelectorAll('.section-content');

const revealSection = () => {
    const triggerBottom = window.innerHeight * 0.8;
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        
        if (sectionTop < triggerBottom) {
            section.classList.add('active');
        }
    });
};

// Initial check on page load
window.addEventListener('load', revealSection);

// Check on scroll
window.addEventListener('scroll', revealSection);

// Animate skill bars when skills section is visible
const skillSection = document.querySelector('#skills');
const skillLevels = document.querySelectorAll('.skill-level');

const animateSkills = () => {
    const sectionTop = skillSection.getBoundingClientRect().top;
    const triggerBottom = window.innerHeight * 0.8;
    
    if (sectionTop < triggerBottom) {
        skillLevels.forEach(skill => {
            const width = skill.style.width;
            skill.style.width = '0';
            setTimeout(() => {
                skill.style.width = width;
            }, 100);
        });
        
        // Remove event listener after animation is triggered
        window.removeEventListener('scroll', animateSkills);
    }
};

window.addEventListener('scroll', animateSkills);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for header height
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Show sending state
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Send data to our server
    fetch('/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        
        // Reset form
        contactForm.reset();
        
        // Show success message
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--success-color)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    })
    .catch(error => {
        console.error('Error:', error);
        
        // Show error message
        submitBtn.textContent = 'Error! Try Again';
        submitBtn.style.backgroundColor = 'var(--danger-color)';
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalBtnText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
        }, 3000);
    });
});

// Toggle gallery visibility
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.toggle-gallery');
    
    toggleButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetClass = this.getAttribute('data-target');
            const gallery = this.closest('.work-details').querySelector('.' + targetClass);
            
            if (gallery.classList.contains('hidden')) {
                // Hide all other galleries first
                document.querySelectorAll('.work-gallery').forEach(g => {
                    if (g !== gallery) {
                        g.classList.add('hidden');
                    }
                });
                
                // Reset all other button texts
                document.querySelectorAll('.toggle-gallery').forEach(b => {
                    if (b !== this) {
                        b.textContent = 'View Projects';
                    }
                });
                
                // Show this gallery
                gallery.classList.remove('hidden');
                this.textContent = 'Hide Projects';
            } else {
                gallery.classList.add('hidden');
                this.textContent = 'View Projects';
            }
        });
    });
});

// Navigation toggle for mobile menu
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    // Toggle Nav
    if (burger) {
        burger.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            
            // Animate Links
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger Animation
            burger.classList.toggle('toggle');
        });
    }
}

// Make sure category items are clickable
const initCategoryLinks = () => {
    const categoryItems = document.querySelectorAll('.category-item');
    
    categoryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // This ensures the link works even if clicked on child elements
            if (this.tagName === 'A') {
                // Let the default link behavior work
                return true;
            }
        });
    });
}

// Initialize all functions
const app = () => {
    navSlide();
    initCategoryLinks();
}

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', app); 