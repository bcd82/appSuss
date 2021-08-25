export class NoteTxt extends React.Component {
  state = {
    note: null,
    pin: null,
  };

  componentDidMount() {
    const { note } = this.props;
    const pin = note.isPinned;
    this.setState({ note });
    this.setState({ pin: pin });
  }

  togglePin = (pin) => {
    this.setState({ pin: !pin });
  };

  render() {
    const { note, pin } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className={`note ${note.type}`}>
        <h3>{note.info.txt}</h3>
        <img
          className={pin ? 'pin-pushed' : 'pin'}
          src='../../../../assets/icons/push-pin.png'
          onClick={() => {
            this.togglePin(pin);
          }}
        />
      </article>
    );
  }
}
