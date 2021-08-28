const { NavLink } = ReactRouterDOM;

export class AppMenu extends React.Component {
  state = {
    isMobileMenuOpen: false,
  };

  toggleAppMenu = (isClosing) => {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen });
  };

  render() {
    const { isMobileMenuOpen } = this.state;
    return (
      <div className="app-menu">
        <img
          className="apps-icon"
          src="./assets/imgs/cmps/apps.png"
          onClick={this.toggleAppMenu}
        />
        <nav
          className={`app-links ${isMobileMenuOpen ? "menu-open" : ""}`}
          ref={this.createRef}
        >
          <NavLink to="/mail" className="app-link" onClick={()=>this.toggleAppMenu(true)}>
            <img src="./assets/imgs/cmps/mail-app.png" />
          </NavLink>
          <NavLink to="/keep" className="app-link" onClick={()=>this.toggleAppMenu(true)}>
            <img src="./assets/imgs/cmps/keep-app.png" />
          </NavLink>
          <NavLink to="/book/home" className="app-link" onClick={()=>this.toggleAppMenu(true)}>
            <img src="./assets/imgs/cmps/book-app.png" />
          </NavLink>
        </nav>
      </div>
    );
  }
}
