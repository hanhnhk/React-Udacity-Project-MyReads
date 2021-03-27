import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      queryTime: ''
    };
  }

  handleSearch = (e) => {
    let query = e.target.value;
    const queryTime = new Date();
    this.setState({
      query: query,
      queryTime: queryTime
    });

    this.search(query, queryTime );
  };

  search = (query, queryTime) => {
    query = query.trim();
    if (query) {
      setTimeout(() => {
        if (queryTime === this.state.queryTime){
          BooksAPI.search(query)
          .then(books => {
            if (queryTime === this.state.queryTime){
              this.props.showSearchResult(books);
            }
          });
        }        
      }, 150);      
    }
    else {
      this.props.showSearchResult([]);
    }
  };

  render() {
    return (
      <div className="search-books-input-wrapper">
        {/*
          NOTES: The search from BooksAPI is limited to a particular set of search terms.
          You can find these search terms here:
          https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

          However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
          you don't find a specific author or title. Every search is limited by search terms.
        */}
        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.handleSearch} />
      </div>
    );
  }
}