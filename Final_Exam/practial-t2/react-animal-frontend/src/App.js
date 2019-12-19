import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {

  state = {
    animals: ''
  }

  componentDidMount() {
    
    axios.get('http://localhost3001/api')
    
  }



  render() {
    


    return (
      <div className="App">
   
      </div>
    );
  }
}

export default App;
