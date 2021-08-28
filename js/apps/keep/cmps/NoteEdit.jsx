import { keepService } from '../services/keep.service.js';
import { eventBusService } from '../../../../js/services/event.bus.service.js';

export class NoteEdit extends React.Component {
  state = {
    note: null,
    notes: [],
  };

  componentDidMount() {
    const noteId = this.props.match.params.id;
    keepService.getNoteById(noteId).then((note) => {
      this.setState({ note: note });
    });
  }
  onSaveNote = () => {
    keepService.updateNote({ note }).then((notes) => {
      this.setState({ notes });
      this.props.history.push('/keep');
    });
    eventBusService.emit('update-notes', notes);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = field === 'isPinned' ? target.checked : target.value;
    this.setState((prevState) => ({
      note: {
        ...prevState.note,
        info: { ...prevState.note.info, [field]: value },
      },
    }));
  };

  onCloseModal = () => {
    this.props.history.push('/keep');
  };

  render() {
    const { note } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <React.Fragment>
        <div className='modal-bg' onClick={this.onCloseModal}></div>
        <div className='note-edit'>
          <form className='note-txt-add' onSubmit={this.onSaveNote}>
            <label htmlFor='txt'>Text:</label>
            <input
              type='text'
              id='txt'
              name='txt'
              value={note.info.txt}
              onChange={this.handleChange}
            />
            <label htmlFor='isPinned'>Important ?</label>
            <input
              name='isPinned'
              type='checkbox'
              id='isPinned'
              value={note.isPinned}
              onChange={this.handleChange}
            />
            <button className='note-save-btn'>Save</button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
