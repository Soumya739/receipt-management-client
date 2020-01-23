import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'
import { api } from '../services/api'
import { Card, Icon, Image, Segment } from 'semantic-ui-react'
import girl from '../images/girl.jpg'
import b2 from '../images/b2.jpg'

const boy = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

export class Profile extends Component {
    constructor() {
        super();
        this.state = {
            editTrigger: false,
            current_user: {}
        }
    }

    componentDidMount() {
        api.user.getCurrentUser()
            .then(res => this.setState({ current_user: res }))
    }

    handleEditTrigger = () => {
        this.setState({ editTrigger: !this.state.editTrigger })
    }

    render() {
        let { username, email, city, country, contact_num, state, gender } = this.state.current_user
        // if (this.state.editTrigger) {
        //     return <EditProfile onhandleEditTrigger={this.handleEditTrigger} />
        // } else {
        return (
            <div >
                <Segment id="profile">
                    <Card>
                        <Image src={gender === 'female' ? girl : boy} wrapped ui={false} />
                        <Card.Content>
                            <Card.Header><Icon name='user' />{username}</Card.Header>
                            <Card.Description>
                                <h5><Icon name='mail' />{email}</h5>
                                <h5><Icon name='phone square' />{contact_num}</h5>
                            </Card.Description>
                            <Card.Meta>
                                <h6><Icon name='point' />{city}</h6>
                                <h6><Icon name='point' />{state}</h6>
                                <h6><Icon name='point' />{country}</h6>
                            </Card.Meta>
                        </Card.Content>
                        <Card.Content extra>
                            <NavLink to='/edit_profile'><Button><Icon name='edit' />Edit Profile</Button></NavLink>
                        </Card.Content>
                    </Card>
                </Segment>
            </div>
        )
    }
    // }
}

export default Profile
