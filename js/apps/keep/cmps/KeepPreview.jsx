import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';

export class KeepPreview extends React.Component {
  state = {
    note: null,
    type: null,
  };

  componentDidMount() {
    const { note } = this.props;
    const type = note.type;
    this.setState({ note });
    this.setState({ type });
  }

  render() {
    const {
      onDeleteNote,
      onTogglePin,
      onChangeStyleNote,
      onDuplicateNote,
      onSendNoteToMail,
    } = this.props;
    const { note, type } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className='note-preview'>
        {type === 'note-txt' && (
          <NoteTxt
            onSendNoteToMail={onSendNoteToMail}
            onDuplicateNote={onDuplicateNote}
            onChangeStyleNote={onChangeStyleNote}
            onTogglePin={onTogglePin}
            onDeleteNote={onDeleteNote}
            key={note.id}
            note={note}
          />
        )}
        {type === 'note-img' && (
          <NoteImg
            onSendNoteToMail={onSendNoteToMail}
            onDuplicateNote={onDuplicateNote}
            onChangeStyleNote={onChangeStyleNote}
            onTogglePin={onTogglePin}
            onDeleteNote={onDeleteNote}
            note={note}
          />
        )}
        {type === 'note-video' && (
          <NoteVideo
            onSendNoteToMail={onSendNoteToMail}
            onDuplicateNote={onDuplicateNote}
            onChangeStyleNote={onChangeStyleNote}
            onTogglePin={onTogglePin}
            onDeleteNote={onDeleteNote}
            note={note}
          />
        )}
        {type === 'note-todos' && (
          <NoteTodos
            onSendNoteToMail={onSendNoteToMail}
            onDuplicateNote={onDuplicateNote}
            onChangeStyleNote={onChangeStyleNote}
            onTogglePin={onTogglePin}
            onDeleteNote={onDeleteNote}
            key={note.id}
            note={note}
          />
        )}
      </article>
    );
  }
}
