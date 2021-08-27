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
    console.log(`value`, value);
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
    console.log(`this.state.note`, this.state.note);
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
    console.log(`url`, url);
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
          <label htmlFor='title'>Video Title</label>
          <input
            type='text'
            id='title'
            name='title'
            value={title}
            onChange={this.handleChange}
          />

          <label htmlFor='url'>URL</label>
          <input
            type='text'
            id='url'
            name='url'
            value={url}
            onChange={this.handleChange}
          />
          <div className='colors-picker'>
            <ColorInput onChangeStyle={this.colorPicker} />
          </div>

          <button
            onClick={() => {
              this.onGetIdFromUrl(event);
            }}
          >
            Add
          </button>
        </form>
      </section>
    );
  }
}

export const AddNoteVideo = withRouter(_AddNoteVideo);
