import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx';
// import { NoteVideo } from './NoteVideo.jsx';
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
    const { note, type } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className='note-preview'>
        {type ==='note-txt' && <NoteTxt key={note.id} note={note} />}
        {type ==='note-img' && <NoteImg note={note}/>}
        {/* {type ==='note-video' && <NoteVideo note={note}/>} */}
        {type === 'note-todos' && <NoteTodos key={note.id} note={note} />}
      </article>
    );
  }
}
