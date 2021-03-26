import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'

export default class BookShelfChanger extends Component {
  handleChangeShelf = (event) => {
    const shelf = event.target.value;
    BooksAPI.update(this.props.book, shelf)
      .then(() => {
        let originalShelf = this.props.book.shelf;
        let updatedBook = this.props.book;
        updatedBook.shelf = shelf;
        this.props.onChangeShelf(originalShelf, updatedBook);
      });
  }

  render() {
    return (
      <div className="book-shelf-changer">
        <select value={this.props.book.shelf} onChange={this.handleChangeShelf}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}

BookShelfChanger.propTypes = {
  onChangeShelf: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired
}