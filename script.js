// ============================================
// ABDURAHMAN SHAWA - Portfolio JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.getElementById('navbar');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background on scroll
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Animate skill bars when in view
        animateSkillBars();

        // Animate elements on scroll
        animateOnScroll();
    });

    // Back to top click
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ===== MOBILE NAVIGATION =====
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===== ACTIVE NAVIGATION LINK =====
    const sections = document.querySelectorAll('section[id]');
    const navLinkElements = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollY = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinkElements.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);

    // ===== STAT COUNTER ANIMATION =====
    const statNumbers = document.querySelectorAll('.stat-number');
    let statAnimated = false;

    function animateStats() {
        if (statAnimated) return;

        const heroStats = document.querySelector('.hero-stats');
        if (!heroStats) return;

        const rect = heroStats.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statAnimated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        num.textContent = target;
                        clearInterval(timer);
                    } else {
                        num.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }

    window.addEventListener('scroll', animateStats);
    animateStats(); // Run on load too

    // ===== SKILL BAR ANIMATION =====
    let skillsAnimated = false;

    function animateSkillBars() {
        if (skillsAnimated) return;

        const skillsSection = document.getElementById('skills');
        if (!skillsSection) return;

        const rect = skillsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            skillsAnimated = true;

            document.querySelectorAll('.skill-progress').forEach(bar => {
                const width = bar.getAttribute('data-width');
                setTimeout(() => {
                    bar.style.width = width + '%';
                }, 200);
            });
        }
    }

    // ===== ANIMATE ON SCROLL =====
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-card, .service-card, .portfolio-card, .testimonial-card, .contact-card');

        elements.forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 50) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
                el.style.transitionDelay = `${index * 0.05}s`;
            }
        });
    }

    // Set initial state for animated elements
    document.querySelectorAll('.skill-card, .service-card, .portfolio-card, .testimonial-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
    });

    // Run once on load
    setTimeout(() => {
        animateSkillBars();
        animateOnScroll();
    }, 100);

    // ===== CONTACT FORM =====
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;

            // Show loading state
            btn.innerHTML = '<span>Gönderiliyor...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;

            const existingMsg = contactForm.querySelector('.form-alert-msg');
            if (existingMsg) existingMsg.remove();

            try {
                const formData = new FormData(contactForm);
                const response = await fetch("https://formsubmit.co/ajax/abdulrahmanshawa8@gmail.com", {
                    method: "POST",
                    headers: { 
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                if (response.ok) {
                    btn.innerHTML = '<span>Gönderildi!</span><i class="fas fa-check"></i>';
                    btn.style.background = 'linear-gradient(135deg, #00D4AA, #00B894)';

                    const successDiv = document.createElement('div');
                    successDiv.className = 'form-alert-msg';
                    successDiv.style.cssText = `
                        padding: 16px;
                        background: rgba(0, 212, 170, 0.1);
                        border: 1px solid rgba(0, 212, 170, 0.3);
                        border-radius: 12px;
                        color: #00D4AA;
                        text-align: center;
                        margin-top: 16px;
                        font-weight: 600;
                        animation: fadeInUp 0.5s ease forwards;
                    `;
                    successDiv.textContent = '✓ Mesajınız başarıyla e-posta adresime ulaştı!';
                    contactForm.appendChild(successDiv);
                    contactForm.reset();
                } else {
                    throw new Error("Gönderim başarısız");
                }
            } catch (error) {
                btn.innerHTML = '<span>Hata Oluştu</span><i class="fas fa-exclamation-triangle"></i>';
                btn.style.background = 'linear-gradient(135deg, #FF6B6B, #E55A5A)';

                const errorDiv = document.createElement('div');
                errorDiv.className = 'form-alert-msg';
                errorDiv.style.cssText = `
                    padding: 16px;
                    background: rgba(255, 107, 107, 0.1);
                    border: 1px solid rgba(255, 107, 107, 0.3);
                    border-radius: 12px;
                    color: #FF6B6B;
                    text-align: center;
                    margin-top: 16px;
                    font-weight: 600;
                `;
                errorDiv.textContent = 'Mesaj gönderilirken bir hata oluştu. Lütfen doğrudan e-posta atınız.';
                contactForm.appendChild(errorDiv);
            } finally {
                setTimeout(() => {
                    btn.innerHTML = originalHTML;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 4000);
            }
        });
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== TYPING EFFECT FOR SUBTITLE =====
    const subtitle = document.querySelector('.hero-subtitle');
    if (subtitle) {
        const texts = [
            'Profesyonel Web Geliştirici & Tasarımcı',
            'Frontend Developer',
            'UI/UX Designer',
            'Creative Problem Solver'
        ];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;

        function typeEffect() {
            const current = texts[textIndex];

            if (isDeleting) {
                subtitle.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                subtitle.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === current.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typingSpeed = 500; // Pause before new word
            }

            setTimeout(typeEffect, typingSpeed);
        }

        // Start typing effect after initial animation
        setTimeout(typeEffect, 2000);
    }

    // ===== PARALLAX EFFECT ON MOUSE MOVE (Hero Section) =====
    const heroSection = document.querySelector('.hero');
    const floatingCards = document.querySelectorAll('.floating-card');

    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            const moveX = (clientX - centerX) / 50;
            const moveY = (clientY - centerY) / 50;

            floatingCards.forEach((card, index) => {
                const speed = (index + 1) * 0.5;
                card.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
            });
        });
    }

    // ===== PRELOADER / INITIAL ANIMATION =====
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // Fallback if load event already fired
    if (document.readyState === 'complete') {
        document.body.style.opacity = '1';
    }
});
