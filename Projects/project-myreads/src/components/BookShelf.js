import React, { Component } from 'react'
import BookList from './BookList'

export class BookShelf extends Component {
    render() {
        let books = this.props.books.filter(t => t.shelf === this.props.section);
        return (
            <div>
                <div className='bookshelf'>
                    <h2 className='bookshelf-title'>{this.props.sectionHeader}</h2>
                    <div className='bookshelf-books'>
                       <BookList books={books} updateShelf={this.props.updateShelf}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default BookShelf
