const { Route, withRouter } = ReactRouterDOM;
import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
import { NoteVideo } from './NoteVideo.jsx';
import { NoteTodos } from './NoteTodos.jsx';
import { NoteEdit } from './NoteEdit.jsx';

class _KeepPreview extends React.Component {
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
      onEditNote,
    } = this.props;
    const { note, type } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className='note-preview'>
        {type === 'note-txt' && (
          <React.Fragment>
            <NoteTxt
              onSendNoteToMail={onSendNoteToMail}
              onDuplicateNote={onDuplicateNote}
              onChangeStyleNote={onChangeStyleNote}
              onTogglePin={onTogglePin}
              onDeleteNote={onDeleteNote}
              onEditNote={onEditNote}
              key={note.id}
              note={note}
            />
            <Route path='/keep/:id' component={NoteEdit} />
          </React.Fragment>
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

export const KeepPreview = withRouter(_KeepPreview);
