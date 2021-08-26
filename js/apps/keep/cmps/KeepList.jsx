import { KeepPreview } from './KeepPreview.jsx';
export function KeepList({
  notes,
  onDeleteNote,
  onTogglePin,
  onChangeStyleNote,
  onDuplicateNote,
}) {
  return (
    <div className='keep-list'>
      {notes.map((note) => (
        <KeepPreview
          onDuplicateNote={onDuplicateNote}
          onChangeStyleNote={onChangeStyleNote}
          onTogglePin={onTogglePin}
          onDeleteNote={onDeleteNote}
          key={note.id}
          note={note}
        />
      ))}
    </div>
  );
}
