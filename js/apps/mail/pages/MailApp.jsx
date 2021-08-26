import { mailService } from "../services/mail.service.js";
import { eventBusService } from "../../../services/event.bus.service.js";
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
    searchBy: "",
    sortBy: "",
  };

  componentDidMount() {
    this.loadMails();
  }

  loadMails() {
    mailService
      .getMails()
      .then((mails) => {
        return this.getFilteredMails(mails);
      })
      .then((mails) => {
        return this.filterSearch(mails);
      })
      .then((mails) => this.setState({ mails }));
  }

  getFilteredMails = (mails) => {
    if (
      this.state.filterBy &&
      this.state.filterBy !== "starred" &&
      this.state.filterBy !== "unread"
    ) {
      return mails.filter((mail) => mail.status === this.state.filterBy);
    } else if (this.state.filterBy === "starred") {
      return mails.filter(
        (mail) => mail.isStarred === true && mail.status !== "trash"
      );
    } else if (this.state.filterBy === "unread") {
      return mails.filter(
        (mail) =>
          mail.isRead === false &&
          mail.status !== "trash" &&
          mail.status !== "draft"
      );
    } else {
      return mails.filter((mail) => mail.status === "inbox");
    }
  };

  handleSearch = (searchBy) => {
    this.setState({ searchBy }, this.loadMails());
    console.log(searchBy);
  };

  filterSearch = (mails) => {
    const searchBy = this.state.searchBy;
    if (searchBy) {
      return mails.filter(
        (mail) =>
          mail.subject.toLowerCase().includes(searchBy.toLowerCase()) ||
          mail.body.toLowerCase().includes(searchBy.toLowerCase()) ||
          mail.from.toLowerCase().includes(searchBy.toLowerCase())
      );
    } else return mails;
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

  onToggleRead = (mailId, isOnOpen, ev) => {
    if (ev) ev.stopPropagation();
    mailService.toggleRead(mailId, isOnOpen).then(() => {
      this.loadMails();
    });
    return Promise.resolve();
  };

  onDeleteMail = (mailId, ev) => {
    if (ev) ev.stopPropagation();
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
      eventBusService.emit("user-msg", {
        txt: "Message moved to inbox ",
        type: "success",
      });
    });
  };

  onSendNewMail = (ev, newMail, mailId) => {
    ev.preventDefault();
    if (mailId) {
      mailService.moveDraftToSent(mailId).then(this.loadMails);
    } else {
      mailService.createMail(newMail).then(() => {
        this.loadMails();
      });
    }
    eventBusService.emit("user-msg", { txt: "Mail Sent", type: "success" });
    this.props.history.push("/mail/");
  };

  onEditDraft = (mail, ev) => {
    if (ev) ev.stopPropagation();
    this.props.history.push(
      `/mail/compose?subject=${mail.subject}&body=${mail.body}&id=${mail.id}&to=${mail.to}`
    );
  };

  onSortMail = (sortBy) => {};

  render() {
    const { mails, filterBy, sortBy } = this.state;
    if (!mails) return <p>Loading...</p>;
    return (
      <section className="mail-app main-layout">
        <div className="search-box">
          <MailSearch handleSearch={this.handleSearch} />
          <p className="unread-count">
            {this.getUnreadCount()} unread emails in{" "}
            {filterBy ? filterBy : "inbox"}
          </p>
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
                onEditDraft={this.onEditDraft}
                onToggleStar={this.onToggleStar}
                onToggleRead={this.onToggleRead}
                onDeleteMail={this.onDeleteMail}
                onAddToInbox={this.onAddToInbox}
              />
            </Route>
            <Route path="/mail/">
              <MailList
                mails={mails}
                onEditDraft={this.onEditDraft}
                onToggleStar={this.onToggleStar}
                onClickMail={this.onGoToDetails}
                onDeleteMail={this.onDeleteMail}
                onToggleRead={this.onToggleRead}
              />
            </Route>
          </Switch>
        </section>
      </section>
    );
  }
}
