import React, { Component } from 'react'

class Bestseller extends Component {
  constructor(props){
    super(props);
    this.state = {
      baseURL: 'https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json',
      apiKey: '?api-key=Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
      listingURL: '',
      bestsellerList: ''
    }
    this.showBestsellers = this.showBestsellers.bind(this);
  }

  showBestsellers(){
    this.setState({
      listingURL: this.state.baseURL + this.state.apiKey
    },()=>{
      fetch(this.state.listingURL)
      .then(res=>{
        return res.json();
      })
      .then(json=> this.setState({ bestsellerList: json }))
    })
  }

  render(){
    return (
      <div onLoad={this.showBestsellers}>
        <h1>{this.state.bestsellerList.copyright}</h1>
      </div>
    )
  }
}

export default Bestseller