import React, { Component } from 'react';
import ViewImg from './component/viewimg'
import Control from './component/control'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="containerPizza">
        <ViewImg ></ViewImg>
        <Control ></Control>
      </div>
    );
  }

}

export default App
