import React, { Component } from "react";

class NewBookForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      author: "",
      yearPublished: "",
      readingStatus: "",
    };
  }

handleChange(event){
    this.setState({[event.target.id]: event.target.value})
}

handleSubmit(event){
    event.preventDefault()
}



  render() {
    return (
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" value={this.state.title} onChange={this.handleChange}/>
        <label htmlFor="author">Author</label>
        <input type="text" id="author" value={this.state.author} onChange={this.handleChange}/>
        <label htmlFor="yearPublished">Year Published</label>
        <input
          type="text"
          id="yearPublished"
          value={this.state.yearPublished} onChange={this.handleChange}
        />
        <label htmlFor="readingStatus"></label>
        <input
          type="text"
          id="readingStatus"
          value={this.state.readingStatus} onChange={this.handleChange}
        />
        <label htmlFor="notes"></label>
        <input type="text" id="notes" value={this.state.notes} onChange={this.handleChange}/>

        <input type="submit" value="Add a Book" />
      </form>
    );
  }
}

export default NewBookForm
