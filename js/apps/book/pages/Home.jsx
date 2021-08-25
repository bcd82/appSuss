const { Link } = ReactRouterDOM;

export const Home = () => {
  return (
    <section className="home main-layout">
      <h1>Welcome to Miss Book !</h1>
      <h2>
        <Link to="/book">Check Out Our Books </Link>
      </h2>
      <img src="./assets/img/hands-books.png"></img>
    </section>
  );
};
