import React, { Component } from 'react'

class Bestseller extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseURL: 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?',
      apiKey: 'api-key=Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
      listingURL: '',
      bestsellerList: ''
    }
    this.showBestsellers = this.showBestsellers.bind(this);
  }

  showBestsellers(e){
    e.preventDefault();
    this.setState({
      listingURL: this.state.baseURL + this.state.apiKey,
    },()=>{
      fetch(this.state.listingURL)
      .then((res) => {
        console.log(`hi`)
        return res.json();
      })
      .then((json) => this.setState({ bestsellerList: json }))
    })
  }

  render(){
    return (
      <div>
        <button onClick={this.showBestsellers}>Click me</button>
        <h1>Top 15 NY Bestseller Picks today</h1>
        {/* { this.state.bestsellerList==='' ? '' : <img src={this.state.bestsellerList.results.books[0].book_image} /> }
        { this.state.bestsellerList==='' ? '' : <h3>{this.state.bestsellerList.results.books[0].title}</h3> }
        { this.state.bestsellerList==='' ? '' : <p>{this.state.bestsellerList.results.books[0].description}</p> } */}

        { this.state.bestsellerList==='' ? '' : this.state.bestsellerList.results.books.map(book=>{
            return (
              <>
                <img src={book.book_image} />
                <h4>{book.title}</h4>
              </>
            )
          })
        }
      </div>
    )
  }
}

export default Bestseller