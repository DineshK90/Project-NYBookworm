import React, { Component } from 'react'

class Booklist extends Component {
  render(){
    return (
      <div>
        <div className="text-center">
          <button className="btn btn-primary m-5" onClick={()=>this.props.toNewBookForm()}>Add new book to library</button>
          
        </div>

        { this.props.booksArray.map((book,index)=>{
          return (
            <div key={index} className="text-center">
              <h3>{index}. {book.title}, written by {book.author}<button className="btn btn-primary mx-3" onClick={()=>this.props.toEditBook(book,index)}>Edit Book</button></h3>
            </div>
          )
        })
        }

      </div>
    )
  }
}

export default Booklist