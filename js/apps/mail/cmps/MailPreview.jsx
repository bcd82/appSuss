import { utilService } from "../../../services/util.service.js";

export function MailPreview(props) {
  const { mail , onToggleStar } = props;
  
  const getTimeToDisplay = ()=> {
      let time = new Date(mail.sentAt);
      return (time.getHours() + ':' +(time.getMinutes() < 10 ? '0'+ time.getMinutes() :time.getMinutes() ) + ' ' + time.getFullYear())
  } 
  
  return (
    <article className="mail-preview">
      <img
        src="../../../../assets/imgs/mail/star.png"
        className={mail.isStarred ? "starred" : "not-starred"}
        onClick={()=>onToggleStar(mail.id)}
      />
      <p className="from">
        <strong>{mail.from}</strong>
      </p>
      <p className="subject">{mail.subject}</p>
      <p className="body-snippet">{mail.body.substring(0,40)}</p>
      <p className="sent-time">{getTimeToDisplay()}</p>
    </article>
  );
}
