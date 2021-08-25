import { utilService } from "../../../services/util.service.js";

export function MailPreview(props) {
  const { mail , onToggleStar , onClickMail} = props;
  
  const getTimeToDisplay = ()=> {
      let time = new Date(mail.sentAt);
      return (time.getHours() + ':' +(time.getMinutes() < 10 ? '0'+ time.getMinutes() :time.getMinutes() ) + ' ' + time.getFullYear())
  } 
  
  return (
    <article className={`mail-preview ${ mail.isRead && 'read' }`} onClick={()=>onClickMail(mail.id)}>
      <img
        src="../../../../assets/imgs/mail/star.png"
        className={mail.isStarred ? "starred" : "not-starred"}
        onClick={()=>onToggleStar(mail.id)}
      />
      <p className="from">
        {mail.from}
      </p>
      <p className="subject">{mail.subject}</p>
      <p className="body-snippet">{mail.body.substring(0,40)}</p>
      <p className="sent-time">{getTimeToDisplay()}</p>
    </article>
  );
}
