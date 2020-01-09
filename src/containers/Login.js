import React, { Component } from 'react'
import { Button, Modal, Form } from 'semantic-ui-react'


export class Login extends Component {
    render() {
        return (
            <div>
                <Modal trigger={<Button>Login</Button>}>
                    <Modal.Header>Login</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    <label>Email:</label>
                                    <input placeholder='Email' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password:</label>
                                    <input placeholder='Password' type="password" />
                                </Form.Field>
                                <Button.Group>
                                    <Button negative>Cancel</Button>
                                    <Button.Or />
                                    <Button positive>Login</Button>
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


