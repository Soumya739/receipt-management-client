import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { api } from '../services/api'
import { connect } from 'react-redux';
import { login } from '../actions/login';
// import { Redirect } from 'react-router-dom';

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

    handleFormSubmittion = (e) => {
        e.preventDefault()
        api.auth.Login(this.state.fields)
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
        let { email } = this.state.fields
        return (
            <div>
                <Modal trigger={<Button>Login</Button>}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form onSubmit={(e) => this.handleFormSubmittion(e)}>
                                <Form.Field>
                                    <label>Email:</label>
                                    <input placeholder='name@example.com' id="email" value={email} onChange={(e) => this.handleFormInput(e)} required />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password:</label>
                                    <input placeholder='Password' id="password" type="password" onChange={(e) => this.handleFormInput(e)} required />
                                </Form.Field>
                                <Button.Group>
                                    <Button negative onClick={this.handleTrigger}>Cancel</Button>
                                    <Button.Or />
                                    <Button positive type="submit">Login</Button>
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

export default connect(null, mapDispatchToProps)(Login)


