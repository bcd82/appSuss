import { AddNoteTxt } from './AddNoteTxt.jsx';
import { AddNoteImg } from './AddNoteImg.jsx';
import { AddNoteTodos } from './AddNoteTodos.jsx';
import { AddNoteVideo } from './AddNoteVideo.jsx';

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
      <section
        onClick={(ev) => {
          ev.stopPropagation();
        }}
        className='modal'
      >
        <section className='add-note-btns'>
          <img
            src='../../../../assets/icons/text.png'
            onClick={() => {
              this.toggleType('note-txt');
            }}
          />

          <img
            src='../../../../assets/icons/image.png'
            onClick={() => {
              this.toggleType('note-img');
            }}
          />
          <img
            src='../../../../assets/icons/todos.png'
            onClick={() => {
              this.toggleType('note-todos');
            }}
          />
          <img
            src='../../../../assets/icons/youtube.png'
            onClick={() => {
              this.toggleType('note-video');
            }}
          />
        </section>
        {type === 'note-txt' && <AddNoteTxt />}
        {type === 'note-img' && <AddNoteImg />}
        {type === 'note-todos' && <AddNoteTodos />}
        {type === 'note-video' && <AddNoteVideo />}
      </section>
    );
  }
}
