import { ColorInput } from './ColorInput.jsx';
export class NoteVideo extends React.Component {
  state = {
    note: null,
    isPlatteOpen: false,
  };

  componentDidMount() {
    const { note } = this.props;
    this.setState({ note });
  }

  render() {
    const {
      onDeleteNote,
      onTogglePin,
      onChangeStyleNote,
      onDuplicateNote,
      onSendNoteToMail,
    } = this.props;
    const { note, isPlatteOpen } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article
        className={`note ${note.type}`}
        style={{ backgroundColor: note.backgroundColor }}
      >
        <iframe
          width='267'
          height='150'
          src={`https://www.youtube.com/embed/${note.info.url}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        />

        <div className='note-features'>
          <img
            className={note.isPinned ? 'pin-pushed' : 'pin'}
            src='./assets/icons/push-pin.png'
            onClick={() => onTogglePin(note)}
          />
          <img
            className='duplicate-note'
            src='./assets/icons/duplicate.png'
            onClick={() => onDuplicateNote(note)}
          />
          <img
            className='delete-note'
            src='./assets/icons/delete.png'
            onClick={() => onDeleteNote(note)}
          />
          <img
            className='send-to-mail'
            src='./assets/icons/send-to-mail.png'
            onClick={() => onSendNoteToMail(note)}
          />
          <img
            className='color-note'
            src='./assets/icons/palette.png'
            onClick={() => {
              this.setState({ isPlatteOpen: !isPlatteOpen });
            }}
          />
          <div className='palette'>
            {isPlatteOpen && (
              <ColorInput onChangeStyleNote={onChangeStyleNote} note={note} />
            )}
          </div>
        </div>
      </article>
    );
  }
}
