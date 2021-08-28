import { KeepPreview } from './KeepPreview.jsx';
export function KeepList({
  notes,
  onDeleteNote,
  onTogglePin,
  onChangeStyleNote,
  onDuplicateNote,
  onSendNoteToMail,
  onEditNote,
}) {
  return (
    <div className='keep-list'>
      <section className='pinned'>
        <h3 className='pinned-header'>Pinned</h3>
        {notes
          .filter((note) => note.isPinned)
          .map((note) => (
            <KeepPreview
              onSendNoteToMail={onSendNoteToMail}
              onDuplicateNote={onDuplicateNote}
              onChangeStyleNote={onChangeStyleNote}
              onTogglePin={onTogglePin}
              onDeleteNote={onDeleteNote}
              onEditNote={onEditNote}
              key={note.id}
              note={note}
            />
          ))}
      </section>
      <section className='unpinned'>
        <h3 className='unpinned-header'>Notes</h3>
        {notes
          .filter((note) => !note.isPinned)
          .map((note) => (
            <KeepPreview
              onSendNoteToMail={onSendNoteToMail}
              onDuplicateNote={onDuplicateNote}
              onChangeStyleNote={onChangeStyleNote}
              onTogglePin={onTogglePin}
              onDeleteNote={onDeleteNote}
              onEditNote={onEditNote}
              key={note.id}
              note={note}
            />
          ))}
      </section>
    </div>
  );
}
