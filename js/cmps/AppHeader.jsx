const { NavLink, withRouter } = ReactRouterDOM;
import { AppMenu } from "./AppMenu.jsx";

const _AppHeader = (props) => {
  return (
    <section className="main-layout app-header">
      <img src="./assets/imgs/cmps/horse.png"  onClick={() => props.history.push("/")}/>
      <h1 onClick={() => props.history.push("/")} className="logo">
        <span>A</span>ppsus
      </h1>
      <div className="spacer"></div>
      <AppMenu />
    </section>
  );
};
export const AppHeader = withRouter(_AppHeader);
