import { mailService } from "../services/mail.service.js";
const { withRouter } = ReactRouterDOM;

class _MailCompose extends React.Component {
  state = {
    subject: "",
    to: "",
    body: "",
    from: "",
  };

  id = "";

  componentDidMount = () => {
    mailService.getUser().then((user) => this.setState({ from: user.email }));
    const urlSrcPrm = new URLSearchParams(this.props.location.search);
    if (urlSrcPrm.has("subject"))
      this.setState({ subject: urlSrcPrm.get("subject") });
    if (urlSrcPrm.has("body")) this.setState({ body: urlSrcPrm.get("body") });
    if (urlSrcPrm.has("to")) this.setState({ to: urlSrcPrm.get("to") });
    if (urlSrcPrm.has("id")) this.id = urlSrcPrm.get("id");
  };

  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState({ [field]: value });
  };


  render() {
    const { onSendNewMail, onSaveDraft } = this.props;
    const { subject, to, body, from } = this.state;
    return (
      <section className="mail-compose">
        <form className="compose-form">
          <input disabled placeholder={`From: ${from}`}></input>
          <input
            name="subject"
            type="text"
            value={subject}
            onChange={this.handleChange}
            placeholder="Subject"
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}
            required
            
            autoFocus
          />
          <input
            name="to"
            type="email"
            value={to}
            onChange={this.handleChange}
            placeholder="email@email.com"
            required
            onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault()}}

          />
          <textarea
            name="body"
            type="text"
            value={body}
            placeholder="Your message..."
            onChange={this.handleChange}
            required
          />
          <div className="bottom-btns">
            <button onClick={(ev) => onSendNewMail(ev, this.state, this.id)}>
              Send
            </button>
            <button onClick={(ev) => onSaveDraft(ev, this.state, this.id)}>
              Save Draft
            </button>
          </div>
        </form>
      </section>
    );
  }
}

export const MailCompose = withRouter(_MailCompose);
