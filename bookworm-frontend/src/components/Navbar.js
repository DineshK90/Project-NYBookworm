import React, { Component } from 'react'

class Navbar extends Component {
  render(){
    return (
      <header className='container-fluid'>
        <div className='d-flex justify-content-around'>
          <div className='p-2'>
            <img className="header-image" src="https://i.imgur.com/aATCr01.png"/> <span className="h1 align-bottom">Novel Listing & Personal Library</span>
          </div>

          <div className="p-2 align-self-center">
            { this.props.loggedInUser ? 'Logged in.' : <a className="btn btn-secondary" onClick={()=>this.props.toRegister()}>Register</a>}  |
            
            | { this.props.loggedInUser ? <a className="btn btn-secondary"  onClick={()=>this.props.toLogOut()}>Log Out</a> : <a className="btn btn-secondary" onClick={()=>this.props.toLogIn()}>Log In</a> }<br />
            
            { this.props.loggedInUser ? <p className="text-center mt-1"><strong>Welcome back, {this.props.loggedInUser}!</strong></p>:
            <p className="text-center mt-1"><strong>Welcome, reader!</strong></p> }
          </div>

        </div>
        <nav className="nav nav-tabs nav-justified">
          <a className="nav-link" onClick={()=>this.props.toHome()}>Home</a>
          <a className="nav-link" onClick={()=>this.props.toBestsellers()}>Search for NY Bestsellers</a>
          <a className="nav-link" onClick={()=>this.props.toBooklist()}>Personal Booklist</a>
        </nav>
      </header>
    )
  }
}

export default Navbar