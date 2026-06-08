// ─────────────────────────────────────────
//  HostelHub — main script.js
// ─────────────────────────────────────────

document.addEventListener("DOMContentLoaded", () => {

    // ── 1. Navbar shrink on scroll ────────
    const navbar = document.querySelector(".navbar");
    if (navbar) {
        window.addEventListener("scroll", () => {
            navbar.classList.toggle("shrink", window.scrollY > 50);
        });
    }

    // ── 2. Active nav link (current page) ─
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        if (href === currentPage) {
            // Remove active from any others first
            navLinks.forEach(l => l.classList.remove("active"));
            link.classList.add("active");
        }
    });

    // ── 3. Scroll-reveal ─────────────────
    const reveals = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                revealObserver.unobserve(entry.target); // fire once
            }
        });
    }, { threshold: 0.12 });

    reveals.forEach(el => revealObserver.observe(el));

    // ── 4. Login form validation ──────────
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = loginForm.querySelector("#username").value.trim();
            const password = loginForm.querySelector("#password").value.trim();
            const msg = document.getElementById("login-msg");

            if (!username || !password) {
                showMsg(msg, "Please fill in all fields.", "error");
                return;
            }

            // Simulate login (replace with real auth)
            showMsg(msg, "Logging you in…", "success");
            setTimeout(() => window.location.href = "index.html", 1200);
        });
    }

    // ── 5. Contact form validation ────────
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const msg = document.getElementById("contact-msg");
            showMsg(msg, "Message sent! We'll be in touch shortly.", "success");
            contactForm.reset();
        });
    }

    // ── 6. Gallery lightbox (simple) ─────
    const galleryItems = document.querySelectorAll(".gallery-item");
    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            // simple: could expand to a modal in production
            item.style.outline = "3px solid var(--clr-primary)";
            setTimeout(() => item.style.outline = "", 600);
        });
    });

    // ── helper ───────────────────────────
    function showMsg(el, text, type) {
        if (!el) return;
        el.textContent = text;
        el.className = "form-msg " + type;
    }

});
