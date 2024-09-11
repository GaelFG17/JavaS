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

    const saveNotes = (notes) => {
        localStorage.setItem('notes', JSON.stringify(notes));
    };

    // Crear notas
    const createNoteElement = (text) => {
        const noteDiv = document.createElement('div');
        noteDiv.className = 'note';
        noteDiv.innerHTML = `
            <p>${text}</p>
            <button onclick="deleteNote(this)">Eliminar</button>
        `;
        noteContainer.appendChild(noteDiv);
    };

    //ADD
    addNoteBtn.addEventListener('click', () => {
        const noteText = noteInput.value.trim();
        if (noteText) {
            const notes = JSON.parse(localStorage.getItem('notes')) || [];
            notes.push(noteText);
            saveNotes(notes);
            createNoteElement(noteText);
            noteInput.value = '';
        }
    });

    // Borrar notas
    window.deleteNote = (btn) => {
        const noteDiv = btn.parentElement;
        const noteText = noteDiv.querySelector('p').textContent;
        let notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes = notes.filter(note => note !== noteText);
        saveNotes(notes);
        noteDiv.remove();
    };

    loadNotes();
})