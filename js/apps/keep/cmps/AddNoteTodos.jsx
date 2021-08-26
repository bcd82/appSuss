const { withRouter } = ReactRouterDOM;

import { keepService } from '../services/keep.service.js';
import { utilService } from '../../../services/util.service.js';
import { ColorInput } from './ColorInput.jsx';
class _AddNoteTodos extends React.Component {
  state = {
    note: {
      label: '',
      txt: '',
      backgroundColor: '',
    },
    todos: [],
  };

  handleChange = ({ target }) => {
    const field = target.name;
    let value = target.value;
    this.setState((prevState) => ({
      note: { ...prevState.note, [field]: value },
    }));
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
    const newNote = {
      id: utilService.makeId(),
      type: 'note-todos',
      backgroundColor: backgroundColor,
      info: {
        label: label,
        todos: todos,
      },
    };
    keepService.createNote(newNote).then(() => {
      this.props.history.push('/keep');
    });
    this.setState({ note: { label: '', txt: '' }, todos: [] });
  };

  onAddTodos = (ev) => {
    ev.preventDefault();
    const { txt } = this.state.note;
    const todo = {
      txt: txt,
      doneAt: null,
    };
    this.setState((prevState) => ({
      todos: [...prevState.todos, todo],
    }));
    this.setState((prevState) => ({
      note: { ...prevState.note, ['txt']: '' },
    }));
  };

  render() {
    const { label, txt } = this.state.note;
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
          <button>Add</button>
        </form>
        <div className='newTodo'>
          <form className='note-txt-add' onSubmit={this.onAddTodos}>
            <label htmlFor='txt'>My Todo</label>
            <input
              type='text'
              id='txt'
              name='txt'
              value={txt}
              onChange={this.handleChange}
            />
            <button>√</button>
          </form>
        </div>
        <div className='colors-picker'>
          <ColorInput onChangeStyle={this.colorPicker} />
        </div>
      </section>
    );
  }
}

export const AddNoteTodos = withRouter(_AddNoteTodos);
