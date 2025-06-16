console.log('Dashboard script loaded');

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import { getFirestore, addDoc, collection } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

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
const db = getFirestore(app);

// DOM Elements
const show = document.getElementById('show');
const inputTitle = document.getElementById('inputTitle');
const inputNote = document.getElementById('inputNote');
const output = document.getElementById('output');

// Date
const date = new Date();

// User Session Check
const dashRetrive = JSON.parse(localStorage.getItem('retrive'));
const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];

if (dashRetrive && dashRetrive.uname) {
  setTimeout(() => {
    show.innerHTML = `<p style="color:white;">
      Welcome ${dashRetrive.uname} 💘💘💘,<br>
      Write down the vision on a tablet, make it plain 🤍🤍🤍.<br>
      ${date.toLocaleString()}
    </p>`;
    show.style.display = 'block';
  }, 1000);
} else {
  setTimeout(() => {
    window.location.href = 'LogIn.html';
  }, 1000);
}

// Page Load
window.onload = () => {
  displayNotes();
};

// Submit Note
window.submit = async () => {
  const title = inputTitle.value.trim();
  const note = inputNote.value.trim();

  if (!title && !note) {
    alert('Please enter a title or a note.');
    return;
  }

  const newNote = {
    title,
    note,
    createdAt: date.toLocaleString()
  };

  try {
    await addDoc(collection(db, "submit"), newNote);
  } catch (err) {
    console.error("Failed to save to Firestore:", err);
  }

  savedNotes.push(newNote);
  localStorage.setItem('notes', JSON.stringify(savedNotes));

  inputTitle.value = '';
  inputNote.value = '';
  displayNotes();
};

// Display Notes
function displayNotes() {
  output.innerHTML = '';

  savedNotes.forEach((noteObj, index) => {
    const { title, note, createdAt } = noteObj;

    const noteCard = document.createElement('div');
    noteCard.className = 'note';
    noteCard.innerHTML = `
      <h3>${title || 'Untitled'}</h3>
      <p>${note || 'No content'}</p>
      <button onclick="deleteNote(${index})">Delete</button><br>
      <b>${createdAt || 'IN THE BEGINNING GOD...'}</b>
    `;
    output.appendChild(noteCard);
  });
}

// Delete Note
window.deleteNote = (index) => {
  savedNotes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(savedNotes));
  displayNotes();
};
