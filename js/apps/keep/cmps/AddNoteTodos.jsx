const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { TodoAdder } from './TodoAdder.jsx';

class _AddNoteTodos extends React.Component {
  state = {
    note: {
      label: null,
      todo: null,
    },
  };

  todos = [];

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;

    console.log(`value`, value);
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
  };

  //   handleChangeTodo = ({ target }) => {
  //     const field = target.name;
  //     let value = target.value;

  //     console.log(`value`, value);
  //     this.setState((prevState) => ({
  //       note: { ...prevState.note, [field]: value },
  //     }));
  //   };

  //   onChangeStyle = (color) => {
  //     this.setState((prevState) => ({
  //       note: { ...prevState.note, ['backgroundColor']: color },
  //     }));
  //   };

  onAddNoteTodos = (ev) => {
    ev.preventDefault();
    const { label, todos } = this.state.note;
    if (!todos.length) return;
    const newNote = {
      id: utilService.makeId(),
      type: 'note-todos',
      info: {
        label: label,
        todos: todos,
      },
    };
    keepService.createNote(newNote).then(() => {
      this.props.history.push('/keep');
    });
  };

  //   onAddTodos = (ev) => {
  //     ev.preventDefault();
  //     const { todo, todos } = this.state.note;
  //     const newTodo = {
  //       txt: todo,
  //       doneAt: null,
  //     };
  //     this.todos.push(newTodo);
  //     console.log(`todos`, todos);
  //   };

  render() {
    const { label, todo } = this.state;
    return (
      <section>
        <form className='note-txt-add' onSubmit={this.onAddNoteTodos}>
          <label htmlFor='label'>Todos Title</label>
          <input
            type='text'
            id='label'
            name='label'
            value={label}
            onChange={this.handleChange}
          />

          {/* <div className='colors-picker'>
            <ColorInput onChangeStyle={this.onChangeStyle} />
          </div> */}
          <button>Add</button>
        </form>
        <div className='todos-adder'>
          <TodoAdder  />
        </div>
      </section>
    );
  }
}

export const AddNoteTodos = withRouter(_AddNoteTodos);
