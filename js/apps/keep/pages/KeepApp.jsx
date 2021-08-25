import { KeepList } from '../cmps/KeepList.jsx';
import { keepService } from '../services/keep.service.js';
import { KeepHeader } from '../cmps/KeepHeader.jsx';
export class KeepApp extends React.Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    this.loadNotes();
  }

  loadNotes = () => {
    keepService.query().then((notes) => {
      this.setState({ notes });
    });
  };

  render() {
    const { notes } = this.state;
    if (!notes) return <div>Loading</div>;
    return (
      <section className='notes-header'>
        <KeepHeader />
        <section className='notes-app'>
          <KeepList notes={notes} />
        </section>
      </section>
    );
  }
}
