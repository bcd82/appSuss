import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
  query,
  createNote,
  getNoteById,
  deleteNote,
  togglePin,
  changeStyleNote,
  duplicateNote,
  getIdFromUrl,
  sendNoteToMail,
  createNoteFromUrl,
  updateNote,
};

const KEY = 'notesDB';
let notes;
_createNotes();

function _createNotes() {
  notes = storageService.loadFromStorage(KEY)
    ? storageService.loadFromStorage(KEY)
    : [
        {
          id: 'n101',
          type: 'note-txt',
          isPinned: true,
          info: {
            txt: 'Fullstack Me Baby!',
          },
          style: {
            backgroundColor: '#fff',
          },
        },
        {
          id: 'n102',
          type: 'note-img',
          isPinned: false,
          info: {
            url: 'https://mascotas100.com/wp-content/uploads/2020/03/329004501_1.jpg',
            title: 'I Love Bobi',
          },
          style: {
            backgroundColor: '#00d',
          },
        },
        {
          id: 'n103',
          type: 'note-todos',
          isPinned: true,
          info: {
            label: 'Get my stuff together',
            todos: [
              { txt: 'Driving liscence', doneAt: null },
              { txt: 'Coding power', doneAt: 187111111 },
            ],
          },
          style: {
            backgroundColor: '#fff',
          },
        },
      ];
  _saveNotesToStorage();
}

function query(filterBy) {
  if (filterBy) {
    let { category } = filterBy;
    const notesToShow = notes.filter((note) => note.type.includes(category));
    return Promise.resolve(notesToShow);
  }
  return Promise.resolve(notes);
}

function createNote(newNote) {
  notes.unshift(newNote);
  _saveNotesToStorage();
  return Promise.resolve();
}

function getNoteById(noteId) {
  var note = notes.find(function (note) {
    noteId === note.id;
  });
  return Promise.resolve(note);
}

function getNoteIdx(noteId) {
  const noteIdx = notes.findIndex((note) => {
    return note.id === noteId;
  });
  return noteIdx;
}

function deleteNote(noteId) {
  const noteIdx = getNoteIdx(noteId);
  notes.splice(noteIdx, 1);
  _saveNotesToStorage();
  return Promise.resolve();
}

function getIdFromUrl(url) {
  const urlSrcPrm = new URLSearchParams(url);
  for (const [key, val] of urlSrcPrm) {
    return Promise.resolve(val);
  }
}

function togglePin(note) {
  const noteIdx = getNoteIdx(note.id);
  const bool = !note.isPinned;
  note.isPinned = bool;
  const pinnedNote = notes.splice(noteIdx, 1);
  if (note.isPinned) {
    notes.unshift(pinnedNote[0]);
  } else {
    const unpinnedNote = notes.findIndex((note) => {
      return !note.isPinned;
    });
    notes.splice(unpinnedNote, 0, pinnedNote[0]);
  }
  _saveNotesToStorage();
  return Promise.resolve(notes);
}
function changeStyleNote(note, color) {
  note.style.backgroundColor = color;
  _saveNotesToStorage();
  return Promise.resolve(notes);
}
function duplicateNote(note) {
  let duplicateNote = { ...note };
  duplicateNote.id = utilService.makeId();
  notes.unshift(duplicateNote);
  _saveNotesToStorage();
  return Promise.resolve(notes);
}

function sendNoteToMail(note) {
  let subject;
  let body;
  if (note.type === 'note-txt') {
    subject = 'no-subject';
    body = note.info.txt;
  } else if (note.type === 'note-img' || note.type === 'note-video') {
    subject = note.info.title;
    body =
      note.type === 'note-img'
        ? `Link: ${note.info.url}`
        : `Link: https://www.youtube.com/watch?v=${note.info.ur}`;
  } else if (note.type === 'note-todos') {
    subject = note.info.label;
    const todos = note.info.todos.map((todo) => {
      let isDone;
      if (todo.doneAt) isDone = 'DONE';
      else isDone = 'UNDONE';
      return `${todo.txt} - ${isDone}\n`;
    });
    body = `TODOs list: ${todos}`;
  }

  return Promise.resolve({ subject, body });
}

function createNoteFromUrl(txt) {
  const note = {
    id: utilService.makeId(),
    type: 'note-txt',
    isPinned: false,
    info: {
      txt,
    },
    style: {
      backgroundColor: '#fff',
    },
  };
  notes.unshift(note);
  _saveNotesToStorage;
}

function updateNote(note) {
  const noteIdx = getNoteIdx(note.id);

  notes[noteIdx] = note;
  _saveNotesToStorage();

  return Promise.resolve(notes);
}

function _saveNotesToStorage() {
  storageService.saveToStorage(KEY, notes);
}
