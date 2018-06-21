import { Component } from 'preact';

import NavBar from '../NavBar';
import Gallery from '../Gallery';

import './App.scss';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <NavBar />
        <Gallery />
      </div>
    );
  }
}
