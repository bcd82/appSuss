const { NavLink } = ReactRouterDOM;

export function MailMenu(props) {
  return (
    <nav className="mail-menu">
      <NavLink to="/mail/compose" exact>
        <button className="compose-btn">Compose</button>
      </NavLink>
      <ul>
        <li
          onClick={() => props.setFilterBy(null)}
          className={props.filter === null ? "active " : ""}
        >
          <img src="./assets/imgs/mail/inbox.png" className={"menu-img"} />
          <p>Inbox</p>
        </li>
        <li
          onClick={() => props.setFilterBy("sent")}
          className={props.filter === "sent" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/sent.png" className="menu-img" />
          <p>Sent</p>
        </li>
        <li
          onClick={() => props.setFilterBy("unread")}
          className={props.filter === "unread" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/unread.png" className="menu-img" />
          <p>Unread</p>
        </li>
        <li
          onClick={() => props.setFilterBy("starred")}
          className={props.filter === "starred" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/star.png" className="menu-img" />
          <p>Starred</p>
        </li>
        <li
          onClick={() => props.setFilterBy("draft")}
          className={props.filter === "draft" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/draft.png" className="menu-img" />
          <p>Drafts</p>
        </li>
        <li
          onClick={() => props.setFilterBy("trash")}
          className={props.filter === "trash" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/delete.png" className="menu-img" />
          <p>Trash</p>
        </li>
      </ul>
    </nav>
  );
}
