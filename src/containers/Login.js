import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'
import { api } from '../services/api'



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
                                    <Button negative >Cancel</Button>
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

export default Login


