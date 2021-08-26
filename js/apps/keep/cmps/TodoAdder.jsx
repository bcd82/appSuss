export class TodoAdder extends React.Component {
  state = {
    todos: [],
    todo: '',
  };

  handleChangeTodo = ({ target }) => {
    const field = target.name;
    let value = target.value;

    console.log(`value`, value);
    console.log(`value`, field);
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };

    onAddTodos = (ev) => {
    ev.preventDefault();
    const { todo, todos } = this.state.note;
    const newTodo = {
      txt: todo,
      doneAt: null,
    };
    this.todos.push(newTodo);
    console.log(`todos`, todos);
  };

  render() {
      const {todo} = this.state
      
    return (
      <div className='todo'>
        <form className='note-txt-add' onSubmit={this.onAddTodos}>
          <label htmlFor='todo'>My Todo</label>
          <input
            type='text'
            id='todo'
            name='todo'
            value={todo}
            onChange={this.handleChangeTodo}
          />
          <button>√</button>
        </form>
      </div>
    );
  }
}
