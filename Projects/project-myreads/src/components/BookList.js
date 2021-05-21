import React, { Component } from 'react'
import Book from './Book'

export class BookList extends Component {
    render() {
        return this.props.books !== undefined && this.props.books.length > 0 ? (
            <ol className='books-grid'>
                {this.props.books.map((book) => (
                    <Book key={book.id} book={book} updateShelf={this.props.updateShelf}/>
                ))}
            </ol>
        ) : (
            <></>          
        )
    }
}

export default BookList
