import { MailPreview } from "../cmps/MailPreview.jsx";

export class MailList extends React.Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.mails !== this.props.mails) {
      window.scrollTo(0, 0);
    }
  }
  render() {
    const {
      mails,
      onToggleStar,
      onClickMail,
      onDeleteMail,
      onToggleRead,
      onEditDraft,
      onReplyMail,
    } = this.props;
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
              onReplyMail={onReplyMail}
            />
          ))}
      </div>
    );
  }
}
