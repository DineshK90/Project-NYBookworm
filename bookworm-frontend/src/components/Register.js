import React, { Component } from 'react'

class Register extends Component {
  render(){
    return (
      <div className="card user-card bg-light m-3">
        <h3 className="card-header">User Registration</h3>
        <form className="card-body">
          <div className="form-group">
            <label for="exampleInputUsername1">Username:</label>
            <input type="Username" className="form-control" id="exampleInputUsername1" aria-describedby="UsernameHelp" placeholder="Enter Username" />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password:</label>
            <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
            <small id="passwordHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Confirm Password:</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Password" />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default Register