
// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const closeLoginModal = document.getElementById('closeLoginModal');
const registerModal = document.getElementById('registerModal');
const closeRegisterModal = document.getElementById('closeRegisterModal');
const switchToRegister = document.getElementById('switchToRegister');
const switchToLogin = document.getElementById('switchToLogin');
const logoutBtn = document.getElementById('logoutBtn');
const tutorDashboard = document.getElementById('tutorDashboard');
const mainContent = document.querySelector('body > div:not(#loginModal):not(#registerModal):not(#tutorDashboard)');

// Mock user data
let isLoggedIn = false;
const users = [
    { email: 'tutor@example.com', password: 'password', name: 'Tutor Rahman', role: 'tutor' }
];

// Event Listeners
loginBtn.addEventListener('click', () => {
    loginModal.classList.remove('hidden');
});

closeLoginModal.addEventListener('click', () => {
    loginModal.classList.add('hidden');
});

closeRegisterModal.addEventListener('click', () => {
    registerModal.classList.add('hidden');
});

switchToRegister.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.classList.add('hidden');
    registerModal.classList.remove('hidden');
});

switchToLogin.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.classList.add('hidden');
    loginModal.classList.remove('hidden');
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Mock authentication
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        isLoggedIn = true;
        document.getElementById('loggedInUser').textContent = `Welcome, ${user.name}`;
        loginModal.classList.add('hidden');

        if (user.role === 'tutor') {
            mainContent.classList.add('hidden');
            tutorDashboard.classList.remove('hidden');
        }

        // Change login button to logout
        loginBtn.textContent = 'Logout';
        loginBtn.removeEventListener('click', openLoginModal);
        loginBtn.addEventListener('click', logout);
    } else {
        alert('Invalid credentials');
    }
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    alert('Registration successful! Please login.');
    registerModal.classList.add('hidden');
});

function logout() {
    isLoggedIn = false;
    tutorDashboard.classList.add('hidden');
    mainContent.classList.remove('hidden');
    loginBtn.textContent = 'Login';
    loginBtn.removeEventListener('click', logout);
    loginBtn.addEventListener('click', () => {
        loginModal.classList.remove('hidden');
    });
}

// Dashboard button functionality
document.getElementById('editProfileBtn').addEventListener('click', () => {
    alert('Edit profile functionality would open a profile edit form');
});

document.getElementById('manageScheduleBtn').addEventListener('click', () => {
    alert('Schedule management functionality would open here');
});

document.getElementById('viewStudentsBtn').addEventListener('click', () => {
    alert('Student list would display here');
});

document.getElementById('editFullProfileBtn').addEventListener('click', () => {
    alert('Full profile editor would open here');
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.add('hidden');
    }
    if (e.target === registerModal) {
        registerModal.classList.add('hidden');
    }
});


const texts = [
    "সেরা টিউটরদের সঙ্গে যুক্ত হোন",
    "ঘরে বসে অনলাইন টিউশন",
    "ক্লাস ১ থেকে ১২ পর্যন্ত",
    "বিশ্ববিদ্যালয় ভর্তি প্রস্তুতি",
    "প্রফেশনাল কোর্স ও প্রশিক্ষণ",
    "প্রতিটি বিষয়ের বিশেষজ্ঞ টিউটর",
    "বিভিন্ন স্তরের কোর্স",
    "বিভিন্ন বিষয়ের টিউটরিং",
    "বিসিএস ও স্কিল ডেভেলপমেন্ট কোর্স"
];

let index = 0;
let charIndex = 0;
let isDeleting = false;
let currentText = "";

function type() {
    const typingText = document.getElementById("typing-text");

    if (index >= texts.length) index = 0;
    currentText = texts[index];

    if (isDeleting) {
        charIndex--;
        typingText.textContent = currentText.substring(0, charIndex);
        if (charIndex === 0) {
            isDeleting = false;
            index++;
            setTimeout(type, 500);
            return;
        }
    } else {
        charIndex++;
        typingText.textContent = currentText.substring(0, charIndex);
        if (charIndex === currentText.length) {
            isDeleting = true;
            setTimeout(type, 1200);
            return;
        }
    }

    setTimeout(type, isDeleting ? 60 : 120);
}

type();

