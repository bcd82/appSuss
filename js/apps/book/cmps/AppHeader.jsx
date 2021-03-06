const { NavLink, withRouter } = ReactRouterDOM;

class _AppHeader extends React.Component {
  state = {
    isMobileMenuOpen: false,
  };
  
  componentWillUnmount() {
    document.body.style.overflow = "unset";
  }

  toggleMenu = (ev) => {
    if (!this.state.isMobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  };
  render() {
    const { isMobileMenuOpen } = this.state;
    return (
      <div>
        <header className="book-header">
          <div className="main-header main-layout">
            <h1
              className="logo"
              onClick={() => {
                this.props.history.push("/book/home/");
              }}
            >
              BookSus
            </h1>
            <nav className={isMobileMenuOpen ? "mobile" : ""}>
              <NavLink
                to="/book/home"
                exact
                onClick={isMobileMenuOpen && this.toggleMenu}
              >
                Home
              </NavLink>
              <NavLink
                to="/book/about"
                onClick={isMobileMenuOpen && this.toggleMenu}
              >
                About
              </NavLink>
              <NavLink
                to="/book"
                exact
                onClick={isMobileMenuOpen && this.toggleMenu}
              >
                Books
              </NavLink>
              <NavLink
                to="/book/add"
                exact
                onClick={isMobileMenuOpen && this.toggleMenu}
              >
                Add Book
              </NavLink>
            </nav>
            <button className="menu-btn-mobile" onClick={this.toggleMenu}>
              <img src="./assets/imgs/cmps/hamburger.png" />
            </button>
          </div>
        </header>
      </div>
    );
  }
}

export const AppHeader = withRouter(_AppHeader);
