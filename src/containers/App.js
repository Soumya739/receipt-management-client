import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import WelcomePage from '../components/WelcomePage'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Timeline from './Timeline'
import Photo from './Photo'
import Profile from './Profile'


export class App extends Component {
  componentDidMount() {
    localStorage.removeItem('token')
  }
  render() {
    console.log(this.props.userExists, this.props.current_user)
    if (this.props.userExists && localStorage.getItem('token')) {
      return (
        <div>
          <Router>
            <Navbar />
            <Route exact path="/home" render={() => <Home />} />
            <Route exact path="/photos" render={() => <Photo />} />
            <Route exact path="/timeline" render={() => <Timeline />} />
            <Route exact path="/profile" render={() => <Profile />} />
            <Footer />
          </Router>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Welcome</h1>
          <Router>
            <WelcomePage />
          </Router>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userExists: state.userExists,
    current_user: state.current_user
  }
}

export default connect(mapStateToProps, null)(App)
