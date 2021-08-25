import { mailService } from "../services/mail.service.js";
import { MailMenu } from "../cmps/MailMenu.jsx";
import { MailCompose } from "./MailCompose.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { MailList } from "../cmps/MailList.jsx";
import { MailSearch } from "../cmps/MailSearch.jsx";

const { Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
  state = {
    mails: null,
    filterBy: null,
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails() {
    mailService
      .getMails()
      .then((mails) => {
        let filteredMails = this.getFilteredMails(mails);
        return filteredMails;
      })
      .then((mails) => this.setState({ mails }));
  }

  getFilteredMails = (mails) => {
    if (this.state.filterBy && this.state.filterBy !== "starred") {
      return mails.filter((mail) => mail.status === this.state.filterBy);
    } else if (this.state.filterBy === "starred") {
      return mails.filter((mail) => mail.isStarred === true);
    } else {
      return mails.filter(
        (mail) => mail.status === 'inbox'
      );
    }
  };

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
    mailService.deleteMail(mailId).then(() => {
      this.loadMails();
      this.props.history.push("/mail/");
    });
  };

  onSetFilter = (filterBy) => {
    this.setState({ filterBy }, this.loadMails());
    this.props.history.push("/mail/");
  };

  onAddToInbox = (mailId) => {
    mailService.addToInbox(mailId).then(() => {
      this.loadMails();
    });
  };

  onSendNewMail = (ev, newMail) => {
    ev.preventDefault();
    mailService.createMail(newMail).then(() => {
      this.loadMails();
      this.props.history.push("/mail/");
    });
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
          <MailMenu filter={filterBy} setFilterBy={this.onSetFilter} />
        </section>
        <section className="mail-main">
          <Switch>
            <Route path="/mail/compose">
              <MailCompose onSendNewMail={this.onSendNewMail} />
            </Route>
            <Route path="/mail/:mailId">
              <MailDetails
                onToggleStar={this.onToggleStar}
                onToggleRead={this.onToggleRead}
                onDeleteMail={this.onDeleteMail}
                onAddToInbox={this.onAddToInbox}
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
