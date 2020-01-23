import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'semantic-ui-react'

export class Footer extends Component {
    state = { activeItem: '' }
    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state
        return (
            <Menu.Menu >
                <Menu color={"blue"} pointing icon='labeled' fixed={"bottom"} widths={8} inverted>
                    <Menu.Item
                        position={"left"}
                        as={Link} to='/about'
                        name='About'
                        active={activeItem === 'About'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='info' />
                        About
                    </Menu.Item>
                    <Menu.Item
                        as={Link} to='/contact'
                        name='Contact'
                        active={activeItem === 'Contact'}
                        onClick={this.handleItemClick}
                    >
                        <Icon name='mail' />
                        Contact
                    </Menu.Item>
                </Menu>
            </Menu.Menu>
        )
    }
}

export default Footer
