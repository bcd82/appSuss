import { KeepPreview } from './KeepPreview.jsx';
export function KeepList({ notes }) {
  return (
    <div className='keep-list'>
      {notes.map((note) => (
        <KeepPreview key={note.id} note={note} />
      ))}
    </div>
  );
}
