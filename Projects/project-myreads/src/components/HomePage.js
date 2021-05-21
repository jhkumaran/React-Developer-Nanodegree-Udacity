import React, { Component } from 'react'
import * as BooksAPI from '../BooksAPI'
import Dashboard from './Dashboard'
import SearchBook from './SearchBook'
import {Route} from 'react-router-dom'

export class HomePage extends Component {
  state={
    books:[]
  }

  updateBooks=(books) => {
    this.setState({books: books})
  }

  updateShelf = (book) => {
      let newBooks = [...this.state.books];
      let bookIndex = newBooks.findIndex(t=> t.id === book.id);
      newBooks[bookIndex] = book;
      this.setState({ books: newBooks});
      BooksAPI.update(book, book.shelf);
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <Dashboard books={this.state.books} 
                  updateBooks={this.updateBooks}
                  updateShelf={this.updateShelf}/>
        )}/>

        <Route exact path='/search' render={() => (
          <SearchBook books={this.state.books}
                    updateShelf={this.updateShelf}/>
        )}/>
      </div>
    )
  }
}

export default HomePage
