import React, { Component } from 'react'
import { Button, Modal, Checkbox, Form } from 'semantic-ui-react'
import { connect } from 'react-redux';
import { api } from '../services/api';
import { login } from '../actions/login';

export class Signup extends Component {
    constructor() {
        super();
        this.state = {
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

    handleFormInput = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        api.user.CreateUser(this.state)
            .then(res => {
                if (!!res.user) {
                    this.props.login(res)
                }
            })
    }
    handleTrigger = () => {
        // code to trigger 
    }
    render() {
        let { username, email, contact_num, city, country, state, password, password_confirmation } = this.state
        return (
            <div>
                <Modal trigger={<Button>Signup</Button>}>
                    <Modal.Header>Signup</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                                <Form.Field>
                                    <label>Username:</label>
                                    <input placeholder='Username' id="username" value={username} onChange={(e) => this.handleFormInput(e)} required />
                                </Form.Field>
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
                                    <Button negative onClick={this.handleTrigger}>Cancel</Button>
                                    <Button.Or />
                                    <Button positive type="submit">Signup</Button>
                                </Button.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user)),
    }
}

export default connect(null, mapDispatchToProps)(Signup)

