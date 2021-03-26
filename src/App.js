import React from 'react'
import './App.css'
import MyReads from './MyReads'
import Search from './Search'
import { Route } from 'react-router-dom'

export default class BooksApp extends React.Component {
  render() {
    return (
      <div className="app">
        <Route exact path='/' render={({ history }) => (
          <MyReads history={history} />
        )} />

        <Route path='/search' render={({ history }) => (
          <Search history={history} />
        )} />
      </div>
    );
  }
}