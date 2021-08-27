const { Link } = ReactRouterDOM;

export function MailFilter(props) {
  return (
      <ul>
        <Link to="/mail?filter=inbox">
        <li
          onClick={() => props.setFilterBy(null)}
          className={props.filter === 'inbox' ? "active " : ""}
        >
          <img src="./assets/imgs/mail/inbox.png" className={"menu-img"} />
          <p>Inbox</p>
        </li>
        </Link>
        <Link to="/mail?filter=unread">
        <li
          onClick={() => props.setFilterBy("unread")}
          className={props.filter === "unread" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/unread.png" className="menu-img" />
          <p>Unread</p>
        </li>
        </Link>
        <Link to="/mail?filter=sent">
        <li
          onClick={() => props.setFilterBy("sent")}
          className={props.filter === "sent" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/sent.png" className="menu-img" />
          <p>Sent</p>
        </li>
        </Link>
        <Link to="/mail?filter=starred">

        <li
          onClick={() => props.setFilterBy("starred")}
          className={props.filter === "starred" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/star.png" className="menu-img" />
          <p>Starred</p>
        </li>
        </Link>
        <Link to="/mail?filter=draft">

        <li
          onClick={() => props.setFilterBy("draft")}
          className={props.filter === "draft" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/draft.png" className="menu-img" />
          <p>Drafts</p>
        </li>
        </Link>
        <Link to="/mail?filter=trash">

        <li
          onClick={() => props.setFilterBy("trash")}
          className={props.filter === "trash" ? "active" : ""}
        >
          <img src="./assets/imgs/mail/delete.png" className="menu-img" />
          <p>Trash</p>
        </li>
        </Link>
      </ul>
  );
}


