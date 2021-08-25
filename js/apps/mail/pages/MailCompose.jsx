import { mailService } from "../services/mail.service.js";
const { withRouter } = ReactRouterDOM;

class _MailCompose extends React.Component {
  state = {
    subject: "",
    to: "",
    body: "",
    from: ''
 
  };

  componentDidMount = ()=>{
    mailService.getUser()
    .then(user => this.setState({from:user.email}))
  }

  handleChange = (ev) => {
    const field = ev.target.name;
    const value =
      ev.target.type === "number" ? +ev.target.value : ev.target.value;
    this.setState({[field]: value })
    console.log(this.state.from)
  };

  render() {
    const { onSendNewMail } = this.props;
    const { subject,to,body,from } = this.state;
    return (
      <section className="mail-compose">
        <h1>Hi from Add Mail Page</h1>
        <form className="compose-form" onSubmit={(ev) => onSendNewMail(ev,this.state)}>
            <input disabled placeholder={`from: ${from}`}></input>
          <input
            name="subject"
            type="text"
            value={subject}
            onChange={this.handleChange}
            required
          />
          <input
            name="to"
            type="email"
            value={to}
            onChange={this.handleChange}
            required
          />
          <textarea
            name="body"
            type="text"
            value={body}
            onChange={this.handleChange}
            required
          />
          <button >Send</button>
        </form>
      </section>
    );
  }
}

export const MailCompose = withRouter(_MailCompose);
