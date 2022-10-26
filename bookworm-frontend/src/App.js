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
import NewBookForm from './components/NewBookForm';
import EditBook from './components/EditBook';
import Footer from './components/Footer';


class App extends Component {

/*------------------
  CONSTRUCTOR
------------------*/

  constructor(props){
    super(props);
    this.state = {

      //--- Nav
      navHome: true,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,

      //--- User Data
      userList: [],
      email:  '',
      username: '',
      password: '',      

      //--- NY Times API
      bestsellerURL: 'https://api.nytimes.com/svc/books/v3/lists/',
      currentDate: 'current',
      date: '',
      apiKey: '/hardcover-fiction.json?api-key=Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
      listingURL: '',
      bestsellerList: '',

      //--- NYTimes Book API Data
      bookImage: '',
      bookTitle: '',
      bookAuthor: '',
      bookPublisher: '',
      bookSummary: '',
    }


    this.toHome = this.toHome.bind(this)
    this.toLogIn = this.toLogIn.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.toBestsellers = this.toBestsellers.bind(this);
    this.toBooklist = this.toBooklist.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.getBestsellers = this.getBestsellers.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showBookDetails = this.showBookDetails.bind(this);
    this.clearBookDetails = this.clearBookDetails.bind(this);
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
    HANDLE CHANGE FUNCTION
  ------------------*/

  handleChange(e){
    this.setState({ [e.target.id]: e.target.value })
  }

  /*------------------
    API FUNCTION
  ------------------*/

  getBestsellers(e){
    e.preventDefault();
    this.setState({
      listingURL: this.state.bestsellerURL + this.state.currentDate + this.state.apiKey,
    },()=>{
      fetch(this.state.listingURL)
      .then((res) => {
        return res.json();
      })
      .then((json) => this.setState({ bestsellerList: json }))
    })
  }

  searchBook(e){
    e.preventDefault();
    this.setState({
      listingURL: this.state.bestsellerURL + this.state.date + this.state.apiKey,
    },()=>{
      fetch(this.state.listingURL)
      .then((res) => {
        return res.json();
      })
      .then((json) => this.setState({ bestsellerList: json }))
    })
  }

  showBookDetails(obj){
    this.setState({
      bookImage: obj.book_image,
      bookTitle: obj.title,
      bookAuthor: obj.author,
      bookPublisher: obj.publisher,
      bookSummary: obj.description
    })
  }

  clearBookDetails(){
    this.setState({
      bookImage: '',
      bookTitle: '',
      bookAuthor: '',
      bookPublisher: '',
      bookSummary: ''
    })
  }

  /*------------------
    USER FUNCTION
  ------------------*/

  handleRegister(e){
    e.preventDefault();
    console.log(`Registered`)
    const userCredentials = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }

    this.state.userList.push(userCredentials);
    console.log(this.state.userList)
  }

  handleLogIn(e){
    e.preventDefault();
    console.log(`Logged In`)
  } 
  
/*------------------
  RENDERING
------------------*/

  render(){
    return (
      <div className="App">
        <div className="allButFooter">
          <Navbar
            toHome={ this.toHome }
            toLogIn={ this.toLogIn }
            toRegister={ this.toRegister }
            toBestsellers={ this.toBestsellers }
            toBooklist={ this.toBooklist }
          />

          { this.state.navHome ? <Home /> : '' }
          { this.state.navLogIn ? <LogIn handleChange={this.handleChange} handleLogIn={this.handleLogIn} /> : '' }
          { this.state.navRegister ? <Register handleChange={this.handleChange} handleRegister={this.handleRegister} /> : '' }

          { this.state.navBestsellers ? <Bestseller
            getBestsellers={this.getBestsellers}
            searchBook={this.searchBook}
            handleChange={this.handleChange}
            showBookDetails={this.showBookDetails}
            clearBookDetails={this.clearBookDetails}
            bestsellerList={this.state.bestsellerList}
            date={this.state.date}
            bookImage={this.state.bookImage}
            bookTitle={this.state.bookTitle}
            bookAuthor={this.state.bookAuthor}
            bookPublisher={this.state.bookPublisher}
            bookSummary={this.state.bookSummary}
          /> : '' }
          { this.state.navBooklist ? <Booklist /> : '' }
        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
