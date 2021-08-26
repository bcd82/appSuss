const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
   
    state = { 
        isMobileMenuOpen : false
    }
    
    render() {
        return (
      <section className='main-layout app-header'>
        <img src="./assets/imgs/cmps/horse.png"></img>
        <h1 onClick={() => this.props.history.push('/')} className='logo'>
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
