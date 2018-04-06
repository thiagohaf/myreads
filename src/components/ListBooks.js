import React from "react";
import Book from "./Book";
import sortBy from "sort-by";
import propTypes from "prop-types";

const ListBooks = props => {
  const { books, changeShelf, onUpdateBook, shelves } = props;

  let showningBooks;
  if (books) {
    showningBooks = books.sort(sortBy("title"));
  }

  return (
    <ol className="books-grid">
      {showningBooks &&
        showningBooks.map(book => (
          <li key={book.id}>
            <Book
              book={book}
              changeShelf={changeShelf}
              onUpdateBook={onUpdateBook}
              shelves={shelves}
            />
          </li>
        ))}
    </ol>
  );
};

ListBooks.PropTypes = {
  books: propTypes.array.isRequired,
  changeShelf: propTypes.bool.isRequired,
  shelves: propTypes.array.isRequired
};

export default ListBooks;
