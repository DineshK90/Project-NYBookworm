import React, { Component } from 'react'

class Register extends Component {
  render(){
    return (
      <div className="card user-card bg-light m-3">
        <h3 className="card-header">User Registration</h3>
        <form className="card-body" onSubmit={(e)=>this.props.handleRegister(e)}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" placeholder="Enter Email" autoComplete="on" onChange={(e)=>this.props.handleChange(e)} required />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="Username" className="form-control" id="username" aria-describedby="UsernameHelp" placeholder="Enter Username"  onChange={(e)=>this.props.handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" autoComplete="on" onChange={(e)=>this.props.handleChange(e)} required />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm Password" autoComplete="on" required />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>
      </div>
    )
  }
}

export default Register