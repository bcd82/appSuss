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
              key={note.id}
              note={note}
            />
          ))}
      </section>
    </div>
  );
}
// export class KeepList extends React.Component {
//   state = {
//     isPinned: null,
//     notes:this.[]
//   };

//   onIsPinned = (isPinned) => {
//     this.setState({ isPinned: isPinned });
//   };

//   render() {
//     const {
//       notes,
//       onDeleteNote,
//       onTogglePin,
//       onChangeStyleNote,
//       onDuplicateNote,
//       onSendNoteToMail,
//     } = this.props;
//     const { isPinned } = this.state;
//     return (
//       <div className='keep-list'>
//         <div className='pinned'>
//           {notes.map((note) => {
//             if (note.isPinned) {
//               this.onIsPinned(note.isPinned);
//             }
//           })}
//         </div>
//         {notes.map((note) => (
//           <KeepPreview
//             onSendNoteToMail={onSendNoteToMail}
//             onDuplicateNote={onDuplicateNote}
//             onChangeStyleNote={onChangeStyleNote}
//             onTogglePin={onTogglePin}
//             onDeleteNote={onDeleteNote}
//             key={note.id}
//             note={note}
//           />
//         ))}
//       </div>
//     );
//   }
// }
