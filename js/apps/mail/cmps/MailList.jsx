import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({ mails,onToggleStar }) {
  return (
    <div>
      {console.log(mails)}

      {mails && mails.map((mail, idx) => 
      <MailPreview mail={mail} key={idx} onToggleStar={onToggleStar}/>
      )}
    </div>
  );
}
