import React, { Component } from 'react'
import { Button, Form, Dropdown } from 'semantic-ui-react'
import { connect } from 'react-redux';
import axios from 'axios';

export class ReceiptDetailsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
            store: "",
            total_amount: 0,
            generated_on: "",
            user_id: this.props.current_user.id,
            expense_type: []
        }
    }

    handleFormInput = (e) => {
        this.setState({ ...this.state, [e.target.id]: e.target.value, image: this.props.image })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData(e.target)
        formdata.append('image', this.state.image)
        formdata.append('store', this.state.store)
        formdata.append('total_amount', this.state.total_amount)
        formdata.append('generated_on', this.state.generated_on)
        formdata.append('user_id', this.state.user_id)
        formdata.append('expense_type', this.state.expense_type)
        axios({
            method: 'post',
            url: 'http://localhost:3000/receipts',
            data: formdata,
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then(res => {
            if (!!res.user) {
                this.props.login(res)
            }
        })
    }
    onChangeselection = (e, { value }) => {
        this.setState({ ...this.state, expense_type: value })
    }

    options = () => {
        return (
            [
                { key: 'food', text: 'food', value: 'food' },
                { key: 'pharmacy', text: 'pharmacy', value: 'pharmacy' },
                { key: 'furniture', text: 'furniture', value: 'furniture' },
                { key: 'Automotive', text: 'Automotive', value: 'Automotive' },
                { key: 'Electronics', text: 'Electronics', value: 'Electronics' },
                { key: 'Entertainment', text: 'Entertainment', value: 'Entertainment' },
                { key: 'Gifts', text: 'Gifts', value: 'Gifts' },
                { key: 'Health', text: 'Health', value: 'Health' },
                { key: 'Beauty', text: 'Beauty', value: 'Beauty' },
                { key: 'Restaurants', text: 'Restaurants', value: 'Restaurants' },
            ]
        )
    }

    render() {
        let { store, total_amount, generated_on } = this.state
        return (
            <div>
                <h1>Enter Receipt Details</h1>
                <Form onSubmit={(e) => this.handleFormSubmit(e)}>
                    <Form.Field>
                        <label>Store:</label>
                        <input placeholder='Store Name' id="store" value={store} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Total Amount:</label>
                        <input placeholder='Total Amount' id="total_amount" value={total_amount} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Generated on:</label>
                        <input placeholder='Date' id="generated_on" value={generated_on} onChange={(e) => this.handleFormInput(e)} required />
                    </Form.Field>
                    <Form.Field>
                        <label>Expense Type:</label>
                        <Dropdown placeholder='Expense Type' id="expense_type" fluid multiple selection options={this.options()} onChange={this.onChangeselection} />
                    </Form.Field>
                    <Button.Group>
                        <Button negative onClick={this.handleTrigger}>Cancel</Button>
                        <Button.Or />
                        <Button positive type="submit">Submit</Button>
                    </Button.Group>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        current_user: state.current_user,
    }
}

export default connect(mapStateToProps, null)(ReceiptDetailsForm)
