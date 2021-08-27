import { mailService } from "../services/mail.service.js";
const { withRouter } = ReactRouterDOM;

class _MailDetails extends React.Component {
  state = {
    mail: null,
  };

  componentDidMount() {
    const urlSrcPrm = new URLSearchParams(this.props.location.search);
    this.loadMail();
  }

  loadMail = () => {
    const id = this.props.match.params.mailId;
    mailService.getMailById(id).then((mail) => {
      if (!mail) {
        // this.props.history.push("/mail");
        return;
      }
      this.setState({ mail });
    });
  };

  render() {
    const {
      onToggleStar,
      onToggleRead,
      onDeleteMail,
      onAddToInbox,
      onEditDraft,
      onReplyMail
    } = this.props;
    const { mail } = this.state;
    if (!mail) return <p>Loading..</p>;
    return (
      <section className="mail-details">
        <h1>
          {mail.subject} {mail.status === "draft" && <span> ( draft )</span>}{" "}
          {mail.status !== "draft" && (
            <span>{mail.isRead ? "(read)" : "(unread)"}</span>
          )}
        </h1>
        <div className="top-row">
          <h2>
            From: {mail.from}{" "}
            <span>{new Date(mail.sentAt).toLocaleString()}</span>
          </h2>
          {mail.status !== "draft" && (
            <button onClick={()=> onReplyMail(mail)}>
              <img
                src="./assets/imgs/mail/reply.png"
                alt="reply"
                title="reply"
              />
            </button>
          )}
          {mail.status === "draft" && (
            <button title="edit" onClick={() => onEditDraft(mail)}>
              <img src="./assets/imgs/mail/edit.png" alt="edit" />
            </button>
          )}
          {mail.status !== "inbox" && (
            <button title="add to inbox" onClick={() => onAddToInbox(mail.id)}>
              <img
                src="./assets/imgs/mail/add-to-inbox.png"
                alt="add to inbox"
              />
            </button>
          )}
          <button title="delete" onClick={() => onDeleteMail(mail.id)}>
            <img src="./assets/imgs/mail/delete.png" alt="trash" />
          </button>
          <button onClick={() => onToggleRead(mail.id)} title="mark as unread">
            <img
              src="./assets/imgs/mail/unread.png"
              className={mail.isRead ? "unread" : "read"}
            />
          </button>
          <img
            src="./assets/imgs/mail/star.png"
            className={mail.isStarred ? "starred" : "not-starred"}
            onClick={(ev) => onToggleStar(ev, mail.id)}
          />
        </div>
        <h3>To: {mail.to}</h3>
        <p className="mail-body">{mail.body}</p>
      </section>
    );
  }
}

export const MailDetails = withRouter(_MailDetails);
