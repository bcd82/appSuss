import { AddNoteTxt } from './AddNoteTxt.jsx';
import { AddNoteImg } from './AddNoteImg.jsx';
import { AddNoteTodos } from './AddNoteTodos.jsx';

export class KeepAdd extends React.Component {
  state = {
    type: 'note-txt',
  };

  toggleType = (type) => {
    this.setState({ type });
  };

  render() {
    const { type } = this.state;
    return (
      <section>
        <button
          onClick={() => {
            this.toggleType('note-txt');
          }}
        >
          Text note
        </button>
        <button
          onClick={() => {
            this.toggleType('note-img');
          }}
        >
          Image note
        </button>
        <button
          onClick={() => {
            this.toggleType('note-todos');
          }}
        >
          Todos-list note
        </button>
        <section className='modal'>
          {type === 'note-txt' && <AddNoteTxt />}
          {type === 'note-img' && <AddNoteImg />}
          {type === 'note-todos' && <AddNoteTodos />}
        </section>
      </section>
    );
  }
}
