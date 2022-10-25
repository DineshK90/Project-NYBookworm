/*------------------
  IMPORT DEPENDECIES
------------------*/

import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Bestseller from './components/Bestseller';
import Booklist from './components/Booklist';
import LogIn from './components/LogIn';
import Register from './components/Register';


class App extends Component {

/*------------------
  CONSTRUCTOR
------------------*/

  constructor(props){
    super(props);
    this.state = {
      navHome: true,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
    }
    this.toHome = this.toHome.bind(this)
    this.toLogIn = this.toLogIn.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.toBestsellers = this.toBestsellers.bind(this);
    this.toBooklist = this.toBooklist.bind(this);
  }
  
/*------------------
  NAV FUNCTION
------------------*/

toHome(){
  this.setState({
    navHome: true,
    navLogIn: false,
    navRegister: false,  
    navBestsellers: false,
    navBooklist: false,
  })
}

  toLogIn(){
    this.setState({
      navHome: false,
      navLogIn: true,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
    })
  }

  toRegister(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: true,  
      navBestsellers: false,
      navBooklist: false,
    })
  }

  toBestsellers(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: true,
      navBooklist: false,
    })
  }

  toBooklist(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: true,
    })
  }

/*------------------
  RENDERING
------------------*/

  render(){
    return (
      <div className="App">
        <Navbar
          toHome={ this.toHome }
          toLogIn={ this.toLogIn }
          toRegister={ this.toRegister }
          toBestsellers={ this.toBestsellers }
          toBooklist={ this.toBooklist }
        />
        { this.state.navHome ? <Home /> : '' }
        { this.state.navLogIn ? <LogIn /> : '' }
        { this.state.navRegister ? <Register /> : '' }
        { this.state.navBestsellers ? <Bestseller /> : '' }
        { this.state.navBooklist ? <Booklist /> : '' }
      </div>
    );
  }
}

export default App;
