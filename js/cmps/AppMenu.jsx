const { NavLink } = ReactRouterDOM;

export class AppMenu extends React.Component {
    state = { 
        isMobileMenuOpen : false
    }
  render() {
    return (
      <div>
        <img src="/assets/imgs/cmps/apps.png"></img>
        <nav className="app-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/mail?filter=inbox">Mail</NavLink>
          <NavLink to="/keep">Keep</NavLink>
          <NavLink to="/book">Book</NavLink>
        </nav>
      </div>
    );
  }
}
