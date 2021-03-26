import React, { Component } from 'react'
import Books from './Books'
import SearchBar from './SearchBar'
import * as BooksAPI from './BooksAPI'

export default class SearchBooks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      books: []
    };
  }

  navigateToMyReads = () => {
    this.props.history.push('/');
  };

  showBooksOnShelves = (books, myReads) => {
    return (
      Array.isArray(books)
      ? books.map(b => {
        return {
          ...b,
          shelf: myReads[b.id] ? myReads[b.id] : 'none'
        };
      })
      : []);
  };

  showSearchResult = (resBooks) => {
    let myReads = {};
    BooksAPI.getAll()
      .then((books) => {
        books.forEach((b) => {
          const { id, shelf } = b;
          myReads = {
            ...myReads,
            [id]: shelf
          };
        });
        this.setState({
          books: this.showBooksOnShelves(resBooks, myReads)
        });
      });
  };

  handleChangeShelf = (originalShelf, book) => {
    const books = this.state.books;
    const index = books.findIndex(b => b.id === book.id);
    books[index].shelf = book.shelf;

    this.setState({
      books: books
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={this.navigateToMyReads}>Close</button>
          <SearchBar showSearchResult={this.showSearchResult} />
        </div>
        <div className="search-books-results">
          <Books books={this.state.books} onChangeShelf={this.handleChangeShelf} />
        </div>
      </div>
    );
  }
}