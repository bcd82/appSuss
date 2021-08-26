export function TodoAdder({ onAddTodos,todo,handleChangeTodo }) {
  return (
    <div className='todo'>
      <form className='note-txt-add' onSubmit={() => onAddTodos()}>
        <label htmlFor='todo'>My Todo</label>
        <input
          type='text'
          id='todo'
          name='todo'
          value={todo}
          onChange={handleChangeTodo}
        />
        <button>√</button>
      </form>
    </div>
  );
}
