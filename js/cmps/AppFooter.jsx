const { NavLink } = ReactRouterDOM;

export function AppFooter() {
  return (
    <div className="footer">
      <nav>
        <NavLink
          to="/mail"
          className="app-link"
          >
          <img src="./assets/imgs/cmps/mail-app.png" />
        </NavLink>
        <NavLink
          to="/keep"
          className="app-link"
          >
          <img src="./assets/imgs/cmps/keep-app.png" />
        </NavLink>
        <NavLink
          to="/book/home"
          className="app-link"
          >
          <img src="./assets/imgs/cmps/book-app.png" />
        </NavLink>
      </nav>
      <p>Barak Sidi & Ron Buchris 2021 ©</p>
    </div>
  );
}
