import { bookService } from "../services/book.service.js";
import { googleBooksService } from "../services/google.books.service.js";
import { eventBusService } from "../services/event.bus.service.js";

export class BookAdd extends React.Component {
  state = {
    books: null,
    query: "",
  };

  componentDidMount() {}

  onSelectBook = (bookIdx) => {};

  handleChange = ({ target }) => {
    this.setState({ query: target.value });
  };

  onSubmit = (ev) => {
    ev.preventDefault();
    googleBooksService
      .getGoogleBooks(this.state.query)
      .then((books) => this.setState({ books }));
  };

  onAddBook = (idx) => {
    bookService.addGoogleBook(this.state.books[idx]).then((book) => {
      eventBusService.emit("user-msg", {
        txt: `${book.title} added to your books!`,
        id: book.id,
      });
    });
  };
  render() {
    const { books, query } = this.state;

    return (
      <section className="book-add main-layout">
        <h1>Search for books </h1>
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={query}
            name="search"
            onChange={this.handleChange}
            autoFocus
          />
          <button>Search</button>
        </form>
        <div className="search-list ">
          <ul>
            {!books && <p>Search for something</p>}
            {books &&
              books.map((book, idx) => (
                <li key={idx}>
                  {book.volumeInfo.title}
                  <button onClick={() => this.onAddBook(idx)}> + </button>
                </li>
              ))}
          </ul>
        </div>
      </section>
    );
  }
}
