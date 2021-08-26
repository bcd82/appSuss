import { utilService } from "../../../services/util.service.js";

export function MailPreview(props) {
  const { mail, onToggleStar, onClickMail, onDeleteMail, onToggleRead } = props;

  return (
    <article
      className={`mail-preview ${mail.isRead && "read"}`}
      onClick={() => onClickMail(mail.id)}
    >
      <div className="hover-actions">
        <button onClick={(ev) => onDeleteMail(mail.id, ev)}>
          <img src="./assets/imgs/mail/delete.png" />
        </button>
        <button onClick={(ev) => onToggleRead(mail.id, false, ev)}>
          <img src="./assets/imgs/mail/unread.png" />
        </button>
      </div>
      <img
        src="./assets/imgs/mail/star.png"
        className={mail.isStarred ? "starred" : "not-starred"}
        onClick={(ev) => onToggleStar(ev, mail.id)}
      />
      <p className="from">{mail.from}</p>
      <p className="subject">{mail.subject}</p>
      <p className="body-snippet">{mail.body.substring(0, 40)}...</p>
      <p className="sent-time">{utilService.getTimeToDisplay(mail.sentAt)}</p>
    </article>
  );
}
