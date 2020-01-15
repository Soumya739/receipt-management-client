import React, { Component } from 'react';
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logout } from '../actions/login';
import { Menu, Icon } from 'semantic-ui-react'
class Navbar extends Component {
    state = { activeItem: 'home' }

    onLogout = () => {
        this.props.logout()
        window.location.replace("http://localhost:3001/")
    }

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (

            <Menu.Menu >
                <Menu pointing icon='labeled'>
                    <NavLink to="/home"><Menu.Item
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='home' />
                        Home
                    </Menu.Item></NavLink>
                    <NavLink to="/photos"><Menu.Item
                        name='Photos'
                        active={activeItem === 'Photos'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='images' />
                        Photos
                    </Menu.Item></NavLink>
                    <NavLink to="/timeline"><Menu.Item
                        name='Timeline'
                        active={activeItem === 'Timeline'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='history' />
                        Timeline
                    </Menu.Item></NavLink>
                    <NavLink to="/profile"><Menu.Item
                        name='Profile'
                        active={activeItem === 'Profile'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='user' />
                        Profile
                    </Menu.Item></NavLink>
                    <Menu.Item
                        name='Logout'
                        active={activeItem === 'Logout'}
                        onClick={this.onLogout}
                    >
                        <Icon name='log out' />
                        Logout
                    </Menu.Item>
                </Menu>
            </Menu.Menu>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: (user) => dispatch(logout(user)),
    }
}

export default connect(null, mapDispatchToProps)(Navbar)