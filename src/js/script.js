// Navbar fixed
window.onscroll = function () {
  const header = document.querySelector("header");
  const fixedNav = header.offsetTop;
  const toTop = document.querySelector("#to-top");

  if (window.scrollY > fixedNav) {
    header.classList.add("navbar-fixed");
    toTop.classList.remove("hidden");
    toTop.classList.add("flex");
  } else {
    header.classList.remove("navbar-fixed");
    toTop.classList.remove("flex");
    toTop.classList.add("hidden");
  }
};

// Hamburger
const hamburger = document.querySelector("#hamburger");
const navMenu = document.querySelector("#nav-menu");

hamburger.addEventListener("click", function () {
  hamburger.classList.toggle("hamburger-active");
  navMenu.classList.toggle("hidden");
});

// Click outside Hamburger
window.addEventListener("click", function (e) {
  if (e.target != hamburger && e.target != navMenu) {
    hamburger.classList.remove("hamburger-active");
    navMenu.classList.add("hidden");
  }
});

// Firebase customization
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-database.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyCgTWhqHWqq0drAuxLsm516hDIC3NF7QWg",
  authDomain: "contactform-ae4f5.firebaseapp.com",
  databaseURL: "https://contactform-ae4f5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "contactform-ae4f5",
  storageBucket: "contactform-ae4f5.firebasestorage.app",
  messagingSenderId: "229021109014",
  appId: "1:229021109014:web:d2f1565ee29d9bf1041e37"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const messagesRef = ref(database, "message");

// Handle form submit
document.getElementById("ContactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  try {
    // Simpan ke Firebase
    const newMessageRef = push(messagesRef);
    await set(newMessageRef, { name, email, message });

    // Kirim ke API mailer
    const res = await fetch("/api/mailer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });

    if (res.ok) {
      alert("Pesan berhasil dikirim!");
    } else {
      alert("Gagal mengirim pesan ke email.");
    }
  } catch (err) {
    console.error(err);
    alert("Terjadi error.");
  }
});
