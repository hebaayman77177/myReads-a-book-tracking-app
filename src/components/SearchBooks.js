import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { Link } from "react-router-dom";

class SearchBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      books: []
    };
  }
  inputChanged(event) {
    // this.setState({searchTerm:event.target.value})
    BooksAPI.search(event.target.value)
      .then(books => {
        this.setState({ books });
      })
      .catch(err => console.log(err));
  }
  changeBookShelf = function changeBookShelf(book, shelf) {
    BooksAPI.update(book, shelf);
  };
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={this.inputChanged.bind(this)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {(Array.isArray(this.state.books)
              ? this.state.books
              : [] || []
            ).map((book, key) => {
              return (
                <li key={key}>
                  <Book info={book} changeBookShelf={this.changeBookShelf} />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default SearchBooks;
