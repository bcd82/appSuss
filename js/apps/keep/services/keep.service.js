import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
  query,
  createNote,
  getNoteById,
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
  return Promise.resolve()
}

// function saveReview(noteId, name, rate, txt, writeAt) {
//   let newReview = {
//     name,
//     rate,
//     txt,
//     writeAt,
//   };
//   const noteIdx = gNotes.findIndex((note) => {
//     return note.id === noteId;
//   });
//   gNotes[noteIdx].reviews.push(newReview);
//   _saveNotesToStorage();
//   return Promise.resolve();
// }

function getNoteById(noteId) {
  var note = gNotes.find(function (note) {
    return noteId === note.id;
  });
  return Promise.resolve(note);
}

// function addNote(name) {
//   const newNote = {
//     id: utilService.makeId(),
//     name,
//     img: `/assets/img/${pickColor()}-note.png`,
//   };
//   gNotes.push(newNote);
// }

function deleteNote(noteId, idx) {
  console.log('noteId,idx :>> ', noteId, idx);
  const noteIdx = gNotes.findIndex((note) => {
    return note.id === noteId;
  });
  gNotes[noteIdx].reviews.splice(idx, 1);
  _saveNotesToStorage();
  return Promise.resolve();
}

function _saveNotesToStorage() {
  storageService.saveToStorage(KEY, notes);
}
