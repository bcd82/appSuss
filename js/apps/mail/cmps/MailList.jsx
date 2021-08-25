import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({ mails }) {
  return (
    <div>
      <h1>Hi from Mail List</h1>
      {console.log(mails)}

      {mails && mails.map((mail, idx) => 
      <MailPreview mail={mail} key={idx}/>
      )}
    </div>
  );
}
