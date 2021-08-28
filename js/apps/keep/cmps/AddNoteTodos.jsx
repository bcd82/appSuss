const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { ColorInput } from './ColorInput.jsx';
class _AddNoteTodos extends React.Component {
  state = {
    note: {
      label: '',
      backgroundColor: '',
    },
    todos: [''],
    extraTodoAddCount: 1,
  };

  handleChange = ({ target }) => {
    const field = target.name;
    console.log(`field`, field);
    let value = target.value;
    if (field !== 'label') {
      const newTodos = [...this.state.todos];
      newTodos[field] = value;
      this.setState({ todos: newTodos });
    } else {
      this.setState((prevState) => ({
        note: { ...prevState.note, [field]: value },
      }));
    }
  };

  colorPicker = (color) => {
    this.setState((prevState) => ({
      note: { ...prevState.note, ['backgroundColor']: color },
    }));
  };

  onAddNoteTodos = (ev) => {
    ev.preventDefault();
    const { todos } = this.state;
    const { label, backgroundColor } = this.state.note;
    if (!todos.length) return;
    const todosForInfo = [];
    todos.map((todo) => {
      todosForInfo.push({
        txt: todo,
        doneAt: null,
      });
    });
    const newNote = {
      id: utilService.makeId(),
      type: 'note-todos',
      backgroundColor: backgroundColor,
      info: {
        label: label,
        todos: todosForInfo,
      },
      style: {
        backgroundColor: backgroundColor,
      },
    };
    keepService.createNote(newNote).then(() => {
      this.props.history.push('/keep');
    });
    this.setState({
      note: {
        label: '',
        backgroundColor: '',
      },
      todos: [''],
      extraTodoAddCount: 1,
    });
  };

  onAddTodo = () => {
    this.setState((prevState) => ({
      extraTodoAddCount: prevState.extraTodoAddCount + 1,
    }));
    this.setState((prevState) => ({
      todos: [...prevState.todos, ''],
    }));
  };
  onDeleteTodo = (ev, idx) => {
    ev.preventDefault();
    const { extraTodoAddCount } = this.state;
    if (extraTodoAddCount === 1) return;
    this.setState((prevState) => ({
      extraTodoAddCount: prevState.extraTodoAddCount - 1,
    }));
    const newTodos = [...this.state.todos];
    newTodos.splice(idx, 1);
    this.setState({ todos: newTodos });
  };

  render() {
    const { extraTodoAddCount, todos } = this.state;
    const { label } = this.state.note;
    console.log(`todos`, todos);
    return (
      <section className='note-txt-add'>
        <form onSubmit={this.onAddNoteTodos}>
          <label htmlFor='label'></label>
          <input
            type='text'
            id='label'
            name='label'
            value={label}
            placeholder='Title'
            onChange={this.handleChange}
          />
          <button>Add</button>
        </form>
        {new Array(extraTodoAddCount).fill(0).map((value, idx) => (
          <div key={idx} className={`newTodo newTodo-${idx}`}>
            <form className='note-txt-add' onSubmit={this.onAddTodos}>
              <label htmlFor='txt'></label>
              <input
                type='text'
                id='txt'
                name={idx}
                value={todos[idx]}
                placeholder='Add todo...'
                onChange={this.handleChange}
              />
              <button
                onClick={() => {
                  this.onDeleteTodo(event, idx);
                }}
              >
                X
              </button>
            </form>
          </div>
        ))}

        <button onClick={this.onAddTodo}>more</button>
        <div className='colors-picker'>
          <ColorInput onChangeStyle={this.colorPicker} />
        </div>
      </section>
    );
  }
}

export const AddNoteTodos = withRouter(_AddNoteTodos);
