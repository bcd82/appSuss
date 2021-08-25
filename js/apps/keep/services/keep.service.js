import { storageService } from '../../../services/storage.service.js';
import { utilService } from '../../../services/util.service.js';

export const keepService = {
  query,
};

const notes = [
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

function query() {
  return Promise.resolve(notes);
}
