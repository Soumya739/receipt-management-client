import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { api } from '../services/api'
import { connect } from 'react-redux';
import { login } from '../actions/login';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
    constructor() {
        super()
        this.state = {
            fields: {
                email: '',
                password: ''
            },
        }
    }
    handleFormInput = e => {
        const newFields = { ...this.state.fields, [e.target.id]: e.target.value };
        this.setState({ ...this.state, fields: newFields });
    };

    handleFormSubmission = () => {
        let { email, password } = this.state.fields
        if (email !== "" && password !== "") {
            api.auth.Login(this.state.fields)
                .then(res => {
                    if (!!res.error) {
                        return <Redirect to="/" />
                    } else if (!!res.user) {
                        this.props.login(res)
                    }
                })
        }
    }

    render() {
        let { open, close, size } = this.props
        let { email } = this.state.fields
        return (

            <Modal centered={true} size={size} open={open} onClose={this.close}>
                <Modal.Header>Login</Modal.Header>
                <Modal.Content >
                    <Form >
                        <Form.Field>
                            <label>Email:</label>
                            <input placeholder='name@example.com' id="email" value={email} onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                        <Form.Field>
                            <label>Password:</label>
                            <input placeholder='Password' id="password" type="password" onChange={(e) => this.handleFormInput(e)} required />
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button.Group>
                        <Button negative onClick={close}>Cancel</Button>
                        <Button.Or />
                        <Button positive onClick={this.handleFormSubmission}>Login</Button>
                    </Button.Group>
                </Modal.Actions>
            </Modal>

        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (user) => dispatch(login(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)


