import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import ListBooks from "./components/ListBooks";
import SearchBook from "./components/SearchBook";
import escapeRegExp from "escape-string-regexp";
import Trim from "trim";
import "./App.css";

const shelves = [
  {
    id: "currentlyReading",
    name: "Currently Reading"
  },

  {
    id: "wantToRead",
    name: "Want to Read"
  },

  {
    id: "read",
    name: "Read"
  }
];

class BooksApp extends Component {
  state = {
    books: [],
    searchedBooks: []
  };

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ books });
    });
  }

  updateBook = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf).then(() => {
      this.setState(state => ({
        books: state.books.filter(b => b.id !== book.id).concat([book])
      }));
    });
  };

  /**
   * A função de search busca os livros na API.
   * Filtra os livros já existentes nas estantes atualmente.
   */
  onSearchBook = value => {
    //zera a lista de livros pesquisados.
    this.setState({ searchedBooks: [] });
    value = Trim(value);

    //verifica se possui termo a ser pesquisado
    if (value) {
      //Filtra os resultados da estante de acordo com o termo pesquisado e inseri em uma variável temporaria.
      const match = new RegExp(escapeRegExp(value));
      let listBooks = this.state.books.filter(book => match.test(book.title));

      //Busca pelos livros na API e coloca na variável de state searchedBooks
      BooksAPI.search(value).then(searchedBooks => {
        this.setState({ searchedBooks });

        //verifica se teve resultado na pesquisa
        if (searchedBooks.length > 0) {
          //concatena o resultado da API com o resultado da estante atual.

          listBooks.map(book =>
            this.setState(state => ({
              searchedBooks: state.searchedBooks
                .filter(b => b.id !== book.id)
                .concat([book])
            }))
          );
        }
      });
    }
  };

  render() {
    const { books, searchedBooks } = this.state;
    const { updateBook, onSearchBook } = this;

    return (
      <div className="app">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-content">
                {shelves.map(shelf => (
                  <div key={shelf.id} className="bookshelf">
                    <h2 className="bookshelf-title">{shelf.name}</h2>
                    <div className="bookshelf-books">
                      <ListBooks
                        books={books.filter(book => book.shelf === shelf.id)}
                        changeShelf={true}
                        onUpdateBook={updateBook}
                        shelves={shelves}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="open-search">
                <Link
                  to="/search"
                  onClick={() => this.setState({ searchedBooks: [] })}
                />
              </div>
            </div>
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <div>
              <SearchBook
                onSearchBook={onSearchBook}
                books={searchedBooks}
                changeShelf={true}
                onUpdateBook={updateBook}
                shelves={shelves}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
