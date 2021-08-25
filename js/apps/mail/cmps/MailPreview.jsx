import { utilService } from "../../../services/util.service.js";

export function MailPreview(props) {
  const { mail } = props;
  let time = utilService.getTime(mail.sentAt);
  
  return (
    <article className="mail-preview">
      <img
        src="../../../../assets/imgs/mail/star.png"
        className={mail.isStarred ? "starred" : "not-starred"}
      />
      <p className="from">
        <strong>{mail.from}</strong>
      </p>
      <p className="subject">{mail.subject}</p>
      {/* <p className="body-snippet">{mail.body}</p> */}
      <p className="sent-time">{time}</p>
    </article>
  );
}
