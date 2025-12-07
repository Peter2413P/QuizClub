
// Form field animations
document.addEventListener('DOMContentLoaded', function () {
    // Add focus and blur effects to form inputs
    const formGroups = document.querySelectorAll('.form-group');

    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        const label = group.querySelector('label');
        const focusBorder = group.querySelector('.focus-border');

        // Initial check for pre-filled values
        if (input.value.trim() !== '') {
            label.style.top = '-1.2rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary)';
        }

        // Focus effect
        input.addEventListener('focus', function () {
            label.style.top = '-1.2rem';
            label.style.fontSize = '0.8rem';
            label.style.color = 'var(--primary)';
            focusBorder.style.width = '100%';
        });

        // Blur effect
        input.addEventListener('blur', function () {
            if (input.value.trim() === '') {
                label.style.top = '1rem';
                label.style.fontSize = '1rem';
                label.style.color = 'rgba(255, 255, 255, 0.7)';
            }
            focusBorder.style.width = '0%';
        });

        // Input animation
        input.addEventListener('input', function () {
            if (input.value.trim() !== '') {
                label.style.top = '-1.2rem';
                label.style.fontSize = '0.8rem';
                label.style.color = 'var(--primary)';
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const submitText = submitBtn.querySelector('span');
            const submitIcon = submitBtn.querySelector('svg');

            // Show loading state
            submitBtn.style.pointerEvents = 'none';
            submitText.textContent = 'Sending...';
            submitIcon.style.transform = 'translateX(5px) rotate(45deg)';

            // Simulate form submission (replace with actual form submission)
            setTimeout(() => {
                // Reset form
                contactForm.reset();

                // Show success state
                submitText.textContent = 'Message Sent!';
                submitIcon.style.display = 'none';

                // Reset button after delay
                setTimeout(() => {
                    submitBtn.style.pointerEvents = 'auto';
                    submitText.textContent = 'Send Message';
                    submitIcon.style.display = 'block';
                    submitIcon.style.transform = 'translateX(0) rotate(0)';

                    // Reset labels if needed
                    formGroups.forEach(group => {
                        const input = group.querySelector('input, textarea');
                        const label = group.querySelector('label');
                        if (input.value.trim() === '') {
                            label.style.top = '1rem';
                            label.style.fontSize = '1rem';
                            label.style.color = 'rgba(255, 255, 255, 0.7)';
                        }
                    });
                }, 2000);
            }, 1500);
        });
    }

    // Add hover effect to contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            const wave = card.querySelector('.contact-wave');
            if (wave) {
                wave.style.transform = 'translateX(0%)';
                wave.style.opacity = '1';
            }

            const icon = card.querySelector('.contact-icon-inner');
            if (icon) {
                icon.style.transform = 'translateY(-5px)';
                icon.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
            }
        });

        card.addEventListener('mouseleave', function () {
            const wave = card.querySelector('.contact-wave');
            if (wave) {
                wave.style.transform = 'translateX(-100%)';
                wave.style.opacity = '0';
            }

            const icon = card.querySelector('.contact-icon-inner');
            if (icon) {
                icon.style.transform = 'translateY(0)';
                icon.style.boxShadow = 'none';
            }
        });
    });
});


// Team Tabs Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const teamSections = document.querySelectorAll('.team-section');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and sections
            tabBtns.forEach(b => b.classList.remove('active'));
            teamSections.forEach(section => section.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding section
            const teamId = btn.getAttribute('data-team');
            document.getElementById(`${teamId}-team`).classList.add('active');
        });
    });

    // Show first team by default
    if (tabBtns.length > 0) {
        tabBtns[0].click();
    }
});

// Function to update the URL without page reload
function updateUrl(pageId) {
    const baseUrl = window.location.origin + window.location.pathname;
    const newUrl = pageId === 'home' ? baseUrl : `${baseUrl}?page=${pageId}`;
    window.history.pushState({ page: pageId }, '', newUrl);
    document.title = `Quiz Club CIT | ${pageId.charAt(0).toUpperCase() + pageId.slice(1)}`;
}

// Navigation functionality
let bannerInterval;

function closeBanner() {
    const banner = document.getElementById('announcementBanner');
    if (banner) {
        banner.style.display = 'none';
        // Store in localStorage to prevent showing again
        localStorage.setItem('bannerClosed', 'true');
        // Remove the extra padding when banner is closed
        document.body.style.paddingTop = '0';
        // Clear the banner interval
        if (bannerInterval) {
            clearInterval(bannerInterval);
        }
    }
}

function showBannerWithAnimation() {
    const banner = document.getElementById('announcementBanner');
    const currentPage = new URLSearchParams(window.location.search).get('page') || 'home';

    // Don't show on events page or if manually closed
    if (currentPage === 'events' || localStorage.getItem('bannerClosed')) {
        return;
    }

    if (banner) {
        // Show banner
        banner.style.display = 'block';
        banner.style.animation = 'slideDown 0.5s ease-out';
        document.body.style.paddingTop = '50px';

        // Hide banner after animation completes (assuming 20s for marquee)
        setTimeout(() => {
            banner.style.animation = 'slideUp 0.5s ease-out';
            setTimeout(() => {
                banner.style.display = 'none';
                document.body.style.paddingTop = '0';
            }, 500);
        }, 20000); // Show for 20 seconds
    }
}

