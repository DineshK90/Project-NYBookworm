import React, { Component } from 'react'

class Bestseller extends Component {

  render(){
    return (
      <div className="my-3">
        <form className="text-center my-3" onSubmit={(e)=>this.props.searchBook(e)}>
          <input className="mx-1" type="date" id="date" onChange={(e)=>this.props.handleChange(e)}/>
          <input className="mx-1" type="submit" value="Check Bestsellers by this date"/>
        </form>

        <form className="text-center my-3" onSubmit={(e)=>this.props.getBestsellers(e)}>
          <input className="mx-1" type="submit" value="Find Top 15 NY Bestsellers this week"/><br />
          <small>Powered by NYTimes Book APIs, provided from <a href="https://developer.nytimes.com/apis" target="#">https://developer.nytimes.com/apis</a></small>
        </form>
        
        <p>This is the changed date: {this.props.date}</p>


        { this.props.bestsellerList==='' ? '' : <h1 className="text-center">Top 15 Weekly NY Bestseller Picks Since {this.props.bestsellerList.results.bestsellers_date}</h1> }

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