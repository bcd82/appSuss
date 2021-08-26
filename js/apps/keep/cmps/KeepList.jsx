import { KeepPreview } from './KeepPreview.jsx';
export function KeepList({ notes,onDeleteNote,onTogglePin,onChangeStyleNote }) {
  return (
    <div className='keep-list'>
      {notes.map((note) => (
        <KeepPreview onChangeStyleNote={onChangeStyleNote} onTogglePin={onTogglePin} onDeleteNote={onDeleteNote} key={note.id} note={note} />
        
      ))}
    </div>
  );
}
