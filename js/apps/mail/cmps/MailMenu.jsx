const { NavLink } = ReactRouterDOM;

export function MailMenu(props) {
  return (
    <nav className="mail-menu">
      <NavLink to="/mail/compose" exact>
        <h1 className="compose-btn">Compose</h1>
      </NavLink>
      <ul>
        <li
          onClick={() => props.setFilterBy(null)}
          className={props.filter === null ? "active " : ""}
        >
          <img src="./assets/imgs/mail/inbox.png" className={"menu-img"} />{" "}
          <p>Inbox</p>
        </li>
        <li
          onClick={() => props.setFilterBy("sent")}
          className={props.filter === "sent" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/sent.png" className="menu-img" />{" "}
          <p>Sent</p>
        </li>
        <li
          onClick={() => props.setFilterBy("starred")}
          className={props.filter === "starred" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/star.png" className="menu-img" />{" "}
          <p>Starred</p>
        </li>
        <li
          onClick={() => props.setFilterBy("draft")}
          className={props.filter === "drafts" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/draft.png" className="menu-img" />{" "}
          <p>Drafts</p>
        </li>
        <li
          onClick={() => props.setFilterBy("trash")}
          className={props.filter === "trash" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/delete.png" className="menu-img" />{" "}
          <p>Trash</p>
        </li>
      </ul>
    </nav>
  );
}
