import React, { Component } from 'react';
import { Form, Icon, Button } from 'semantic-ui-react'

export class AddTextField extends Component {
    constructor() {
        super()
        this.state = {
            expense_type: [],
            tag: ""
        }
    }

    handleFormInput = (e) => {
        this.setState({ tag: e.target.value })
    }

    handleAddExpenseType = () => {
        if (this.state.tag !== "") {
            this.setState({ expense_type: [...this.state.expense_type, this.state.tag], tag: "" }, () => this.props.onAdditionToExpenseType(this.state.expense_type))
        }
    }

    render() {
        let { expense_type } = this.state
        return (
            <>
                <Form.Field>
                    <label><Icon name='tags' />Add Expense Type:</label>
                    {expense_type.length !== 0 ? <p>Added: {expense_type.map((tag, index) => <li key={index}>{tag}</li>)}</p> : null}
                    <input placeholder='Expense Type' id="expense_type" onChange={(e) => this.handleFormInput(e)} value={this.state.tag} />
                </Form.Field>
                <Button positive type="reset" onClick={this.handleAddExpenseType}>Add</Button>
            </>
        )
    }
}

export default AddTextField
