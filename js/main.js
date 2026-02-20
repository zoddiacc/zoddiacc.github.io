/**
 * Zoddiacc Portfolio — Main Script
 *
 * Modules:
 *  - Navbar (scroll effect + mobile menu)
 *  - Scroll Reveal (IntersectionObserver)
 *  - Particles (ambient floating dots)
 *  - Smooth Scroll (anchor links)
 */

(function () {
    'use strict';

    // ── DOM references ──
    const navbar = document.getElementById('navbar');
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.getElementById('hamburger');
    const navOverlay = document.getElementById('navOverlay');
    const particlesContainer = document.getElementById('particles');

    // ── Navbar: scroll effect ──
    function handleNavScroll() {
        navbar.classList.toggle('scrolled', window.pageYOffset > 50);
    }

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // ── Mobile menu ──
    function openMenu() {
        navLinks.classList.add('open');
        hamburger.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
        navLinks.classList.remove('open');
        hamburger.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    function toggleMenu() {
        navLinks.classList.contains('open') ? closeMenu() : openMenu();
    }

    hamburger.addEventListener('click', toggleMenu);
    navOverlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // ── Scroll Reveal (IntersectionObserver) ──
    var revealElements = document.querySelectorAll('.reveal');

    var revealObserver = new IntersectionObserver(
        function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach(function (el) {
        revealObserver.observe(el);
    });

    // ── Floating particles ──
    function createParticles() {
        var count = window.innerWidth < 768 ? 8 : 15;

        for (var i = 0; i < count; i++) {
            var particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 4 + 's';
            particle.style.animationDuration = 3 + Math.random() * 3 + 's';
            var size = 2 + Math.random() * 3 + 'px';
            particle.style.width = size;
            particle.style.height = size;
            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            var target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
})();
