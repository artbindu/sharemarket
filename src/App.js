import './App.css';
import React, { Component } from 'react';
import {
  // Link used in Navbar.js
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import Charges from './components/Charges';
import About from './components/About';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Router>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Charges />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </Router>
      </>
    )
  }
}

