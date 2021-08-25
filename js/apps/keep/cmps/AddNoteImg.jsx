import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';

export class AddNoteTxt extends React.Component {
  state = {
    note: {
        url:null,
         title:null,
         backgroundColor:'blue'
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
    const { url, title,backgroundColor } = this.state.note;
    if (!url) return;
    const newNote = {
      id: utilService.makeId(),
      type: 'note-img',
      info: {
        url,
        title,
      },
      style: {
        backgroundColor,
      },
    };
    keepService.createNote(newNote);
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
      </section>
    );
  }
}
