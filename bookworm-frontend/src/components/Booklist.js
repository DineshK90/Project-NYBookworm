import React, { Component } from 'react'

class Booklist extends Component {
  render(){
    return (
      <div>
        <div className="text-center">
          <button className="btn btn-primary m-5" onClick={()=>this.props.toNewBookForm()}>Add new book to library</button>
          
        </div>

        <div className="row justify-content-center">
          { this.props.booksArray.map((book,index)=>{
            return (
              <div key={index} className="col text-center">
                <img src={book.image} alt={book.title} className="book_image" />
                <p>{book.title}<br /> written by {book.author}</p>
                <p><strong>[{book.readingStatus}]</strong></p>
                <button className="btn btn-info mx-1" onClick={()=>this.props.toEditBook(book,index)}>Edit Book</button>
                <button className="btn btn-danger mx-1" onClick={()=>this.props.toEditBook(book,index)}>Delete</button>
              </div>
            )
          })
          }
        </div>
      </div>
    )
  }
}

export default Booklist