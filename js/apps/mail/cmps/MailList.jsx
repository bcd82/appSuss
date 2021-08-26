import { MailPreview } from "../cmps/MailPreview.jsx";

export function MailList({
  mails,
  onToggleStar,
  onClickMail,
  onDeleteMail,
  onToggleRead,
  onEditDraft
}) {
  return (
    <div>
      {mails &&
        mails.map((mail, idx) => (
          <MailPreview
            mail={mail}
            key={idx}
            onToggleStar={onToggleStar}
            onClickMail={onClickMail}
            onDeleteMail={onDeleteMail}
            onToggleRead={onToggleRead}
            onEditDraft={onEditDraft}
          />
        ))}
    </div>
  );
}
