import { LongTxt } from "../../../cmps/LongTxt.jsx";
import { utilService } from "../../../services/util.service.js";

export function MailPreview(props) {
  const {
    mail,
    onToggleStar,
    onClickMail,
    onDeleteMail,
    onToggleRead,
    onEditDraft,
    onReplyMail
  } = props;

  return (
    <article
      className={`mail-preview ${mail.isRead ? "read" :""}`}
      onClick={() => onClickMail(mail.id)}
    >
      <div className="hover-actions">
        {mail.status === "draft" && (
          <button onClick={(ev) => onEditDraft(mail, ev)}>
            <img src="./assets/imgs/mail/edit.png" />
          </button>
        )}
        {mail.status !== "draft" && (
          <button onClick={(ev) => onReplyMail(mail, ev)}>
            <img src="./assets/imgs/mail/reply.png" />
          </button>
        )}
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
      <p className="body-snippet">{<LongTxt text ={mail.body}/>}</p>
      <p className="sent-time">{utilService.getTimeToDisplay(mail.sentAt)}</p>
    </article>
  );
}
