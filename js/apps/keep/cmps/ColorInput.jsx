export class ColorInput extends React.Component {
  state = {
    colors: ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'],
    color: '',
  };

  onToggleActive = (color) => {
    this.setState({ color });
  };

  render() {
    const { onChangeStyle, onChangeStyleNote, note } = this.props;
    const { colors } = this.state;
    return (
      <section className='color-picker-container'>
        {colors.map((color) => (
          <article
            className={
              color === this.state.color
                ? `color-picker ${color} active`
                : `color-picker ${color}`
            }
            key={color}
            onClick={() => {
              this.onToggleActive(color);
              if (!note) onChangeStyle(color);
              else onChangeStyleNote(note, color);
            }}
            style={{ backgroundColor: color }}
          ></article>
        ))}
      </section>
    );
  }
}
