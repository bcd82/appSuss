import { ColorInput } from './ColorInput.jsx';
export class NoteTxt extends React.Component {
  state = {
    note: null,
    isPlatteOpen: false,
  };

  componentDidMount() {
    const { note } = this.props;
    console.log(`note.isPinned`, note.isPinned);
    this.setState({ note });
  }

  render() {
    const { onDeleteNote, onTogglePin, onChangeStyleNote } = this.props;
    const { note, isPlatteOpen } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article
        className={`note ${note.type}`}
        style={{ backgroundColor: note.backgroundColor }}
      >
        <h3>{note.info.txt}</h3>
        <img
          className={note.isPinned ? 'pin-pushed' : 'pin'}
          src='../../../../assets/icons/push-pin.png'
          onClick={() => onTogglePin(note)}
        />
        <div className='note-features'>
          <img
            className='delete-note'
            src='../../../../assets/icons/delete.png'
            onClick={() => onDeleteNote(note)}
          />
          <img
            className='color-note'
            src='../../../../assets/icons/palette.png'
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
