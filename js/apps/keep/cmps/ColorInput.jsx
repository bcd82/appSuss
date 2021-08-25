export function ColorInput({onChangeStyle}) {
  const colors = ['#FFAEBC', '#A0E7E5', '#B4F8C8', '#FBE7C6'];
  return (
    <section className='color-picker-container'>
        <h3>color</h3>
      {colors.map((color) => (
          <article
          className='color-picker'
          key={color}
          onClick={() => onChangeStyle(color)}
          style={{ backgroundColor: color }}
        ></article>
      ))}
    </section>
  );
}
