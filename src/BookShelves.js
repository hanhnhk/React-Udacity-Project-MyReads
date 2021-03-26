import React, { Component } from 'react'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

export default class BookShelves extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentlyReading: [],
      wantToRead: [],
      read: []
    }
  }

  componentDidMount() {
    this.arrangeBooksOnShelves();
  }

  arrangeBooksOnShelves = () => {
    let currentlyReading = [], wantToRead = [], read = [];

    BooksAPI.getAll()
      .then((books) => {
        books.forEach(book => {
          if (book.shelf === 'currentlyReading')
            currentlyReading.push(book);
          else if (book.shelf === 'wantToRead')
            wantToRead.push(book);
          else if (book.shelf === 'read')
            read.push(book);
        });

        this.setState({
          currentlyReading: (currentlyReading),
          wantToRead: (wantToRead),
          read: (read)
        });
      });
  };

  handleChangeShelf = (originalShelf, book) => {
    this.removeBookFromShelf(originalShelf, book.id);
    this.addBookToShelf(book);
  };

  removeBookFromShelf = (originalShelf, bookID) => {
    if (originalShelf === 'currentlyReading') {
      this.setState({
        [originalShelf]: this.state.currentlyReading.filter((b) => (b.id !== bookID))
      });
    }
    else if (originalShelf === 'wantToRead') {
      this.setState({
        [originalShelf]: this.state.wantToRead.filter((b) => (b.id !== bookID))
      });
    }
    else if (originalShelf === 'read') {
      this.setState({
        [originalShelf]: this.state.read.filter((b) => (b.id !== bookID))
      });
    }
  };

  addBookToShelf = (book) => {
    if (book.shelf === 'currentlyReading') {
      this.setState(prevState => ({
        currentlyReading: prevState.currentlyReading.concat(book)
      }));
    }
    else if (book.shelf === 'wantToRead') {
      this.setState(prevState => ({
        wantToRead: prevState.wantToRead.concat(book)
      }));
    }
    else if (book.shelf === 'read') {
      this.setState(prevState => ({
        read: prevState.read.concat(book)
      }));
    }
  };

  render() {
    return (
      <div className="list-books-content">
        <div>
          <BookShelf title='Currently Reading' books={this.state.currentlyReading} onChangeShelf={this.handleChangeShelf} />
          <BookShelf title='Want to Read' books={this.state.wantToRead} onChangeShelf={this.handleChangeShelf} />
          <BookShelf title='Read' books={this.state.read} onChangeShelf={this.handleChangeShelf} />
        </div>
      </div>);
  }
}