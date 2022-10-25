import React, { Component } from 'react'

class LogIn extends Component {
  render(){
    return (
      <div className="card user-card bg-light m-3">
        <h3 className="card-header">Log In</h3>
        <form className="card-body">
          <div className="form-group">
            <label for="exampleInputUsername1">Username:</label>
            <input type="text" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter Username" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password:</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default LogIn