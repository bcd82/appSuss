const { Link } = ReactRouterDOM;
import { AppHeader } from "../cmps/AppHeader.jsx";

export const BookHome = () => {
  return (
    <div className="book-container">
      <AppHeader />
      <section className="home main-layout">
        <div className="home-container">
        <h1>Welcome to Miss Book !</h1>
        <h2>
          <Link to="/book">Check Out Our Books </Link>
        </h2>
        <h2><Link to="/book/add">Or Add One Yourself! </Link></h2>
          
        <img src="./assets/imgs/book/hands-books.png"></img>
        </div>
      </section>
    </div>
  );
};
