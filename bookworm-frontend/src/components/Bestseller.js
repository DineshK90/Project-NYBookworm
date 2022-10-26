import React, { Component } from 'react'

class Bestseller extends Component {

  constructor(){
    super();

    this.preventSubmit = this.preventSubmit.bind(this);
  }

  preventSubmit(e){
    e.preventDefault();
  }

  render(){
    return (
      <div className="my-3">
        <form className="text-center my-3" onSubmit={(e)=>this.props.searchBook(e)}>
          <input className="mx-1" type="text" placeholder="Search Book Title"/>
          <input className="mx-1" type="text" placeholder="Search Book Author"/>
          <input className="mx-1" type="submit" value="Filter"/>
        </form>

        <form className="text-center my-3" onSubmit={(e)=>this.props.getBestsellers(e)}>
          <input className="mx-1" type="submit" value="Find Top 15 NY Bestsellers this week"/>
        </form>

        { this.props.bestsellerList==='' ? '' : <h1 className="text-center">Top 15 NY Bestseller Picks today</h1> }
        
        <div className="row justify-content-center text-center">
          { this.props.bestsellerList==='' ? '' : 
          this.props.bestsellerList.results.books.map((book,index)=>{
              return (
                <div key={index} className="col mx-2">
                  <img className="book_image mt-3" src={book.book_image} />
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