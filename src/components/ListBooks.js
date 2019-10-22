import React, { Component } from "react";
import BookShelf from "./BookShelf";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
class ListBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    };
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      let currentlyReading = {};
      let wantToRead = {};
      let read = {};
      // console.log(books)
      books.forEach(book => {
        if (book.shelf === "wantToRead") wantToRead[book.id] = book;
        else if (book.shelf === "currentlyReading") currentlyReading[book.id] = book;
        else if (book.shelf === "read") read[book.id] = book;
      });
      this.setState({
        currentlyReading,
        wantToRead,
        read
      });
    });
  }
  changeBookShelf = function changeBookShelf(book, shelf) {
    let prevShelf = book.shelf;
    BooksAPI.update(book, shelf);
    if (shelf !== "none") {
      let toAppend = this.state[shelf];
      toAppend[book.id] = book;
      this.setState({shelf:toAppend})
    }
    let toDelete = this.state[prevShelf];
    delete toDelete[book.id];
    this.setState({
      prevShelf: toDelete
    });
    // console.log(this.state,"++++++++++++++++")
  };
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              books={this.state.wantToRead}
              title={"Want to Read"}
              changeBookShelf={this.changeBookShelf.bind(this)}
            />
            <BookShelf
              books={this.state.currentlyReading}
              title={"Currently Reading"}
              changeBookShelf={this.changeBookShelf.bind(this)}
            />
            <BookShelf
              books={this.state.read}
              title={"Read"}
              changeBookShelf={this.changeBookShelf.bind(this)}
            />
          </div>
        </div>
        <Link to="/search">
          <div className="open-search">
            <button>Add a book</button>
          </div>
        </Link>
      </div>
    );
  }
}

export default ListBooks;
