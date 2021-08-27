export function ColorInput({ onChangeStyle, onChangeStyleNote, note }) {
  const colors = ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'];
  return (
    <section className='color-picker-container'>
      {colors.map((color) => (
        <article
          className={`color-picker ${color}`}
          key={color}
          onClick={() => {
            if (!note) onChangeStyle(color);
            else onChangeStyleNote(note, color);
          }}
          style={{ backgroundColor: color }}
        ></article>
      ))}
    </section>
  );
}
