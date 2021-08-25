export function NoteTodos({ note }) {
    return (
      <article className={note.type}>
          <Link to={`/book/${book.id}`}>
            <img src={book.thumbnail} />
          </Link>
          <h4>Title - {book.title}</h4>
          <h4
            className={
              book.listPrice.amount > 150
                ? 'red'
                : book.listPrice.amount < 20
                ? 'green'
                : ''
            }
          >
            Price - {book.listPrice.amount}
          </h4>
      </article>
    );
  }