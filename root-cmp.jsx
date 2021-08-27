const Router = ReactRouterDOM.HashRouter;
const { Route, Switch } = ReactRouterDOM;

import { KeepApp } from "./js/apps/keep/pages/KeepApp.jsx";
import { BookDetails } from "./js/apps/book/pages/BookDetails.jsx";
import { BookApp } from "./js/apps/book/pages/BookApp.jsx";
import { BookAdd } from "./js/apps/book/pages/Bookadd.jsx";
import { BookHome } from "./js/apps/book/pages/BookHome.jsx";
import { BookAbout } from "./js/apps/book/pages/BookAbout.jsx";
import { MailApp } from "./js/apps/mail/pages/MailApp.jsx";

// import { About } from "./js/pages/AppAbout.jsx";
// import { AppFooter } from "./js/cmps/AppFooter.jsx";
import { AppHeader } from "./js/cmps/AppHeader.jsx";
import { AppHome } from "./js/pages/AppHome.jsx";
import { UserMsg } from "./js/cmps/UserMsg.jsx";

export function App() {
  return (
    <section>
      <Router>
        <header>
          <AppHeader />
        </header>
        <main>
          <Switch>
            {/* <Route path="/keep/add" component={KeepAdd} /> */}
            {/* <Route path="/keep/:keepId" component={KeepDetails} /> */}
            <Route path="/keep" component={KeepApp} />
            <Route path="/book/read/:bookId" component={BookDetails} />
            <Route path="/book/add/" component={BookAdd} />
            <Route path="/book/about/" component={BookAbout} />
            <Route path="/book/home/" component={BookHome} />
            <Route path="/book" component={BookApp} />
            <Route path="/mail" component={MailApp} />
            {/* <Route path="/about" component={About} /> */}
            <Route path="/" component={AppHome} />
          </Switch>
        </main>
        <footer>{/* <AppFooter /> */}</footer>
        <UserMsg />
      </Router>
    </section>
  );
}