function showPage(pageId, event) {
    // Show/hide banner based on page
    const banner = document.getElementById('announcementBanner');
    if (pageId === 'events') {
        if (banner) banner.style.display = 'none';
    } else if (!localStorage.getItem('bannerClosed')) {
        if (banner) banner.style.display = 'block';
    }
    // Prevent default if event exists (for anchor clicks)
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }

    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.style.display = 'none';
    });

    // Show the selected page
    const activePage = document.getElementById(pageId);
    if (activePage) {
        activePage.style.display = 'block';
    }

    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('onclick') && link.getAttribute('onclick').includes(`'${pageId}'`)) {
            link.classList.add('active');
        }
    });

    // Update URL without page reload
    updateUrl(pageId);

    // Scroll to top
    try {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } catch (e) {
        window.scrollTo(0, 0);
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function (event) {
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page') || 'home';
    showPage(pageId);
});

// Show banner on page load if not on events page and not closed before
document.addEventListener('DOMContentLoaded', function () {
    const currentPage = window.location.pathname.split('/').pop() || 'home';
    const banner = document.getElementById('announcementBanner');

    // Show banner on all pages except events, and only if not closed before
    if (currentPage !== 'events' && !localStorage.getItem('bannerClosed') && banner) {
        // Initial show
        showBannerWithAnimation();

        // Set interval to show banner every 15 seconds after it disappears
        // Total cycle: 20s visible + 15s hidden = 35s
        bannerInterval = setInterval(() => {
            showBannerWithAnimation();
        }, 35000); // 35 seconds (20s display + 15s wait)
    }

    // Check for page parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const pageId = urlParams.get('page') || 'home';

    // Show the appropriate page
    showPage(pageId);

    // Event delegation for gallery items
    document.addEventListener('click', function (e) {
        const galleryItem = e.target.closest('.gallery-item');
        if (galleryItem) {
            const eventId = galleryItem.getAttribute('data-event');
            if (eventId) {
                openEventModal(eventId);
            }
        }
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        if ('loading' in HTMLImageElement.prototype) {
            img.setAttribute('src', img.getAttribute('data-src') || img.src);
        } else {
            imageObserver.observe(img);
        }
    });

    // Add click event listeners to all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function (e) {
            const pageId = this.getAttribute('onclick')?.match(/'([^']+)'/)?.[1];
            if (pageId) {
                showPage(pageId, e);
            }
        });
    });

    // Start countdown
    updateCountdown();
});

function openEventModal(eventType) {
    const modal = document.getElementById(`${eventType}Modal`);
    if (modal) {
        modal.style.display = 'flex';
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        // Focus management for accessibility
        modal.setAttribute('aria-hidden', 'false');
        const closeBtn = modal.querySelector('.modal-close');
        closeBtn && closeBtn.focus();
    }
}

function closeEventModal() {
    document.querySelectorAll('.event-modal').forEach(modal => {
        modal.style.display = 'none';
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    });
    document.body.style.overflow = 'auto';
    // Return focus to the element that opened the modal
    document.activeElement.blur();
}

// Close modal when clicking outside the content
document.addEventListener('click', function (e) {
    if (e.target.classList.contains('event-modal')) {
        closeEventModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeEventModal();
    }
});

// Go to top button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide go to top button
window.addEventListener('scroll', () => {
    const gotoTop = document.getElementById('gotoTop');
    if (window.pageYOffset > 300) {
        gotoTop.classList.add('visible');
    } else {
        gotoTop.classList.remove('visible');
    }
});

// Countdown Timer Function
function updateCountdown() {
    // Set the event date - December 11, 2025, 4:00 PM
    const eventDate = new Date('2025-12-11T16:00:00').getTime();
    const countdownContainer = document.getElementById('eventCountdown');
    const bannerCountdown = document.getElementById('bannerCountdown');

    // Check if countdown has already passed
    if (new Date().getTime() > eventDate) {
        if (countdownContainer) {
            countdownContainer.innerHTML = `
                <div style="font-size: 1.2rem; color: #ef4444; font-weight: bold; text-align: center;">
                    Event has ended!
                </div>
            `;
        }
        const banner = document.getElementById('announcementBanner');
        if (banner) {
            banner.style.display = 'none';
        }
        return; // Stop the function if event has already started
    }

    // Update countdown every second
    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventDate - now;

        // If countdown is finished
        if (distance < 0) {
            clearInterval(countdownInterval);

            // Update main countdown
            if (countdownContainer) {
                countdownContainer.innerHTML = `
                    <div style="font-size: 1.2rem; color: #4ade80; font-weight: bold; text-align: center;">
                        🎉 The event has started! 🎉
                    </div>
                `;
            }

            // Update banner countdown
            if (bannerCountdown) {
                bannerCountdown.innerHTML = `
                    <span style="color: #4ade80;">🎉 Event Started!</span>
                `;
            }

            return;
        }

        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update main countdown (event card)
        const daysEl = document.getElementById('days');
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');

        if (daysEl) daysEl.textContent = days.toString().padStart(2, '0');
        if (hoursEl) hoursEl.textContent = hours.toString().padStart(2, '0');
        if (minutesEl) minutesEl.textContent = minutes.toString().padStart(2, '0');
        if (secondsEl) secondsEl.textContent = seconds.toString().padStart(2, '0');

        // Update banner countdown (compact version)
        const bannerDays = document.getElementById('bannerDays');
        const bannerHours = document.getElementById('bannerHours');
        const bannerMinutes = document.getElementById('bannerMinutes');
        const bannerSeconds = document.getElementById('bannerSeconds');

        if (bannerDays) bannerDays.textContent = days.toString().padStart(2, '0');
        if (bannerHours) bannerHours.textContent = hours.toString().padStart(2, '0');
        if (bannerMinutes) bannerMinutes.textContent = minutes.toString().padStart(2, '0');
        if (bannerSeconds) bannerSeconds.textContent = seconds.toString().padStart(2, '0');
    }, 1000);
}
