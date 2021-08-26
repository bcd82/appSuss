import { MailFilter } from "./MailFilter.jsx";
const { NavLink } = ReactRouterDOM;

export function MailMenu(props) {
  return (
    <nav className="mail-menu">
      <NavLink to="/mail/compose" exact>
        <button className="compose-btn">Compose</button>
      </NavLink>
      <MailFilter setFilterBy={props.setFilterBy} filter={props.filter} />
    </nav>
  );
}
