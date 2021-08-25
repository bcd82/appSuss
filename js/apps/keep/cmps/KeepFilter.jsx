export class KeepFilter extends React.Component {
  state = {
    filterBy: {
      category: '',
    },
  };

  handleChange = (ev) => {
    console.log(`ev.target`, ev.target);
    const field = ev.target.name;
    if (!field) return;
    const value = ev.target.value;
    this.setState(
      (prevState) => ({ filterBy: { ...prevState.filterBy, [field]: value } }),
      () => {
        this.props.onSetFilter(this.state.filterBy);
      }
    );
  };

  onFilter = (ev) => {
    ev.preventDefault();
    this.props.onSetFilter(this.state.filterBy);
  };

  render() {
    const { category } = this.state.filterBy;
    return (
      <form className='note-filter' onSubmit={this.onFilter}>
        <label htmlFor='by-category'>By category</label>
        <input
          name='category'
          id='by-category'
          type='text'
          placeholder='Category'
          value={category}
          onChange={this.handleChange}
        />
      </form>
    );
  }
}
