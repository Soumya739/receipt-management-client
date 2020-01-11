import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Timeline from './Timeline'
import Photo from './Photo'
import Profile from './Profile'


export class MainContainer extends Component {
    render() {
        return (
            <Router>
                <Route exact path="/home" render={() => <Home />} />
                <Route exact path="/photos" render={() => <Photo />} />
                <Route exact path="/timeline" render={() => <Timeline />} />
                <Route exact path="/profile" render={() => <Profile />} />
            </Router>
        )
    }
}

export default MainContainer
