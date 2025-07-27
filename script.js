const noteInput = document.getElementById('note-input');
const addNoteBtn = document.getElementById('add-note');
const notesList = document.getElementById('notes-list');
const themeToggleBtn = document.getElementById('theme-toggle');

let notes = JSON.parse(localStorage.getItem('notes')) || [];
let theme = localStorage.getItem('theme') || 'light';

// Initial setup
document.body.classList.toggle('dark', theme === 'dark');
themeToggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';

function renderNotes() {
  notesList.innerHTML = '';
  notes.forEach((note, index) => {
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('note');
    noteDiv.innerHTML = `
      <p>${note}</p>
      <button onclick="deleteNote(${index})">x</button>
    `;
    notesList.appendChild(noteDiv);
  });
}

function addNote() {
  const note = noteInput.value.trim();
  if (note === '') return;

  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  noteInput.value = '';
  renderNotes();
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  renderNotes();
}

function toggleTheme() {
  const isDark = document.body.classList.toggle('dark');
  themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

addNoteBtn.addEventListener('click', addNote);
themeToggleBtn.addEventListener('click', toggleTheme);

renderNotes();
