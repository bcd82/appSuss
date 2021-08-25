const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  render() {
    return (
      <section className='app-header main-layout'>
        <h1 onClick={() => this.props.history.goBack()} className='logo'>
          <span>A</span>ppsus
        </h1>
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/about'>About</NavLink>
          <NavLink to='/mail'>Mail</NavLink>
          <NavLink to='/keep'>Keep</NavLink>
          <NavLink to='/book'>Book</NavLink>
        </nav>
      </section>
    );
  }
}
export const AppHeader = withRouter(_AppHeader);
