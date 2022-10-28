import React, { Component } from 'react'

class BooklistDetails extends Component {
  render(){
    return (
      <div className="mb-4 text-center">
        <h1>Book Details</h1>
        <img src={this.props.image} alt={this.props.title}/>
        <h3>{this.props.title}</h3>
        <h3>By {this.props.author}</h3>
        <h3>Publisher: {this.props.publisher}</h3>
        <h3>Summary</h3>
        <p>{this.props.summary}</p>
        <h4>Reading Status: {this.props.readingStatus} </h4>
       { this.props.notes ?
        <>
          <h4>Additional Notes:</h4>
          <p>{this.props.notes}</p>
        </> : '' }
      </div>
    )
  }
}

export default BooklistDetails