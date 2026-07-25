// FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyC1Xy9Qtdk3lHSIXgK59ZGaYdpMWeT3T_Q",
    authDomain: "yaseen-shahid.firebaseapp.com",
    projectId: "yaseen-shahid",
    storageBucket: "yaseen-shahid.firebasestorage.app",
    messagingSenderId: "891235183557",
    appId: "1:891235183557:web:256e6c05726f7e0869f9ac",
    measurementId: "G-2KH7C7483B"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// MOBILE MENU
document.querySelector('.mobile-menu-btn').addEventListener('click', function() {
    document.querySelector('nav ul').classList.toggle('show');
});

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({ top: targetElement.offsetTop - 80, behavior: 'smooth' });
            document.querySelector('nav ul').classList.remove('show');
        }
    });
});

// ANIMATE ON SCROLL
const animatedElements = document.querySelectorAll('.animate');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.2 });
animatedElements.forEach(el => observer.observe(el));

// POPUP: GET STARTED buttons
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('GET STARTED') || btn.textContent.includes('GET STARTED NOW')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('popup-form').style.display = 'flex';
        });
    }
});

// CLOSE POPUP
document.getElementById('close-form').addEventListener('click', () => {
    document.getElementById('popup-form').style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === document.getElementById('popup-form')) {
        document.getElementById('popup-form').style.display = 'none';
    }
});

// LEAD FORM SUBMIT
document.getElementById('lead-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
        name: this.name.value,
        email: this.email.value,
        mobile: this.mobile.value,
        city: this.city.value,
        province: this.province.value,
        timestamp: new Date().toISOString()
    };
    const newLeadKey = db.ref().child('leads').push().key;
    db.ref('leads/' + newLeadKey).set(data)
        .then(() => {
            this.style.display = 'none';
            document.getElementById('form-success').style.display = 'block';
            setTimeout(() => {
                document.getElementById('popup-form').style.display = 'none';
                this.reset();
                document.getElementById('form-success').style.display = 'none';
                this.style.display = 'block';
            }, 3000);
        })
        .catch(err => alert("Error: " + err));
});
