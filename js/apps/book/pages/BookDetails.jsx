import { LongText } from "../cmps/LongText.jsx";
import { bookService } from "../services/book.service.js";
import { utilService } from "../../../services/util.service.js";
import { ReviewAdd } from "../cmps/ReviewAdd.jsx";
import { Review } from "../cmps/Review.jsx";
import { AppHeader } from "../cmps/AppHeader.jsx";

const { Link } = ReactRouterDOM;

export class BookDetails extends React.Component {
  state = {
    isLongTxtShown: false,
    book: null,
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.loadBook();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.bookId !== this.props.match.params.bookId) {
      this.loadBook();
    }
  }
  onAddReview = (ev, review) => {
    ev.preventDefault();
    bookService
      .addReview(this.state.book.id, review)
      .then(() => this.loadBook());
  };

  onDeleteReview = (reviewIdx, bookId) => {
    bookService.deleteReview(reviewIdx, bookId).then(() => this.loadBook());
  };

  loadBook = () => {
    const id = this.props.match.params.bookId;
    bookService.getBookById(id).then((book) => {
      this.setState({ book });
      if (book.reviews) this.setState({ reviews: book.reviews });
    });
  };

  onToggleTxt = () => {
    this.setState({ isLongTxtShown: !this.state.isLongTxtShown });
  };

  onBack = () => {
    this.props.history.push("/book");
  };

  getLaguage = () => {
    switch (this.state.book.language) {
      case "he":
        return "Hebrew";
      case "sp":
        return "Spanish";
      default:
        return "English";
    }
  };

  getPriceClass = () => {
    if (this.state.book.listPrice.amount >= 150) return "red";
    if (this.state.book.listPrice.amount <= 20) return "green";
  };

  getTextForBookYears = () => {
    const thisYear = new Date(Date.now()).getFullYear();
    let publishYear = this.state.book.publishedDate;
    if (typeof publishYear === "string")
      publishYear = +this.state.book.publishedDate.substring(0, 4);

    if (thisYear - publishYear >= 10) return "Veteran Book";
    if (thisYear - publishYear <= 1) return "New Book";
  };

  getReadingType = () => {
    if (this.state.book.pageCount >= 200 && this.state.book.pageCount < 500)
      return "Descent Reading";
    if (this.state.book.pageCount <= 100) return "Light Reading";
    return "Long Reading";
  };

  render() {
    const { book } = this.state;
    if (!book) return <h1>Loading</h1>;
    const formattedPrice = utilService.getPriceCurrency(book);

    return (
      <div className="book-container" >
        <AppHeader/>
        <section className="book-details main-layout" >
          <div className="top-btns" >
            <Link to={`/book/read/${bookService.getDiffBookId(book.id, -1)}`}>
              <button className="back-btn">Previous Book</button>
            </Link>
            <button className="back-btn" onClick={this.onBack}>
              Back
            </button>
            <Link to={`/book/read/${bookService.getDiffBookId(book.id, 1)}`}>
              <button className="back-btn">Next Book</button>
            </Link>
          </div>
          <div className="details-img">
            {book.listPrice.isOnSale && (
              <p className=" reading-type sale">ON-SALE</p>
            )}
            {!(book.pageCount > 100 && book.pageCount < 200) && (
              <p className="reading-type">{this.getReadingType()}</p>
            )}
            <img src={book.thumbnail}></img>
          </div>
          <div className="more-details">
            <h1 className="title">{book.title}</h1>
            <p className="sub-title">{book.subtitle}</p>
            <p className="author">
              By: {!book.authors && "Unknown"}
              {book.authors && book.authors.join()}
            </p>
            <p className="publish-date">
              Published on: {book.publishedDate} {this.getTextForBookYears()}
            </p>
            <p className={`price ${this.getPriceClass()}`}>
              Price: {formattedPrice}{" "}
              {book.listPrice.isOnSale && <span className="sale">ON SALE</span>}
            </p>
            <p>Language: {this.getLaguage()}</p>
            <p>Length: {book.pageCount} pages</p>
            <div className="categories">
              Categories :
              {book.categories.map((category, idx) => (
                <p className="category" key={idx}>
                  {category}
                </p>
              ))}
            </div>
            <LongText
              text={book.description}
              isLongTxtShown={this.state.isLongTxtShown}
              onClickMore={this.onToggleTxt}
            />
          </div>

          <div className="add-review-box">
            <ReviewAdd book={book} onSubmit={this.onAddReview} />
          </div>

          <div className="reviews-container">
            {!book.reviews || !book.reviews.length ? (
              <p> No reviews yet..</p>
            ) : (
              book.reviews.map((review, idx) => (
                <Review
                  review={review}
                  idx={idx}
                  key={idx}
                  bookId={book.id}
                  onDelete={this.onDeleteReview}
                />
              ))
            )}
          </div>
        </section>
      </div>
    );
  }
}
