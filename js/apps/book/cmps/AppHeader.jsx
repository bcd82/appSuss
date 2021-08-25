const { NavLink, withRouter } = ReactRouterDOM;

 class _AppHeader  extends React.Component {

  state = {
    isMobileMenuOpen : false
  }
  
  toggleMenu = (ev) =>{
    this.setState({isMobileMenuOpen:!this.state.isMobileMenuOpen})
  }
  render() {
    const {isMobileMenuOpen} = this.state
    return (
      <header className="header">
        <div className="main-header main-layout">
        <h1 className="logo" onClick={()=>{
          props.history.push('/')
        }}>Miss Book</h1>
        <nav className={isMobileMenuOpen ? 'mobile': ''}>
          <NavLink to='/' exact onClick={isMobileMenuOpen && this.toggleMenu}>Home</NavLink>
          <NavLink to="/about" onClick={isMobileMenuOpen && this.toggleMenu}>About</NavLink>
          <NavLink to="/book" exact onClick={isMobileMenuOpen && this.toggleMenu}>Books</NavLink>
          <NavLink to="/book/add" exact onClick={isMobileMenuOpen && this.toggleMenu}>Add Book</NavLink>
         </nav>
          <button className="menu-btn-mobile" onClick={this.toggleMenu}>☰</button>
        </div>
      </header>
    );
  };
  }

export const AppHeader = withRouter(_AppHeader);
