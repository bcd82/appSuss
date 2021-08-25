const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { KeepApp } from "./js/apps/keep/pages/KeepApp.jsx";
import { BookApp } from "./js/apps/book/pages/BookApp.jsx";
import { MailApp } from "./js/apps/mail/pages/MailApp.jsx";
import { About } from "./js/pages/AppAbout.jsx";
import { AppFooter } from "./js/cmps/AppFooter.jsx";
import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { Home } from "./js/pages/AppHome.jsx";

export function App() {
  return (
    <section>
      <Router>
        <header>
          <AppHeader />
        </header>
        <main>
          <Switch>
            <Route path="/keep/add" component={KeepAdd} />
            <Route path="/keep/:keepId" component={KeepDetails} />
            <Route path="/keep" component={KeepApp} />
            <Route path="/book/add" component={BookAdd} />
            <Route path="/book/:bookId" component={BookDetails} />
            <Route path="/book" component={BookApp} />
            <Route path="/mail/compose" component={MailAdd} />
            <Route path="/mail/:mailId" component={MailDetails} />
            <Route path="/mail" component={MailApp} />
            <Route path="/about" component={About} />
            <Route path="/" component={Home} />
          </Switch>
        </main>
        <UserMsg />
        <footer>
          <AppFooter />
        </footer>
      </Router>
      <h1>Hey</h1>
    </section>
  );
}
