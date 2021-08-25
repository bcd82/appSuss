export class TodoList extends React.Component {
  state = {
    todo: null,
    doneAt: null,
  };

  componentDidMount() {
    const { todo } = this.props;
    const doneAt = todo.doneAt;
    this.setState({ todo });
    this.setState({ doneAt });
  }

  handleChange = ({ target }) => {
    const checked = target.checked;
    if (checked) this.setState({ doneAt: checked });
    else this.setState({ doneAt: checked });
  };

  render() {
    const { todo, doneAt } = this.state;
    if (!todo) return <div>Loading</div>;
    return (
      <div className={doneAt ? 'done' : ''}>
        <label htmlFor='myCheck'>{todo.txt}</label>
        <input
          checked={doneAt ? true : false}
          type='checkbox'
          id='myCheck'
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
