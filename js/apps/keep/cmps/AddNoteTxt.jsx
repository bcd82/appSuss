const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { ColorInput } from './ColorInput.jsx';
class _AddNoteTxt extends React.Component {
  state = {
    note: {
      isPinned: false,
      txt: '',
      backgroundColor:''
    },
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = field === 'isPinned' ? target.checked : target.value;
    console.log(`value`, value);
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };

  onAddNote = (ev) => {
    ev.preventDefault();
    const { isPinned, txt,backgroundColor } = this.state.note;
    if (!txt.length) return;
    const newNote = {
      id: utilService.makeId(),
      type: 'note-txt',
      isPinned: isPinned,
      backgroundColor:backgroundColor,
      info: {
        txt: txt,
      },
    };
    keepService.createNote(newNote).then(() => {
      this.props.history.push('/keep');
    });
  };

  colorPicker = (color) => {
    this.setState((prevState) => ({
      note: { ...prevState.note, ['backgroundColor']: color },
    }));
  };

  render() {
    const { txt } = this.state;
    return (
      <section>
        <form className='note-txt-add' onSubmit={this.onAddNote}>
          <label htmlFor='txt'>Text:</label>
          <input
            type='text'
            id='txt'
            name='txt'
            value={txt}
            onChange={this.handleChange}
          />
          <label htmlFor='isPinned'>Important ?</label>
          <input
            name='isPinned'
            type='checkbox'
            id='isPinned'
            onChange={this.handleChange}
          />

          <button>Add</button>
        </form>
        <div className='colors-picker'>
            <ColorInput onChangeStyle={this.colorPicker} />
          </div>
      </section>
    );
  }
}

export const AddNoteTxt = withRouter(_AddNoteTxt);
