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

let baseURL = 'http://localhost:3003', bookmarks = '/bookmarks', users = '/users', sessions = '/sessions';

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
  
      userList: [],
      user_id: '',
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
      apiKey: process.env.REACT_APP_API_KEY || 'Bnbbb1JMRcU4yMb1rxevxLLGPEsyJOjA',
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
      book_id: '',
      title: "",
      author: "",
      image: '',
      publisher: '',
      summary: '',
      readingStatus: 'Not Started',
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

    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);

    this.getUserlist = this.getUserlist.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogIn = this.handleLogIn.bind(this);

    this.getBestsellers = this.getBestsellers.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.showBookDetails = this.showBookDetails.bind(this);
    this.clearBookDetails = this.clearBookDetails.bind(this);
    this.addNYToBooklist = this.addNYToBooklist.bind(this);

    this.getBooklist = this.getBooklist.bind(this);
    this.addBook = this.addBook.bind(this);
    this.editBook = this.editBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.toLogOut = this.toLogOut.bind(this);
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

    fetch(baseURL + sessions, {
      method: "DELETE",
    })
    .then((res)=>{
      this.setState({
        loggedInUser: '',
        user_id: '',
        booksArray: [],
        navHome: true,
        navLogIn: false,
        navRegister: false,  
        navBestsellers: false,
        navBooklist: false,
        navNewBookForm: false,
        navEditBook: false,
      })
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
    this.getBooklist()
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
      readingStatus: 'Not Started',
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
      book_id: obj._id,
      title: obj.title,
      author: obj.author,
      summary: obj.summary,
      publisher: obj.publisher,
      image: obj.image,
      readingStatus: obj.readingStatus,
      notes: obj.notes,
    })
  }

  /*------------------
    USER FUNCTION
  ------------------*/

  getUserlist(){
    fetch(baseURL + users)
    .then(data=>data.json(),err=>console.log(err.message))
    .then(parsedData=>{
      this.setState({ userList: parsedData })
    })
  }

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

    fetch(baseURL + users, {
      method: "POST",
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { "Content-Type":"application/json" }
    })
    .then(res=>res.json())
    .then(resJson=>{
      const userCredentials = {
        _id: resJson._id,
        email: resJson.email,
        username: resJson.username,
        password: resJson.password,
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
    })
  }

  handleLogIn(e){
    e.preventDefault();

    fetch(baseURL + sessions, {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: { "Content-Type":"application/json" }
    })
    .then(()=>{

      let findIndex = this.state.userList.findIndex(userDetails => userDetails.username===this.state.username);
      let newUserId = this.state.userList[findIndex]._id;

      this.setState({
        user_id: newUserId,
        navLogIn: false,
        navHome: true,
        newRegister: false,
        loggedInUser: this.state.username,
        logInError: false,
        userAlreadyExist: false,
      });      
    })
    .catch((error)=> console.log(error))

    setTimeout(()=>{
      if(!this.state.loggedInUser){
        this.setState({logInError: true})
      }
    },500)

  } 

  displayError(e){
    e.preventDefault();
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

  handleChangeSelect(e){
    this.setState({ readingStatus: e.target.value })
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

  addNYToBooklist(){
    this.setState({
      navBestsellers: false,
      navBooklist:true,
      navNewBookForm:true,
      title: this.state.NYTitle,
      author: this.state.NYAuthor,
      image: this.state.NYImage,
      publisher: this.state.NYPublisher,
      summary: this.state.NYSummary,
      readingStatus: 'Not Started',
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
    fetch(baseURL + bookmarks + '/' + this.state.user_id)
    .then(data=> {
      return data.json()
    },err=>console.log(err.message)
    )
    .then((parsedData)=>this.setState({ booksArray: parsedData}),err=>console.log(err.message)
    )
  }

  addBook(e){
    e.preventDefault();

    fetch(baseURL + bookmarks, {
      method: 'POST',
      body: JSON.stringify({
        userID: this.state.user_id,
        title: this.state.title,
        author: this.state.author,
        image: this.state.image,
        publisher: this.state.publisher,
        summary: this.state.summary,
        readingStatus: this.state.readingStatus,
        notes: this.state.notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res)=> res.json())
    .then((resJson)=>{
      const bookData = {
        _id: resJson._id,
        userID: resJson.user_id,
        title: resJson.title,
        author: resJson.author,
        image: resJson.image,
        publisher: resJson.publisher,
        summary: resJson.summary,
        readingStatus: resJson.readingStatus,
        notes: resJson.notes,
      }
      this.state.booksArray.push(bookData);

      this.setState({
        title: '',
        author: '',
        image: '',
        publisher: '',
        summary: '',
        readingStatus: 'Not Started',
        notes: '',
      })
    })
  }

  editBook(e){
    e.preventDefault();

    fetch(baseURL + bookmarks + '/' + this.state.book_id, {
      method: 'PUT',
      body: JSON.stringify({
        userID: this.state.user_id,
        title: this.state.title,
        author: this.state.author,
        image: this.state.image,
        publisher: this.state.publisher,
        summary: this.state.summary,
        readingStatus: this.state.readingStatus,
        notes: this.state.notes,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(res=>res.json())
    .then(resJson=>{
      const updatedBookData = {
        title: resJson.title,
        author: resJson.author,
        image: resJson.image,
        publisher: resJson.publisher,
        summary: resJson.summary,
        readingStatus: resJson.readingStatus,
        notes: resJson.notes,
      }
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
    })
  }

  deleteBook(id){
    fetch(baseURL + bookmarks + '/' + id, {
      method: "DELETE",
    })
    .then(res=>{
      const findIndex = this.state.booksArray.findIndex(book=>book._id===id)
      const updatedBooksArray = [...this.state.booksArray];
      updatedBooksArray.splice(findIndex,1)
      this.setState({
        booksArray: updatedBooksArray,
        navNewBookForm: false,
        navEditBook: false,
      })
    })
  }

/*------------------
  COMPONENT MOUNT
------------------*/

  componentDidMount(){

    this.getUserlist();
    this.toLogOut();
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
            loggedInUser={this.state.loggedInUser}
            bestsellerList={this.state.bestsellerList}
            date={this.state.date}
            NYImage={this.state.NYImage}
            NYTitle={this.state.NYTitle}
            NYAuthor={this.state.NYAuthor}
            NYPublisher={this.state.NYPublisher}
            NYSummary={this.state.NYSummary}
          /> : '' }

          { ((this.state.navBooklist) && (this.state.loggedInUser)) ? <Booklist
            toNewBookForm={this.toNewBookForm}
            toEditBook={this.toEditBook}
            deleteBook={this.deleteBook}
            loggedInUser={this.state.loggedInUser}
            booksArray={this.state.booksArray}
          /> : '' }

          { this.state.navNewBookForm ? <NewBookForm
            handleChange={this.handleChange}
            handleChangeSelect={this.handleChangeSelect}
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
            handleChangeSelect={this.handleChangeSelect}
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
