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

        { this.props.bestsellerList==='' ? '' :
        <div className="text-center">
          <h1 >Top 15 Weekly NY Bestseller Picks Since {this.props.bestsellerList.results.bestsellers_date}</h1>
          <small>(Click on the novel to see more details!)</small>
        </div>
        }
        <div className="row justify-content-center text-center">
          { this.props.bestsellerList==='' ? '' : 
          this.props.bestsellerList.results.books.map((book,index)=>{
              return (
                <div key={index} className="col">
                  <img className="book_image mt-3" src={book.book_image} alt={this.title} onClick={()=>this.props.showBookDetails(book)} />
                </div>
              )
            })
          }
        </div>

        { !this.props.NYTitle ? '' :   
          <div className="my-5 text-center">
            <h1>Book Details</h1>
            <img src={this.props.NYImage} alt={this.props.NYTitle}/>
            <h3>{this.props.NYTitle}</h3>
            <h3>By {this.props.NYAuthor}</h3>
            <h3>Publisher: {this.props.NYPublisher}</h3>
            <h3>Summary</h3>
            <p>{this.props.NYSummary}</p>
            <p><button className="btn btn-primary mx-2">Add</button><button className="btn btn-primary mx-2" onClick={()=>this.clearBookDetails()}>Clear</button></p>
          </div>
        }
      </div>
    )
  }
}

export default Bestseller