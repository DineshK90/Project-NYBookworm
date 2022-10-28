import React, { Component } from 'react'

class Booklist extends Component {
  render(){
    return (
      <div>
        
        <h1 className="text-center my-5">{this.props.loggedInUser}'s Personal Booklist</h1>

        <div className="row justify-content-center">
          { this.props.booksArray.map((book,index)=>{
            return (
              <div key={index} className="col text-center">
                <img src={book.image ? book.image : 'https://i.imgur.com/kZ1mvTm.png'} alt={book.title} className="book_image" onClick={()=>this.props.toBooklistDetails(book)} />
                <p>{book.title}<br /> written by {book.author}</p>
                <p><strong>[{book.readingStatus}]</strong></p>
                <button className="btn btn-info mx-1" onClick={()=>this.props.toEditBook(book,index)}>Edit Book</button>
                <button className="btn btn-danger mx-1" onClick={()=>this.props.deleteBook(book._id)}>Delete</button>
              </div>
            )
          })
          }
        </div>

        <div className="text-center">
          <button className="btn btn-primary m-5" onClick={()=>this.props.toNewBookForm()}>Add new book to library</button>
        </div>

      </div>
    )
  }
}

export default Booklist