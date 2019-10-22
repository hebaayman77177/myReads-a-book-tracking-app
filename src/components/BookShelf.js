import React, { Component } from "react";
// import * as BooksAPI from '../BooksAPI'
import Book from "./Book";

class BookShelf extends Component {
  render() {
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {Object.keys(this.props.books).map((key, index)=>{
              return (
                <li key={key}>
                  <Book
                    info={this.props.books[key]}
                    changeBookShelf={this.props.changeBookShelf}
                  />
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}

export default BookShelf;
