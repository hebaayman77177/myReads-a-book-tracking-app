import React, { Component } from "react";

class Book extends Component {
  handleChange(event,book){
    console.log(event.target.value)
    console.log(this.props.info.id)
    this.props.changeBookShelf(this.props.info,event.target.value+"")
  }
  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 192,
              backgroundImage:`url(${this.props.info.imageLinks.smallThumbnail})`
            }}
          ></div>
          <div className="book-shelf-changer" >
            <select onChange={this.handleChange.bind(this)} >
              <option value="move">
                Move to...
              </option>
              <option value="wantToRead">Want to Read</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{this.props.info.title}</div>
        <div className="book-authors">{this.props.info.authors}</div>
      </div>
    );
  }
}

export default Book;
