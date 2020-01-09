import React, { Component } from 'react'
import { Button, Modal, Checkbox, Form } from 'semantic-ui-react'


export class Signup extends Component {
    render() {
        return (
            <div>
                <Modal trigger={<Button>Signup</Button>}>
                    <Modal.Header>Signup</Modal.Header>
                    <Modal.Content image>
                        <Modal.Description>
                            <Form>
                                <Form.Field>
                                    <label>Username:</label>
                                    <input placeholder='Username' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Email:</label>
                                    <input placeholder='name@example.com' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Phone Number:</label>
                                    <input placeholder='(xxx)-xxx-xxxx' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Country:</label>
                                    <input placeholder='Select' />
                                </Form.Field>
                                <Form.Field>
                                    <label>State:</label>
                                    <input placeholder='Select' />
                                </Form.Field>
                                <Form.Field>
                                    <label>City:</label>
                                    <input placeholder='name@example.com' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password:</label>
                                    <input placeholder='Password' type='password' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Password Confirmation:</label>
                                    <input placeholder='Password' type='password' />
                                </Form.Field>
                                <Form.Field>
                                    <Checkbox label='I agree to the Terms and Conditions' />
                                </Form.Field>
                                <Button.Group>
                                    <Button negative>Cancel</Button>
                                    <Button.Or />
                                    <Button positive>Signup</Button>
                                </Button.Group>
                            </Form>
                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        )
    }
}

export default Signup

