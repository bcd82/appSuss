import { utilService } from "../../../services/util.service.js";
import { mailService } from "../services/mail.service.js";
const { withRouter } = ReactRouterDOM;

class _MailDetails extends React.Component {
  state = {
    car: null,
  };

  componentDidMount() {
    this.loadMail();
  }

  loadMail = () => {
    const id = this.props.match.params.mailId;
    mailService.getMailById(id).then((mail) => {
      if (!mail) {
        this.props.history.push("/mail");
        return;
      }
      this.setState({ mail });
    });
  };

  render() {
    const { onToggleStar, onToggleRead, onDeleteMail, onAddToInbox } = this.props;
    const { mail } = this.state;
    if (!mail) return <p>Loading..</p>;
    return (
      <section className="mail-details">
        <h1>{mail.subject}</h1>
        <div className="top-row">
          <h2>
            {mail.from} <span>{utilService.getTimeToDisplay(mail.sentAt)}</span>
          </h2>
          {mail.status !== "inbox" && (
            <button title="add to inbox">
              <img
                src="./assets/imgs/mail/add-to-inbox.png"
                alt="trash"
                onClick={() => onAddToInbox(mail.id)}
              />
            </button>
          )}
          <button title="delete">
            <img
              src="./assets/imgs/mail/delete.png"
              alt="trash"
              onClick={() => onDeleteMail(mail.id)}
            />
          </button>
          <button onClick={() => onToggleRead(mail.id)} title="mark as unread">
            mark as {mail.isRead ? "unread" : "read"}
          </button>
          <button> Reply</button>
          <img
            src="./assets/imgs/mail/star.png"
            className={mail.isStarred ? "starred" : "not-starred"}
            onClick={(ev) => onToggleStar(ev, mail.id)}
          />
        </div>
        <p>{mail.body}</p>
      </section>
    );
  }
}

export const MailDetails = withRouter(_MailDetails);
