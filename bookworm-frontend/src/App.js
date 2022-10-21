import React, { Component } from 'react';
import Navbar from './components/Navbar';

class App extends Component {

  constructor(prop){
    super(prop);
    this.state = {

    }
  }
  
  render(){
    return (
      <div className="App">
        <Navbar />
        <h1>This is the main page</h1>
      </div>
    );
  }
}

export default App;
