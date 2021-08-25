import { TodoList } from './TodoList.jsx';

export class NoteTodos extends React.Component {
  state = {
    note: null,
  };

  componentDidMount() {
    const { note } = this.props;
    this.setState({ note });
  }

  render() {
    const { note } = this.state;
    if (!note) return <div>Loading</div>;
    return (
      <article className={note.type}>
        <h3>{note.info.label}</h3>
        <div className='todos-list'>
          {note.info.todos.map((todo) => (
            <TodoList todo={todo} />
          ))}
        </div>
      </article>
    );
  }
}
