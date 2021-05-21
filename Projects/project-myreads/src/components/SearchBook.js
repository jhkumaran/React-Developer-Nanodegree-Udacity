import React, { Component } from 'react'
import Select from 'react-select';
import {Link} from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import BookList from './BookList'

export class SearchBook extends Component {
    state = {
        query: '',
        searchResults:[],
        sortOptions: [
            { value: 1, label: 'Rating: High to Low'},
            { value: 2, label: 'Rating: Low to High'},
            { value: 3, label: 'Published Date: Newest to Oldest'},
            { value: 4, label: 'Published Data: Oldest to Newest'},
            { value: 5, label: 'Title: A to Z'},
            { value: 6, label: 'Title: Z to A'},
            { value: 7, label: 'Unread to Read'},
        ],
    }

    updateQuery = (e) => {
        this.setState({ query: e.target.value}, () => {
            this.searchBooks();
        })
    }

    searchBooks = () => {
        if(this.state.query === '' || this.state.query === undefined) {
            this.setState({searchResults :[]});
            return;
        }
        BooksAPI.search(this.state.query)
        .then((books) => {
            if(this.props.books !== undefined && this.props.books.length > 0 && books.length > 0){
                this.props.books.map((book) => {
                    let searchResult = books.find(t=> t.id === book.id);
                    if(searchResult){
                        searchResult.shelf = book.shelf;
                    }
                })
            }
            this.setState({searchResults: books});
        })
        .catch((ex) => {
            console.log(ex);
        })
    }

    sortOptionChanged = (selectedOption) => {
        switch(selectedOption.value){
            case 1:
                this.sortByRatingHightoLow();
                break;
            case 2:
                this.sortByRatingLowToHigh();
                break;
            case 3:
                this.sortByPublishedDateNewToOld();
                break;
            case 4:
                this.sortByPublishedDateOldToNew();
                break;
            case 5:
                this.sortByTitleAtoZ();
                break;
            case 6:
                this.sortByTitleZtoA();
                break;
            case 7:
                this.sortByReadingShelfOrder();
                break;
            default:
                break;
        }
    }

    sortByTitleAtoZ = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => {
                if(a.title.toLowerCase() < b.title.toLowerCase()) return -1;
                if(a.title.toLowerCase() > b.title.toLowerCase()) return 1;
                return 0;
            });
        this.setState({ searchResults : sortedResults });
    }

    sortByTitleZtoA = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => {
                if(a.title.toLowerCase() < b.title.toLowerCase()) return 1;
                if(a.title.toLowerCase() > b.title.toLowerCase()) return -1;
                return 0;
            });
        this.setState({ searchResults : sortedResults });
    }

    sortByPublishedDateNewToOld = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => b.publishedDate !== undefined ? new Date(b.publishedDate) - new Date(a.publishedDate) : -1)
        this.setState({ searchResults : sortedResults });
    }

    sortByPublishedDateOldToNew = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => b.publishedDate !== undefined ? new Date(a.publishedDate) - new Date(b.publishedDate) : -1)
        this.setState({ searchResults : sortedResults });
    }

    sortByRatingHightoLow = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => b.averageRating !== undefined ? b.averageRating - a.averageRating : -1)
        this.setState({ searchResults : sortedResults });
    }

    sortByRatingLowToHigh = () => {
        const sortedResults = this.state.searchResults
            .sort((a, b) => b.averageRating !== undefined ? a.averageRating - b.averageRating : -1)
        this.setState({ searchResults : sortedResults });
    }

    sortByReadingShelfOrder = () => {
        const sortedResults = [];
        this.state.searchResults.filter((b) => b.shelf === undefined || b.shelf === 'none').map((b) => sortedResults.push(b));
        this.state.searchResults.filter((b) => b.shelf === 'wantToRead').map((b) => sortedResults.push(b));
        this.state.searchResults.filter((b) => b.shelf === 'currentlyReading').map((b) => sortedResults.push(b));
        this.state.searchResults.filter((b) => b.shelf === 'read').map((b) => sortedResults.push(b));
        this.setState({ searchResults : sortedResults });
    }

    render() {
        return (
            <div className='search-books'>
                <div className='search-books-bar'>
                    <Link className='close-search' to='/'/>
                    <div className='search-books-input-wrapper'>
                        <input type='text' placeholder='Search by title or author'
                            value={this.state.query} onChange={(e) => this.updateQuery(e)}/>
                    </div>
                </div>
                
                <div className='search-books-results'>
                    {
                        this.state.searchResults.length > 0 && 
                        <div className='sort-books'>
                            <h4>Sort By:</h4>
                            <Select className='sort-book-dropdown'
                                options={this.state.sortOptions}
                                onChange={(e) => this.sortOptionChanged(e)} />
                        </div>
                    }
                    <BookList books={this.state.searchResults} updateShelf={this.props.updateShelf}/>
                </div>
            </div>
        )
    }
}

export default SearchBook
