import React, { Component } from "react";

class EditBook extends Component {
  render() {
    return (
      <div className="card user-card bg-light m-3">
        <form className="card-body" onSubmit={(e) => this.props.editBook(e)}>
          <h3 className="card-header mb-3">Editing current Book</h3>
          <div className="form-group my-1">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              className="form-control"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.title}
            />
          </div>

          <div className="form-group my-1">
            <label htmlFor="author">Author:</label>
            <input
              type="text"
              id="author"
              className="form-control"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.author}
            />
          </div>

          <div className="form-group my-1">
            <label htmlFor="image">Image Link:</label>
            <input
              type="text"
              id="image"
              className="form-control"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.image}
            />
          </div>

          <div className="form-group my-1">
            <label htmlFor="summary">Summary:</label>
            <input
              type="text"
              id="summary"
              className="form-control"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.summary}
            />
          </div>

          <div className="form-group my-1">
            <label htmlFor="publisher">Publisher:</label>
            <input
              type="text"
              id="publisher"
              className="form-control"
              onChange={(e) => this.props.handleChange(e)}
              value={this.props.publisher}
            />
          </div>

          <div className="form-group my-1">
            <label htmlFor="readingStatus">Reading Status:</label>
            <select
              value={this.props.readingStatus}
              onChange={(e) => this.props.handleChangeSelect(e)}
              className="form-select"
            >
              <option value="Not Started">Not Started</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Dropped">Dropped</option>
              <option value="Completed">Completed</option>

            </select>
          </div>

          <div className="form-group my-1">
            <label htmlFor="notes">Extra Notes:</label>
            <input
              type="text"
              id="notes"
              onChange={(e) => this.props.handleChange(e)}
              className="form-control"
              value={this.props.notes}
            />
          </div>
          <input type="submit" className="btn btn-primary my-3" value="Edit current book" />
        </form>
      </div>
    );
  }
}

export default EditBook;
