const { Link, NavLink, Route, Switch } = ReactRouterDOM;

export function MailMenu() {
  return (
    <nav className="mail-menu">
      <NavLink to="/mail/compose" exact>
        <h1 className="compose-btn">Compose</h1>
      </NavLink>
      <ul>
          <li>Inbox</li>
          <li>Sent</li>
          <li>Trash</li>
      </ul>
    </nav>
  );
}
