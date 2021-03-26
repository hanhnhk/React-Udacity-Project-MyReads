import React from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

export default function BookShelf(props) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{props.title}</h2>
      <div className="bookshelf-books">
        <Books books={props.books} onChangeShelf={props.onChangeShelf} />
      </div>
    </div>
  );
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}