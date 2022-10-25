import React, { Component } from 'react'

class Bestseller extends Component {


  render(){
    return (
      <div className="my-3">
        
        <h1 className="text-center">Top 15 NY Bestseller Picks today</h1>
        <div className="row justify-content-center text-center">
          { this.props.bestsellerList==='' ? '' : this.props.bestsellerList.results.books.map((book,index)=>{
              return (
                <div key={index} className="col card mx-2">
                  <img className="book_image mt-3" src={book.book_image} key={index} />
                  <p className="">{book.title}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default Bestseller