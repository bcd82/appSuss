import { mailService } from "../services/mail.service.js";
import { MailMenu } from "../cmps/MailMenu.jsx";
import { MailAdd } from "./MailAdd.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { MailList } from "../cmps/MailList.jsx";

const { Link, NavLink, Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
  state = {
    mails: null,
    filterBy: null,
  };

  componentDidMount() {
    mailService.getMail().then((mails) => this.setState({ mails }));
  }

  render() {
    const { mails, filterBy } = this.state;
    return (
      <section className="mail-app main-layout">
        <h1>Hey there from Mail</h1>
        <div>Search box</div>
        <section className="side-menu">
          <MailMenu />
          <NavLink to="/mail/add" exact>
            add{" "}
          </NavLink>
          <NavLink to="/mail/" exact>
            List{" "}
          </NavLink>
          <NavLink to="/mail/234234" exact>
            Details{" "}
          </NavLink>
        </section>
        <section className="mail-main">
          <Switch>
            <Route path="/mail/add" component={MailAdd} />
            <Route path="/mail/:mailId" component={MailDetails} />
            <Route path="/mail/">
                <MailList mails={mails}/>
            </Route>
          </Switch>
        </section>
      </section>
    );
  }
}
