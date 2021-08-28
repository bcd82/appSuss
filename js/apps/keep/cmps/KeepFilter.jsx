export class KeepFilter extends React.Component {
  state = {
    filterBy: {
      category: '',
    },
    isActivate: false,
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
    const { isActivate } = this.state;
    const { category } = this.state.filterBy;
    console.log(`isActive`, isActivate);
    console.log(`category`, category);
    return (
      <form
        className={isActivate ? 'note-filter activate' : 'note-filter'}
        onSubmit={this.onFilter}
      >
        <div
          className='icon-filter'
          onClick={() => {
            this.setState({ isActivate: !isActivate });
          }}
        ></div>
        <div className='input-filter'>
          <input
            name='category'
            id='by-category'
            type='text'
            placeholder='Search your notes...'
            value={category}
            onChange={this.handleChange}
          />
        </div>
      </form>
    );
  }
}
