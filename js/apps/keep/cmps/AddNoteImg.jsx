const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { ColorInput } from './ColorInput.jsx';

class _AddNoteImg extends React.Component {
  state = {
    note: {
      url: null,
      title: '',
      backgroundColor: '',
    },
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };
  
  colorPicker = (color) => {
    this.setState((prevState) => ({
      note: { ...prevState.note, ['backgroundColor']: color },
    }));
  };

  onAddNoteImg = (ev) => {
    ev.preventDefault();
    const { url, title, backgroundColor } = this.state.note;
    if (!url) return;
    const newNote = {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url: url,
        title: title,
      },
      style: {
        backgroundColor: backgroundColor,
      },
    };
    keepService.createNote(newNote).then(() => {
      this.props.history.push('/keep');
    });
  };

  render() {
    const { url, title } = this.state;
    return (
      <section>
        <form className='note-txt-add' onSubmit={this.onAddNoteImg}>
          <label htmlFor='title'>Image Title</label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={this.handleChange}
          />

          <label htmlFor='url'>URL Image</label>
          <input
            type='url'
            id='url'
            name='url'
            value={url}
            onChange={this.handleChange}
          />
          <div className='colors-picker'>
            <ColorInput onChangeStyle={this.colorPicker} />
          </div>

          <button>Add</button>
        </form>
      </section>
    );
  }
}

export const AddNoteImg = withRouter(_AddNoteImg);
