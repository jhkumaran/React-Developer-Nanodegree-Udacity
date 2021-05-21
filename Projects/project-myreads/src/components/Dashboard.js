import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookShelf from './BookShelf'

export class Dashboard extends Component {

    componentDidMount(){
        this.getAllBooks();
    }

    getAllBooks = () => {
        BooksAPI.getAll()
        .then((books) => {
            this.props.updateBooks(books);
        })
    }
    render() {
        return (
            <div className='list-books'>
                <div className='list-books-title'>
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <BookShelf section='currentlyReading' 
                            sectionHeader='Currently Reading' 
                            books={this.props.books}
                            updateShelf={this.props.updateShelf}/>                 
                    <BookShelf section='wantToRead' 
                            sectionHeader='Want To Read' 
                            books={this.props.books}
                            updateShelf={this.props.updateShelf}/>                 
                    <BookShelf section='read' 
                            sectionHeader='Read' 
                            books={this.props.books}
                            updateShelf={this.props.updateShelf}/>                 
                </div>
                <div className='open-search'>
                    <Link to='/search'>Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Dashboard
