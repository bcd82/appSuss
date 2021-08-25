import { MailMenu } from "../cmps/MailMenu.jsx";
import { MailAdd } from "./MailAdd.jsx";
import { MailDetails } from "./MailDetails.jsx";
import { MailList } from "../cmps/MailList.jsx";

const { Link, NavLink, Route, Switch } = ReactRouterDOM;

export class MailApp extends React.Component {
  render() {
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
            <Route path="/mail/" component={MailList} />
          </Switch>
        </section>
      </section>
    );
  }
}
