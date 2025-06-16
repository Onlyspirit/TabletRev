console.log('Signup script loaded');

// Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDM4faLV5YRdGb2x5IRMUvk0yMlg6F3w-8",
  authDomain: "tabletrevelation.firebaseapp.com",
  projectId: "tabletrevelation",
  storageBucket: "tabletrevelation.firebasestorage.app",
  messagingSenderId: "307761137904",
  appId: "1:307761137904:web:30aed3ba534817dac99a35"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const provider = new GoogleAuthProvider();
const provider2 = new GithubAuthProvider();

// Google Sign In
const signGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      // window.location.href = 'dashboard.html';
    }).catch((error) => {
      console.error(error.message);
    });
};

// GitHub Sign In
const signGithub = () => {
  signInWithPopup(auth, provider2)
    .then((result) => {
      const user = result.user;
      window.location.href = 'dashboard.html';
    }).catch((error) => {
      console.error(error.message);
    });
};

window.signGoogle = signGoogle;
window.signGithub = signGithub;

// Form Validation & Local Save
const errHandling = () => {
  let uname = username.value.trim();
  let pword = password.value.trim();
  let mail = email.value.trim();
  let cword = confirmPassword.value.trim();

  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const regexPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  const basket = JSON.parse(localStorage.getItem('bottle')) || [];

  if (!uname || !pword || !cword || !mail) {
    show.innerHTML = `Enter all inputs 💘💘💘`;
    setTimeout(() => (show.innerHTML = ''), 2000);
    return;
  }

  if (!regexEmail.test(mail)) {
    show.innerHTML = `Invalid email 💘💘💘`;
    setTimeout(() => (show.innerHTML = ''), 2000);
    return;
  }

  if (!regexPassword.test(pword)) {
    show.innerHTML = `Invalid password 💘💘💘`;
    setTimeout(() => (show.innerHTML = ''), 2000);
    return;
  }

  if (pword !== cword) {
    show.innerHTML = `Passwords do not match 💘💘💘`;
    setTimeout(() => (show.innerHTML = ''), 2000);
    return;
  }

  const obj = { uname, pword, mail };
  basket.push(obj);
  localStorage.setItem('bottle', JSON.stringify(basket));
  window.location.href = 'LogIn.html';
};

const clicks = () => errHandling();
const signIn = () => window.location.href = 'LogIn.html';

window.clicks = clicks;
window.signIn = signIn;
