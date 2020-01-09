import React, { Component } from 'react'
import Signup from '../containers/Signup'
import Login from '../containers/Login'
// import {NavLink} from 'react-router-dom'

export class WelcomePage extends Component {
    render() {
        return (
            <div>
                <Signup />
                <Login />
            </div>
        )
    }
}

export default WelcomePage
