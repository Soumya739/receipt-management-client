import React, { Component } from 'react';
import { Button } from 'semantic-ui-react'
import { connect } from 'react-redux';
import EditProfile from './EditProfile'

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
        console.log(this.props.current_user)
        let { username, email, city, country, contact_num, state } = this.props.current_user
        if (this.state.editTrigger) {
            return <EditProfile currentUser={this.props.current_user} onhandleEditTrigger={this.handleEditTrigger} />
        } else {
            return (
                <div>
                    <h1>Username: {username}</h1>
                    <h2>Email: {email}</h2>
                    <h2>Phone: {contact_num}</h2>
                    <h2>City:{city}</h2>
                    <h2>State:{state}</h2>
                    <h2>Country:{country}</h2>
                    <Button onClick={this.handleEditTrigger}>Edit Profile</Button>
                </div>
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
