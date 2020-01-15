import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import EditProfile from './EditProfile'
import { Card, Icon, Image, Segment } from 'semantic-ui-react'
import girl from '../images/girl.jpg'

const boy = 'https://react.semantic-ui.com/images/avatar/large/matthew.png'

export class Profile extends Component {
    constructor() {
        super();
        this.state = {
            editTrigger: false
        }
    }

    handleEditTrigger = () => {
        this.setState({ editTrigger: !this.state.editTrigger })
    }

    render() {
        let { username, email, city, country, contact_num, state, gender } = this.props.current_user
        if (this.state.editTrigger) {
            return <EditProfile currentUser={this.props.current_user} onhandleEditTrigger={this.handleEditTrigger} />
        } else {
            return (
                <Segment className="centered">
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
                            <Button onClick={this.handleEditTrigger}><Icon name='edit' />Edit Profile</Button>
                        </Card.Content>
                    </Card>
                </Segment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        current_user: state.current_user,
    }
}

export default connect(mapStateToProps, null)(Profile)
