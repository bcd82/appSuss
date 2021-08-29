const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { ColorInput } from './ColorInput.jsx';

class _AddNoteVideo extends React.Component {
  state = {
    note: {
      url: null,
      title: '',
      backgroundColor: '',
    },
    urlId: '',
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

  onAddNoteVideo = (ev) => {
    ev.preventDefault();
    const { urlId } = this.state;
    const { url, title, backgroundColor } = this.state.note;
    if (!urlId) return;
    const newNote = {
      id: utilService.makeId(),
      type: 'note-video',
      info: {
        url: urlId,
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

  onGetIdFromUrl = (ev) => {
    ev.preventDefault();
    if (!this.state.note.url) return;
    keepService
      .getIdFromUrl(this.state.note.url)
      .then((urlId) => {
        this.setState({ urlId });
      })
      .then(() => {
        this.onAddNoteVideo(event);
      });
  };

  render() {
    const { url, title } = this.state;
    return (
      <section>
        <form className='note-txt-add'>
          <label htmlFor='title'></label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            placeholder='Title'
            onChange={this.handleChange}
          />

          <label htmlFor='url'></label>
          <input
            type='text'
            id='url'
            name='url'
            value={url}
            placeholder='URL'
            onChange={this.handleChange}
          />
          <button
            onClick={() => {
              this.onGetIdFromUrl(event);
            }}
          >
            Add
          </button>
          <div className='colors-picker'>
            <ColorInput onChangeStyle={this.colorPicker} />
          </div>
        </form>
      </section>
    );
  }
}

export const AddNoteVideo = withRouter(_AddNoteVideo);
