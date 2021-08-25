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
    const value = target.value;
    console.log(`target`, target);
  };

  render() {
    const { todo, doneAt } = this.state;
    if (!todo) return <div>Loading</div>;
    return (
      <div className={doneAt ? 'done' : 'not-done'}>
        <label htmlFor='myCheck'>{todo.txt}</label>
        <input type='checkbox' id='myCheck' onChange={this.handleChange} />
      </div>
    );
  }
}
