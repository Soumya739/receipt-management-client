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
    showSignup = (size) => () => this.setState({ size, showSignup: true })
    showLogin = (size) => () => this.setState({ size, showLogin: true })
    closeSignup = () => this.setState({ showSignup: false })
    closeLogin = () => this.setState({ showLogin: false })
    render() {
        return (
            <div>
                <h1>Welcome</h1>
                <Button onClick={this.showSignup('small')}><Icon name='add user' />SignUP</Button>
                <Button onClick={this.showLogin("tiny")}><Icon name='sign in' />Login</Button>
                <Signup dimmer={true} close={this.closeSignup} open={this.state.showSignup} size={"small"} />
                <Login dimmer={true} close={this.closeLogin} open={this.state.showLogin} size={"tiny"} />
            </div>
        )
    }
}

export default WelcomePage
