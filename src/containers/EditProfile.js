import React, { Component } from 'react'
import { Button, Checkbox, Form, Dropdown, Segment } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { api } from '../services/api';
import { logout } from '../actions/login'
import { Redirect } from 'react-router-dom';

const options = [
    { key: 'm', text: 'Male', value: 'male' },
    { key: 'f', text: 'Female', value: 'female' },
    { key: 'o', text: 'Other', value: 'other' },
]

export class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formSubmitted: false,
            gender: "",
            username: "",
            email: "",
            contact_num: "",
            city: "",
            country: "",
            state: "",
            password: "",
            password_confirmation: ""
        }
    }

    componentDidMount() {
        api.user.getCurrentUser()
            .then(res => this.setState({
                id: res.id,
                gender: res.gender,
                username: res.username,
                email: res.email,
                contact_num: res.contact_num,
                city: res.city,
                country: res.country,
                state: res.state,
            }))
    }

    handleFormInput = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value })
    }

    handleGenderSelection = (e, { value }) => {
        this.setState({ gender: value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        api.user.UpdateCurrentUser(this.state)
            .then(res => {
                // console.log(res)
                if (!!res.user) {
                    this.setState({ formSubmitted: true })
                } else {
                    this.props.logout()
                }
            })
    }

    render() {
        let { username, email, contact_num, city, country, state, password, password_confirmation, gender, formSubmitted } = this.state
        if (formSubmitted) {
            return <Redirect to="/profile" />
        } else {
            return (
                <Segment id="edit-Profile">
                    Edit Profile
                <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                        <Form.Field>
                            <label>Username:</label>
                            <input placeholder='Username' id="username" value={username} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Dropdown placeholder='Gender' id="gender" value={gender} selection options={options} onChange={this.handleGenderSelection} />
                        <Form.Field>
                            <label>Email:</label>
                            <input placeholder='name@example.com' id="email" value={email} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>Phone Number:</label>
                            <input placeholder='(xxx)-xxx-xxxx' id="contact_num" value={contact_num} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>Country:</label>
                            <input placeholder='Country' id="country" value={country} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>State:</label>
                            <input placeholder='State' id="state" value={state} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>City:</label>
                            <input placeholder='City' id="city" value={city} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>Password:</label>
                            <input placeholder='Password' type='password' id="password" value={password} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>Password Confirmation:</label>
                            <input placeholder='Password' type='password' id="password_confirmation" value={password_confirmation} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button.Group>
                            <Button negative onClick={() => this.props.onhandleEditTrigger()}>Cancel</Button>
                            <Button.Or />
                            <Button positive type="submit">Submit</Button>
                        </Button.Group>
                    </Form>
                </Segment>
            )
        }
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null, mapDispatchToProps)(EditProfile)
