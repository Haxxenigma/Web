document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener('scroll', () => {
        const home = document.getElementById('nav-home');
        const about = document.getElementById('nav-about');
        const contact = document.getElementById('nav-contact');

        const homeTriggerPosition = document.getElementById('home').getBoundingClientRect().top;
        const aboutTriggerPosition = document.getElementById('about').getBoundingClientRect().top;
        const contactTriggerPosition = document.getElementById('contact').getBoundingClientRect().top;

        const target = 50;

        if (homeTriggerPosition <= target && aboutTriggerPosition > target) {
            home.classList.add('active');
        } else {
            home.classList.remove('active');
        }
        if (aboutTriggerPosition <= target && contactTriggerPosition > target) {
            about.classList.add('active');
        } else {
            about.classList.remove('active');
        }

        if (contactTriggerPosition <= target) {
            contact.classList.add('active');
        } else {
            contact.classList.remove('active');
        }
    });
});