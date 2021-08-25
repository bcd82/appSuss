export class NoteImg extends React.Component {
  state = {
    note: null,
    color: null,
  };

  componentDidMount() {
    const { note } = this.props;
    const color = note.style.backgroundColor;
    this.setState({ note });
    this.setState({ color });
  }

  render() {
    const { note, color } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className={`note ${note.type}`} style={{ backgroundColor: color }}>
        <h3>{note.info.title}</h3>
        <img src={note.info.url} />
      </article>
    );
  }
}
