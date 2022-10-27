import React, { Component } from 'react'

class LogIn extends Component {
  render(){
    return (
      <div className="card user-card bg-light m-3">
        <h3 className="card-header">Log In</h3>
        <form className="card-body" onSubmit={(e)=>this.props.handleLogIn(e)}>
          { this.props.newRegister ? <p className="text-success">Registration successful! Please log in.</p> : '' }
          <div className="form-group my-1">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control" id="username" aria-describedby="UsernameHelp" placeholder="Enter Username" onChange={(e)=>this.props.handleChange(e)} required />
          </div>
          <div className="form-group my-1">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" autoComplete="on" onChange={(e)=>this.props.handleChange(e)} required/>
          </div>
          <input type="submit" className="btn btn-primary mt-3" value="Log In"/>
          { this.props.logInError ? <p className="text-danger"><em>Incorrect Username/Password</em></p> : '' }
        </form>
      </div>
    )
  }
}

export default LogIn