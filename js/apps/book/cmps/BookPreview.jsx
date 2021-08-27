import { utilService } from "../../../services/util.service.js";
const { withRouter } = ReactRouterDOM;

function _BookPreview({ book, onSelectBook, history }) {
  const formattedPrice = utilService.getPriceCurrency(book);

  const goToBook = () => {
    history.push(`/book/read/${book.id}`);
  };

  return (
    <article className="book-preview" onClick={goToBook}>
      <h2 className="book-title">{book.title}</h2>
      <p className="book-price">{formattedPrice}</p>
      <img src={book.thumbnail} />
    </article>
  );
}

export const BookPreview = withRouter(_BookPreview);
