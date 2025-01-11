// navbar fixed
window.onscroll = function () {
    const header = document.querySelector('header');
    const fixedNav = header.offsetTop;

    if (window.scrollY > fixedNav) {
        header.classList.add('navbar-fixed');

    } else {
        header.classList.remove('navbar-fixed');
    }
}

// Hamburger

const hamburger = document.querySelector('#hamburger');
const navMenu = document.querySelector('#nav-menu');


hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('hamburger-active');
    navMenu.classList.toggle('hidden');
});

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgTWhqHWqq0drAuxLsm516hDIC3NF7QWg",
    authDomain: "contactform-ae4f5.firebaseapp.com",
    databaseURL: "https://contactform-ae4f5-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "contactform-ae4f5",
    storageBucket: "contactform-ae4f5.firebasestorage.app",
    messagingSenderId: "229021109014",
    appId: "1:229021109014:web:d2f1565ee29d9bf1041e37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Reference messages collection
const messagesRef = ref(database, 'message');

// Listen for form submit
document.getElementById('ContactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    // Get form values
    const name = getInputVal('name');
    const email = getInputVal('email');
    const message = getInputVal('message');

    // Save message
    saveMessage(name, email, message);

    // Show alert by removing the 'hidden' class
    const alertBox = document.getElementById('alert');
    alertBox.classList.remove('hidden');

    // Hide alert after 3 seconds
    setTimeout(function () {
        alertBox.classList.add('hidden');
    }, 3000);
}

// Function to get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

// Save message to Firebase
function saveMessage(name, email, message) {

    // Use push() to add a new message
    const newMessageRef = push(messagesRef);

    // Use set() to save data at that reference
    set(newMessageRef, {
        name: name,
        email: email,
        message: message
    });
}