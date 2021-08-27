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
};

const KEY = 'notesDB';
const notes = storageService.loadFromStorage(KEY)
  ? storageService.loadFromStorage(KEY)
  : [
      {
        id: 'n101',
        type: 'note-txt',
        isPinned: true,
        info: {
          txt: 'Fullstack Me Baby!',
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
      },
    ];

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
  var note = gNotes.find(function (note) {
    return noteId === note.id;
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
  console.log(`url`, url);
  const urlSrcPrm = new URLSearchParams(url);
  const res = urlSrcPrm.get('v');
  console.log(`res`, res);
  for (const [key, val] of urlSrcPrm) {
    return Promise.resolve(val);
  }
}

function togglePin(note) {
  const noteIdx = getNoteIdx(note.id);
  const bool = !note.isPinned;
  note.isPinned = bool;
  const pinnedNote = notes.splice(noteIdx, 1);
  console.log(`pinnedNote`, pinnedNote);
  if (note.isPinned) {
    console.log(`object`, note.isPinned);
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
  note.backgroundColor = color;
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

function _saveNotesToStorage() {
  storageService.saveToStorage(KEY, notes);
}
