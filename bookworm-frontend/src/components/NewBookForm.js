import React, { Component } from "react";

class NewBookForm extends Component {

  render() {
    return (
      <div className="card user-card bg-light m-3">
        <form className="card-body" onSubmit={e=>this.props.addBook(e)}>
          <h3 className="card-header mb-3">Adding new Book</h3>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" className="form-control" onChange={(e)=>this.props.handleChange(e)}/>
          </div>
          
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input type="text" id="author" className="form-control" onChange={(e)=>this.props.handleChange(e)}/>
          </div>

          <div className="form-group">
            <label htmlFor="readingStatus">Reading Status:</label>
            <input
              type="text"
              id="readingStatus"
              onChange={(e)=>this.props.handleChange(e)}
              className="form-control"
            />
          </div>

          <div className="form-group">
            <label htmlFor="notes">Extra Notes:</label>
            <input type="text" id="notes" onChange={(e)=>this.props.handleChange(e)} className="form-control"/>
          </div>
          <input type="submit" className="btn btn-primary my-3"/>
        </form>
      </div>
    );
  }
}

export default NewBookForm
