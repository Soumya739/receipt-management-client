import React, { Component } from 'react';
import { Link } from 'react-router-dom'
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
                <Menu color={"blue"} pointing icon='labeled' fixed={"top"} widths={9} inverted>
                    <Menu.Item
                        as={Link} to='/home'
                        name='Home'
                        active={activeItem === 'Home'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='home' />
                        Home
                    </Menu.Item>
                    <Menu.Item
                        as={Link} to='/photos'
                        name='Photos'
                        active={activeItem === 'Photos'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='images' />
                        Photos
                    </Menu.Item>
                    <Menu.Item
                        as={Link} to='/timeline'
                        name='Timeline'
                        active={activeItem === 'Timeline'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='history' />
                        Timeline
                    </Menu.Item>
                    <Menu.Item
                        as={Link} to='/profile'
                        name='Profile'
                        active={activeItem === 'Profile'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='user' />
                        Profile
                    </Menu.Item>
                    <Menu.Item
                        position={"right"}
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