import React, { Component } from 'react'

class LogIn extends Component {
  render(){
    return (
      <div className="card user-card bg-light m-3">
        <h3 className="card-header">Log In</h3>
        <form className="card-body" onSubmit={(e)=>this.props.handleLogIn(e)}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control" id="username" aria-describedby="UsernameHelp" placeholder="Enter Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" autoComplete="on" required/>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default LogIn