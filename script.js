/* ============================================
   Amiimu Gadgets - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Page Loader ----------
    const pageLoader = document.getElementById('pageLoader');
    if (pageLoader) {
        window.addEventListener('load', function () {
            setTimeout(function () {
                pageLoader.classList.add('hidden');
            }, 500);
        });
    }

    // ---------- Navbar Scroll Effect ----------
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ---------- Mobile Menu Toggle ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function () {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ---------- Scroll to Top ----------
    const scrollTopBtn = document.getElementById('scrollTop');
    if (scrollTopBtn) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ---------- Scroll Animations ----------
    const fadeElements = document.querySelectorAll('.fade-in, .slide-left, .slide-right');
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(function (el) {
        observer.observe(el);
    });

    // ---------- Search Functionality ----------
    const searchInput = document.getElementById('searchInput');
    const searchOverlay = document.getElementById('searchOverlay');
    const searchResults = document.getElementById('searchResults');

    // Product database for search
    const products = [
        { name: 'PS5 Slim Digital Edition - Brand New', category: 'PlayStation 5', price: '2,600,000 UGX', link: 'Links/Shop.html#ps5' },
        { name: 'PS5 Slim CD Version - Brand New', category: 'PlayStation 5', price: '2,800,000 UGX', link: 'Links/Shop.html#ps5' },
        { name: 'PS5 Slim Digital - Used', category: 'PlayStation 5', price: '2,300,000 UGX', link: 'Links/Shop.html#ps5' },
        { name: 'PS5 Slim CD Version - Used', category: 'PlayStation 5', price: '2,400,000 UGX', link: 'Links/Shop.html#ps5' },
        { name: 'PS5 Pro Edition', category: 'PlayStation 5', price: 'Contact Us', link: 'Links/Shop.html#ps5' },
        { name: 'PS4 Pro Edition', category: 'PlayStation 4', price: '1,200,000 UGX', link: 'Links/Shop.html#ps4' },
        { name: 'PS4 Standard', category: 'PlayStation 4', price: '850,000 UGX', link: 'Links/Shop.html#ps4' },
        { name: 'PS4 Slim', category: 'PlayStation 4', price: '950,000 UGX', link: 'Links/Shop.html#ps4' },
        { name: 'PS4 White Pro', category: 'PlayStation 4', price: 'Contact Us', link: 'Links/Shop.html#ps4' },
        { name: 'PS3 Console', category: 'PlayStation 3', price: 'Contact Us', link: 'Links/Shop.html#ps3' },
        { name: 'PS2 Console', category: 'PlayStation 2', price: 'Contact Us', link: 'Links/Shop.html#ps2' },
        { name: 'Xbox Series X', category: 'Xbox', price: 'Contact Us', link: 'Links/Shop.html#xbox' },
        { name: 'Xbox Series S', category: 'Xbox', price: 'Contact Us', link: 'Links/Shop.html#xbox' },
        { name: 'Xbox 360', category: 'Xbox', price: 'Contact Us', link: 'Links/Shop.html#xbox' },
        { name: 'PS5 DualSense Controller - Brand New', category: 'Controllers', price: '280,000 UGX', link: 'Links/Shop.html#controllers' },
        { name: 'PS5 DualSense Controller - Used', category: 'Controllers', price: '200,000 UGX', link: 'Links/Shop.html#controllers' },
        { name: 'PS4 Controller - Brand New', category: 'Controllers', price: '100,000 UGX', link: 'Links/Shop.html#controllers' },
        { name: 'PS4 Controller - Used', category: 'Controllers', price: '70,000 UGX', link: 'Links/Shop.html#controllers' },
        { name: 'X3 Wireless Controller', category: 'Controllers', price: 'Contact Us', link: 'Links/Shop.html#controllers' },
        { name: 'PS5 Controller Grip Cover', category: 'Accessories', price: 'Contact Us', link: 'Links/Shop.html#accessories' },
        { name: 'Kotion G9000 Pro Headset', category: 'Headsets', price: 'Contact Us', link: 'Links/Shop.html#headsets' },
        { name: 'Pulse 3D Wireless Headset', category: 'Headsets', price: 'Contact Us', link: 'Links/Shop.html#headsets' },
        { name: 'CR9 Gamer Headset', category: 'Headsets', price: 'Contact Us', link: 'Links/Shop.html#headsets' },
        { name: 'VG Gne 2 Racing Wheel', category: 'Racing', price: 'Contact Us', link: 'Links/Shop.html#racing' },
        { name: 'G29 Driving Force Racing Wheel', category: 'Racing', price: 'Contact Us', link: 'Links/Shop.html#racing' },
        { name: 'Gaming Chair', category: 'Chairs', price: '950,000 UGX', link: 'Links/Shop.html#chairs' },
        { name: 'Call of Duty Black Ops 7', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'Elden Ring', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'God of War Ragnarok', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'Spider-Man 2', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'Cyberpunk 2077', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'FC 26', category: 'PS5 Games', price: '230,000 UGX', link: 'Links/Shop.html#games' },
        { name: 'GTA V', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'Black Myth Deluxe Edition', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
        { name: 'Mortal Kombat 1', category: 'PS5 Games', price: 'Contact Us', link: 'Links/Shop.html#games' },
    ];

    if (searchInput && searchOverlay && searchResults) {
        searchInput.addEventListener('input', function () {
            const query = this.value.toLowerCase().trim();
            if (query.length < 2) {
                searchOverlay.style.display = 'none';
                return;
            }

            const filtered = products.filter(function (p) {
                return p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query);
            });

            if (filtered.length === 0) {
                searchResults.innerHTML = '<div style="padding: 20px; text-align: center; color: var(--text-light);">No products found for "' + query + '"</div>';
            } else {
                searchResults.innerHTML = filtered.map(function (p) {
                    return '<a href="' + p.link + '" class="search-result-item">' +
                        '<div class="search-result-info"><h4>' + p.name + '</h4><span>' + p.category + '</span></div>' +
                        '<span class="search-result-price">' + p.price + '</span></a>';
                }).join('');
            }
            searchOverlay.style.display = 'block';
        });

        searchInput.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                searchOverlay.style.display = 'none';
                searchInput.value = '';
            }
        });

        document.addEventListener('click', function (e) {
            if (!searchInput.contains(e.target) && !searchOverlay.contains(e.target)) {
                searchOverlay.style.display = 'none';
            }
        });
    }

    // ---------- Newsletter Form ----------
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterMsg = document.getElementById('newsletterMsg');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;

            // EmailJS integration point - replace with your EmailJS credentials
            // For now, we use a mailto fallback
            const subject = encodeURIComponent('New Subscription');
            const body = encodeURIComponent('New subscription request from:\n\nEmail: ' + email + '\n\n---\nAmiimu Gadgets Website');
            window.location.href = 'mailto:amiimugadgets2026ug@gmail.com?subject=' + subject + '&body=' + body;

            if (newsletterMsg) {
                newsletterMsg.textContent = 'Thank you for subscribing! You will hear from us soon.';
                newsletterMsg.style.display = 'block';
            }
            newsletterForm.reset();
        });
    }

    // ---------- Smooth Scroll for Anchor Links ----------
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});
