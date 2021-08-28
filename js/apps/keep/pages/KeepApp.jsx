const { withRouter } = ReactRouterDOM;

import { KeepList } from '../cmps/KeepList.jsx';
import { keepService } from '../services/keep.service.js';
import { KeepFilter } from '../cmps/KeepFilter.jsx';
import { KeepHeader } from '../cmps/KeepHeader.jsx';
import { eventBusService } from '../../../../js/services/event.bus.service.js';
class _KeepApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
  };

  componentDidMount() {
    eventBusService.on('update-notes', (notes) => {
      this.setState({ notes });
    });
    const urlSrcPrm = new URLSearchParams(this.props.location.search);
    if (urlSrcPrm.has('text')) {
      const txt = urlSrcPrm.get('text');
      keepService.createNoteFromUrl(txt);
      this.loadNotes();
    } else {
      this.loadNotes();
    }
  }

  loadNotes = () => {
    keepService.query(this.state.filterBy).then((notes) => {
      this.setState({ notes });
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadNotes);
  };

  onDeleteNote = (note) => {
    keepService
      .deleteNote(note.id)
      .then(() => this.props.history.push(`/keep`));
  };
  onTogglePin = (note) => {
    keepService.togglePin(note).then((notes) => {
      this.setState({ notes }, this.loadNotes);
    });
  };
  onChangeStyleNote = (note, color) => {
    keepService.changeStyleNote(note, color).then((notes) => {
      this.setState({ notes }, this.loadNotes);
    });
  };

  onDuplicateNote = (note) => {
    keepService.duplicateNote(note).then((notes) => {
      this.setState({ notes }, this.loadNotes);
    });
  };

  onSendNoteToMail = (note) => {
    keepService.sendNoteToMail(note).then((noteForMail) => {
      this.props.history.push(
        `/mail/compose?subject=${noteForMail.subject}&body=${noteForMail.body}`
      );
    });
  };
  onEditNote = (note) => {
    this.props.history.push(`/keep/${note.id}`);
  };

  render() {
    const { notes } = this.state;
    if (!notes) return <div>Loading</div>;
    return (
      <section className='notes-header'>
        <KeepHeader />
        <section>
          <KeepFilter onSetFilter={this.onSetFilter} />
          <section className='notes-app'>
            <KeepList
              onSendNoteToMail={this.onSendNoteToMail}
              onDuplicateNote={this.onDuplicateNote}
              onTogglePin={this.onTogglePin}
              onDeleteNote={this.onDeleteNote}
              onChangeStyleNote={this.onChangeStyleNote}
              onEditNote={this.onEditNote}
              notes={notes}
            />
          </section>
        </section>
      </section>
    );
  }
}

export const KeepApp = withRouter(_KeepApp);
