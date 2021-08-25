export class AddNoteTxt extends React.Component {
  state = {
    note: {
      type: 'note-txt',
      isPinned: null,
      info: {
        txt: '',
      },
    },
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };

  onAddNote = () => {};

  render() {
    const { note } = this.state;
    return (
      <section>
        <form className='note-txt-add'>
          <label htmlFor='txt'>Text:</label>
          <input
            type='text'
            id='txt'
            name='txt'
            value={note.info.txt}
            onChange={this.handleChange}
          />

          <button>Add</button>
        </form>
      </section>
    );
  }
}
