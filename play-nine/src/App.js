import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import Game from './Game';
import Clock from './Clock'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
        <Clock />
      </div>
    );
  }
}

export default App;
