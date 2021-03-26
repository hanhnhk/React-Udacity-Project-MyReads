import React from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

export default function Books(props) {
  return (
    <ol className="books-grid">
      {props.books.length > 0 && props.books.map(book => (
        <Book key={book.id} book={book} onChangeShelf={props.onChangeShelf} />
      ))}
    </ol>
  );
}

Books.propTypes = {
  books: PropTypes.array.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}