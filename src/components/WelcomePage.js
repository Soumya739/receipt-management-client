import React, { Component } from 'react'
import Signup from '../containers/Signup'
import Login from '../containers/Login'
import { Button, Icon } from 'semantic-ui-react'


export class WelcomePage extends Component {
    constructor() {
        super()
        this.state = {
            showSignup: false,
            showLogin: false
        }
    }
    showSignup = () => {
        this.setState({ showSignup: true })
    }
    showLogin = () => {
        this.setState({ showLogin: true })
    }
    closeSignup = () => {
        this.setState({ showSignup: false })
    }
    closeLogin = () => {
        this.setState({ showLogin: false })
    }
    render() {
        return (
            <div>
                <h1 style={{ color: "black" }}><strong>Welcome to Receipt Management App</strong></h1>
                <br></br>
                <Button color={"blue"} onClick={this.showSignup}><Icon name='add user' />SignUP</Button>    <Button color={"blue"} onClick={this.showLogin}><Icon name='sign in' />Login</Button>
                <Signup dimmer={true} close={this.closeSignup} open={this.state.showSignup} size={"small"} />
                <Login dimmer={true} close={this.closeLogin} open={this.state.showLogin} size={"tiny"} />
            </div>
        )
    }
}

export default WelcomePage
