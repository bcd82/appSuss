import { mailService } from "../services/mail.service.js";
import { MailMenu } from "../cmps/MailMenu.jsx";
import { MailCompose } from "./MailCompose.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailSearch } from "../cmps/MailSearch.jsx";

const { Link, NavLink, Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
  state = {
    mails: null,
    filterBy: null,
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails() {
    mailService.getMails().then((mails) => this.setState({ mails }));
  }
  getUnreadCount = () => {
    return this.state.mails.filter((mail) => !mail.isRead).length;
  };

  onToggleStar = (ev, mailId) => {
    ev.stopPropagation();
    mailService.toggleStar(mailId).then(this.loadMails());
  };

  onGoToDetails = (mailId) => {
    this.onToggleRead(mailId, true).then(() => {
      this.props.history.push(`/mail/${mailId}`);
    });
  };

  onToggleRead = (mailId, isOnOpen) => {
    mailService.toggleRead(mailId, isOnOpen).then(() => {
      this.loadMails();
    });
    return Promise.resolve();
  };

  onDeleteMail = (mailId) => {
    mailService.deleteMail(mailId).then(() => this.loadMails());
  };

  render() {
    const { mails, filterBy } = this.state;
    if (!mails) return <p>Loading...</p>;
    return (
      <section className="mail-app main-layout">
        <div className="search-box">
          <p>unread emails : {this.getUnreadCount()}</p>
          <MailSearch />
        </div>
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
            <Route path="/mail/add" component={MailCompose} />
            <Route path="/mail/:mailId">
              <MailDetails
                onToggleStar={this.onToggleStar}
                onToggleRead={this.onToggleRead}
                onDeleteMail={this.onDeleteMail}
              />
            </Route>
            <Route path="/mail/">
              <MailList
                mails={mails}
                onToggleStar={this.onToggleStar}
                onClickMail={this.onGoToDetails}
                onDeleteMail={this.onDeleteMail}
              />
            </Route>
          </Switch>
        </section>
      </section>
    );
  }
}
