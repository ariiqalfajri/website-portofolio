// ---------------------------------------------------------------------------
// Ariiq Islam Alfajri — Portfolio
// Shared behaviour for every page: sticky header state, mobile nav,
// back-to-top, footer year, and (on the contact page only) the Firebase
// contact form submission.
// ---------------------------------------------------------------------------

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Header background once the page has scrolled past the hero
const header = document.getElementById('site-header');
if (header) {
    const toggleHeader = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 40);
    };
    toggleHeader();
    window.addEventListener('scroll', toggleHeader, { passive: true });
}

// Back-to-top button: fixed to the viewport, always scrolls to the top of
// the CURRENT page rather than relying on a per-page anchor id (the old
// version pointed at "#home" / "#contact", which broke on pages that had
// no such section).
const toTop = document.querySelector('#to-top');
if (toTop) {
    const toggleToTop = () => {
        toTop.classList.toggle('hidden', window.scrollY <= 400);
        toTop.classList.toggle('flex', window.scrollY > 400);
    };
    toggleToTop();
    window.addEventListener('scroll', toggleToTop, { passive: true });

    toTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Hamburger / mobile nav
const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function () {
        const isOpen = hamburger.classList.toggle('hamburger-active');
        navMenu.classList.toggle('hidden');
        hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the menu when the user taps outside it
    window.addEventListener('click', function (e) {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('hamburger-active');
            navMenu.classList.add('hidden');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
}

// ---------------------------------------------------------------------------
// Contact form (only present on pages/contact.html)
// ---------------------------------------------------------------------------

const contactForm = document.getElementById('ContactForm');

if (contactForm) {
    const alertBox = document.getElementById('alert');
    const submitBtn = document.getElementById('ContactSubmit');
    const submitLabel = submitBtn ? submitBtn.textContent : 'Send';

    // Firebase is loaded as a classic <script> in the page (firebase-app.js);
    // the database SDK is imported here as an ES module.
    import('https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js')
        .then(({ getDatabase, ref, push, set }) => {
            const firebaseConfig = {
                apiKey: "AIzaSyCgTWhqHWqq0drAuxLsm516hDIC3NF7QWg",
                authDomain: "contactform-ae4f5.firebaseapp.com",
                databaseURL: "https://contactform-ae4f5-default-rtdb.asia-southeast1.firebasedatabase.app",
                projectId: "contactform-ae4f5",
                storageBucket: "contactform-ae4f5.firebasestorage.app",
                messagingSenderId: "229021109014",
                appId: "1:229021109014:web:d2f1565ee29d9bf1041e37"
            };

            import('https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js').then(({ initializeApp }) => {
                const app = initializeApp(firebaseConfig);
                const database = getDatabase(app);
                const messagesRef = ref(database, 'message');

                contactForm.addEventListener('submit', function (e) {
                    e.preventDefault();

                    const name = document.getElementById('name').value.trim();
                    const email = document.getElementById('email').value.trim();
                    const message = document.getElementById('message').value.trim();

                    if (!name || !email || !message) {
                        showAlert('Mohon lengkapi semua kolom terlebih dahulu.', true);
                        return;
                    }

                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.textContent = 'Mengirim...';
                    }

                    const newMessageRef = push(messagesRef);
                    set(newMessageRef, { name, email, message })
                        .then(() => {
                            showAlert('Pesan terkirim, terima kasih! Saya akan segera membalas.', false);
                            contactForm.reset();
                        })
                        .catch(() => {
                            showAlert('Maaf, pesan gagal terkirim. Coba lagi atau hubungi lewat email.', true);
                        })
                        .finally(() => {
                            if (submitBtn) {
                                submitBtn.disabled = false;
                                submitBtn.textContent = submitLabel;
                            }
                        });
                });
            });
        })
        .catch(() => {
            // Firebase failed to load (e.g. offline) — keep the form usable
            // and tell the person to reach out by email instead.
            contactForm.addEventListener('submit', function (e) {
                e.preventDefault();
                showAlert('Layanan pengiriman sedang tidak tersedia. Silakan email langsung ke ariiq.i.alfajri@gmail.com.', true);
            });
        });

    function showAlert(text, isError) {
        if (!alertBox) return;
        alertBox.textContent = text;
        alertBox.classList.remove('hidden');
        alertBox.classList.toggle('text-red-600', isError);
        alertBox.classList.toggle('text-blueprint', !isError);
        window.clearTimeout(showAlert._t);
        showAlert._t = window.setTimeout(() => {
            alertBox.classList.add('hidden');
        }, 5000);
    }
}
