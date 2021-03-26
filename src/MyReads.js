import React from 'react'
import BookShelves from './BookShelves'

export default function MyReads(props) {    
  const header =
    <div className="list-books-title">
      <h1>MyReads</h1>
    </div>;

  const openSearchBook =
    <div className="open-search">
      <button onClick={() => { props.history.push('/search'); }}>Add a book</button>
    </div>;

  return (
    <div className="list-books">
      {header}
      <BookShelves />
      {openSearchBook}
    </div>
  );
}