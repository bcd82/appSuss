const { withRouter } = ReactRouterDOM;

import { KeepList } from '../cmps/KeepList.jsx';
import { keepService } from '../services/keep.service.js';
// import { KeepAdd } from '../cmps/KeepAdd.jsx';
import { KeepFilter } from '../cmps/KeepFilter.jsx';
import { KeepHeader } from '../cmps/KeepHeader.jsx';
class _KeepApp extends React.Component {
  state = {
    notes: [],
    filterBy: null,
  };

  componentDidMount() {
    this.loadNotes();
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
              onDuplicateNote={this.onDuplicateNote}
              onTogglePin={this.onTogglePin}
              onDeleteNote={this.onDeleteNote}
              onChangeStyleNote={this.onChangeStyleNote}
              notes={notes}
            />
          </section>
        </section>
      </section>
    );
  }
}

export const KeepApp = withRouter(_KeepApp);
