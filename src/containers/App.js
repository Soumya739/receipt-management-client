import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../App.css';
import WelcomePage from '../components/WelcomePage'
import Navbar from '../components/Navbar';
import MainContainer from './MainContainer';
import Footer from '../components/Footer'

export class App extends Component {
  componentDidMount() {
    localStorage.removeItem('token')
  }
  render() {
    if (this.props.userExists && localStorage.getItem('token')) {
      return (
        <div>
          <Navbar />
          <MainContainer />
          <Footer />
        </div>
      )
    } else {
      return (
        <div>
          <h1>Welcome</h1>
          <WelcomePage />
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    userExists: state.userExists
  }
}

export default connect(mapStateToProps, null)(App)
