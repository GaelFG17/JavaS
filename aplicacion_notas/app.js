document.addEventListener('DOMContentLoaded', () => {
    const noteContainer = document.getElementById('note-container');
    const noteInput = document.getElementById('note-input');
    const addNoteBtn = document.getElementById('add-note-btn');

    // Load notes from localStorage
    const loadNotes = () => {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        noteContainer.innerHTML = '';
        notes.forEach(note => {
            createNoteElement(note);
        });
    };
})