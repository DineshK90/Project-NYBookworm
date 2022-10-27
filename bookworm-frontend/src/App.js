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

let baseURL = 'http://localhost:3003', bookmarks = '/bookmarks', users = '/users';

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
      navNewBookForm: false,
      navEditBook: false,

      //--- User Data
      ﻿
      userList: [],
      email:  '',
      username: '',
      password: '',
      confirmPassword: '',
      errorMessage: false,
      userAlreadyExist: false,
      logInError: false,
      loggedInUser: '',
      newRegister: false,

      //--- NY Times API
      bestsellerURL: 'https://api.nytimes.com/svc/books/v3/lists/',
      currentDate: 'current',
      date: '',
      hardcover: '/hardcover-fiction.json?api-key=',
      apiKey: 'Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
      listingURL: '',
      bestsellerList: '',

      //--- NYTimes Book API Data
      NYImage: '',
      NYTitle: '',
      NYAuthor: '',
      NYPublisher: '',
      NYSummary: '',

      //--- Booklist Book Data
      booksArray: [],
      index: '',
      title: "",
      author: "",
      image: '',
      publisher: '',
      summary: '',
      readingStatus: "",
      notes: '',
    }


    this.toHome = this.toHome.bind(this)
    this.toLogIn = this.toLogIn.bind(this);
    this.toRegister = this.toRegister.bind(this);
    this.displayError = this.displayError.bind(this)
    this.toBestsellers = this.toBestsellers.bind(this);
    this.toBooklist = this.toBooklist.bind(this);
    this.toNewBookForm = this.toNewBookForm.bind(this);
    this.toEditBook = this.toEditBook.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);
    this.getBestsellers = this.getBestsellers.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showBookDetails = this.showBookDetails.bind(this);
    this.clearBookDetails = this.clearBookDetails.bind(this);
    this.addNYToBooklist = this.addNYToBooklist.bind(this);
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.toLogOut = this.toLogOut.bind(this);

    this.getBooklist = this.getBooklist.bind(this);
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
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toLogIn(){
    this.setState({
      navHome: false,
      navLogIn: true,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toLogOut(){
    this.setState({
      loggedInUser: '',
      navHome: true,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: false,
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toRegister(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: true,  
      navBestsellers: false,
      navBooklist: false,
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toBestsellers(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: true,
      navBooklist: false,
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toBooklist(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navBooklist: true,
      navNewBookForm: false,
      navEditBook: false,
    })
  }

  toNewBookForm(){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navNewBookForm: true,
      navEditBook: false,
      index: '',
      title: "",
      author: "",
      image: '',
      publisher: '',
      readingStatus: "",
      notes: '',
    })
  }

  toEditBook(obj,index){
    this.setState({
      navHome: false,
      navLogIn: false,
      navRegister: false,  
      navBestsellers: false,
      navNewBookForm: false,
      navEditBook: true,
      index: index,
      title: obj.title,
      author: obj.author,
      publisher: obj.publisher,
      image: obj.image,
      readingStatus: obj.readingStatus,
      notes: obj.notes,
    })
  }

  /*------------------
    USER FUNCTION
  ------------------*/

  handleRegister(e){
    e.preventDefault();

    let alreadyExist = false;

    this.state.userList.map(userDetails=>{
      if(userDetails.username===this.state.username){
        this.setState({userAlreadyExist: true});
        alreadyExist = true;
      }
    })

    if(alreadyExist){
      return;
    }

    console.log(`Registration successful!`)
    const userCredentials = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
    }

    this.state.userList.push(userCredentials);
    this.setState({
      navRegister: false,
      navLogIn: true,
      errorMessage: false,
      newRegister: true,
      logInError: false,
      userAlreadyExist: false,
    })
    console.log(this.state.userList)
  }

  handleLogIn(e){
    e.preventDefault();

    this.setState({logInError: true})

    this.state.userList.map(userDetails=>{
      if((userDetails.username===this.state.username)&&(userDetails.password===this.state.password)){
        console.log('Logged In');
        this.setState({
          navLogIn: false,
          navHome: true,
          newRegister: false,
          loggedInUser: this.state.username,
          logInError: false,
          userAlreadyExist: false,
        });
      }
    })
  } 

  displayError(e){
    e.preventDefault();
    console.log('Display Error functioning correctly!')
    this.setState({
      errorMessage: true,
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
      listingURL: this.state.bestsellerURL + this.state.currentDate + this.state.hardcover + this.state.apiKey,
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
      listingURL: this.state.bestsellerURL + this.state.date + this.state.hardcover + this.state.apiKey,
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
      NYImage: obj.book_image,
      NYTitle: obj.title,
      NYAuthor: obj.author,
      NYPublisher: obj.publisher,
      NYSummary: obj.description
    })
  }

  addNYToBooklist(obj){
    this.setState({
      navBestsellers: false,
      navBooklist:true,
      navNewBookForm:true,
      title: this.state.NYTitle,
      author: this.state.NYAuthor,
      image: this.state.NYImage,
      publisher: this.state.NYPublisher,
      summary: this.state.NYSummary,
      readingStatus: '',
      notes: '',
    })
  }

  clearBookDetails(){
    this.setState({
      NYImage: '',
      NYTitle: '',
      NYAuthor: '',
      NYPublisher: '',
      NYSummary: ''
    })
  }
  
  /*------------------
    BOOKLIST FUNCTION
  ------------------*/


  getBooklist(){
    fetch(baseURL + bookmarks)
    .then(data=> {
      return data.json()
    },err=>console.log(err.message)
    )
    .then((parsedData)=>this.setState({ booksArray: parsedData}),err=>console.log(err.message)
    )
  }

  componentDidMount(){
    this.getBooklist();
  }

  addBook(e){
    e.preventDefault();
    const bookData = {
      title: this.state.title,
      author: this.state.author,
      image: this.state.image,
      publisher: this.state.publisher,
      summary: this.state.summary,
      readingStatus: this.state.readingStatus,
      notes: this.state.notes,
    }

    this.state.booksArray.push(bookData);
    console.log(this.state.booksArray);
    this.setState({
      title: '',
      author: '',
      image: '',
      publisher: '',
      summary: '',
      readingStatus: '',
      notes: '',
    })
  }

  editBook(e){
    e.preventDefault();
    const updatedBookData = {
      title: this.state.title,
      author: this.state.author,
      image: this.state.image,
      publisher: this.state.publisher,
      summary: this.state.summary,
      readingStatus: this.state.readingStatus,
      notes: this.state.notes,
    }
    // this.state.booksArray[this.state.index] = updatedBookData
    let updatedBooksArray = this.state.booksArray;
    updatedBooksArray.splice(this.state.index,1,updatedBookData)
    this.setState({
      booksArray: updatedBooksArray,
      title: this.state.title,
      author: this.state.author,
      image: this.state.image,
      publisher: this.state.publisher,
      summary: this.state.summary,
      readingStatus: this.state.readingStatus,
      notes: this.state.notes,
    })
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
            toLogOut={ this.toLogOut }
            toRegister={ this.toRegister }
            toBestsellers={ this.toBestsellers }
            toBooklist={ this.toBooklist }
            loggedInUser={ this.state.loggedInUser }
          />

          { this.state.navHome ? <Home /> : '' }
          { this.state.navLogIn ? <LogIn
            handleChange={this.handleChange}
            handleLogIn={this.handleLogIn}
            newRegister={this.state.newRegister}
            logInError={this.state.logInError}
          /> : '' }
          
          { this.state.navRegister ? <Register
            handleChange={this.handleChange}
            handleRegister={this.handleRegister}
            displayError={this.displayError}
            password={this.state.password}
            confirmPassword={this.state.confirmPassword}
            errorMessage={this.state.errorMessage}
            userAlreadyExist={this.state.userAlreadyExist}

          /> : '' }

          { this.state.navBestsellers ? <Bestseller
            getBestsellers={this.getBestsellers}
            searchBook={this.searchBook}
            handleChange={this.handleChange}
            showBookDetails={this.showBookDetails}
            clearBookDetails={this.clearBookDetails}
            addNYToBooklist={this.addNYToBooklist}
            bestsellerList={this.state.bestsellerList}
            date={this.state.date}
            NYImage={this.state.NYImage}
            NYTitle={this.state.NYTitle}
            NYAuthor={this.state.NYAuthor}
            NYPublisher={this.state.NYPublisher}
            NYSummary={this.state.NYSummary}
          /> : '' }

          { this.state.navBooklist ? <Booklist
            toNewBookForm={this.toNewBookForm}
            toEditBook={this.toEditBook}
            booksArray={this.state.booksArray}
          /> : '' }

          { this.state.navNewBookForm ? <NewBookForm
            handleChange={this.handleChange}
            addBook={this.addBook}
            title={this.state.title}
            author={this.state.author}
            image={this.state.image}
            publisher={this.state.publisher}
            summary={this.state.summary}
            readingStatus={this.state.readingStatus}
            notes={this.state.notes}
          /> : '' }

          { this.state.navEditBook ? <EditBook
            handleChange={this.handleChange}
            editBook={this.editBook}
            title={this.state.title}
            author={this.state.author}
            image={this.state.image}
            publisher={this.state.publisher}
            summary={this.state.summary}
            readingStatus={this.state.readingStatus}
            notes={this.state.notes}
          /> : '' }

        </div>

        <Footer />
      </div>
    );
  }
}

export default App;
