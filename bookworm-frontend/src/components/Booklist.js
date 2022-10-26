import React, { Component } from 'react'

class Booklist extends Component {
  render(){
    return (
      <div>
        <div className="text-center">
          <button className="btn btn-primary m-5" onClick={()=>this.props.toNewBookForm()}>Add new book to library</button>
          <button className="btn btn-primary m-5" onClick={()=>this.props.toEditBook()}>Edit Book</button>
        </div>

        { this.props.booksArray.map((book,index)=>{
          return (
            <div key={index} className="text-center">
              <h3>{index}. {book.title}, written by {book.author}</h3>
            </div>
          )
        })
        }

      </div>
    )
  }
}

export default Booklist