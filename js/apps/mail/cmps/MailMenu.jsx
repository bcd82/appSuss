const { Link, NavLink, Route, Switch } = ReactRouterDOM;

export function MailMenu() {
  return (
    <div>
      <NavLink to="/mail/compose" exact>
        <h1>Compose</h1>
      </NavLink>
      <NavLink to="/mail/" exact>
        List{" "}
      </NavLink>
      <NavLink to="/mail/234234" exact>
        Details{" "}
      </NavLink>{" "}
    </div>
  );
}
