import React, { Component } from 'react';
import '../App.css';
import WelcomePage from '../components/WelcomePage'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Timeline from './Timeline'
import Photo from './Photo'
import Profile from './Profile'
import EditProfile from './EditProfile'
import { Segment } from 'semantic-ui-react'


export class App extends Component {
  render() {
    if (localStorage.getItem('token')) {
      return (
        <Segment>
          <Router>
            <Navbar />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/photos" render={() => <Photo />} />
            <Route exact path="/timeline" render={() => <Timeline />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Route exact path="/edit_profile" render={() => <EditProfile />} />
          </Router>
        </Segment>
      )
    } else {
      return (
        <div id="welcome-page">
          <Router>
            <WelcomePage />
            <Footer />
          </Router>
        </div>
      )
    }
  }
}


export default App
