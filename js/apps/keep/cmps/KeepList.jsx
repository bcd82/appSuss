import { KeepPreview } from './KeepPreview.jsx';
export function KeepList({
  notes,
  onDeleteNote,
  onTogglePin,
  onChangeStyleNote,
  onDuplicateNote,
  onSendNoteToMail,
}) {
  return (
    <div className='keep-list'>
      {notes.map((note) => (
        <KeepPreview
          onSendNoteToMail={onSendNoteToMail}
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
